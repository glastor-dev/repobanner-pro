import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import helmet from 'helmet';
import { createClient } from 'redis';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import winston from 'winston';
import { prisma } from './db';
import { Resvg } from '@resvg/resvg-js';
import { generateSVGString } from './services/svgGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();

// Logger: Sistema de logs estructurados para producción
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Seguridad: Configura cabeceras HTTP seguras
app.use(helmet({ contentSecurityPolicy: false }));

import { RedisStore } from 'rate-limit-redis';

// Redis Client: Configuración robusta con manejo de errores
const redis = createClient({
  url: process.env.REDIS_URL
});

redis.on('error', (err) => logger.warn('[Redis] Error de conexión (Cache deshabilitado):', err));

// Rate Limiting: Previene abuso de la API (100 peticiones por 15min por IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-ignore - Conocido desajuste de tipos con node-redis v4
    sendCommand: (...args: string[]) => redis.sendCommand(args),
  }),
});
app.use('/api/', apiLimiter);



async function getCachedData<T>(key: string, fetcher: () => Promise<T>, ttl = 3600): Promise<T> {
  if (!redis.isOpen) return fetcher();

  try {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    logger.error('[Redis] Error de lectura:', e);
  }

  const data = await fetcher();

  try {
    await redis.set(key, JSON.stringify(data), { EX: ttl });
  } catch (e) {
    logger.error('[Redis] Error de escritura:', e);
  }
  return data;
}

app.use(express.json({ limit: '2mb' }));



// Schemas de Validación (Zod)
const AnalyzeSchema = z.object({
  repoUrl: z.string().url().includes('github.com', { message: 'Must be a GitHub URL' }),
});



const SaveBannerSchema = z.object({
  config: z.record(z.any()), // Aceptamos cualquier objeto de configuración
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/analyze', async (req, res) => {
  try {
    const validation = AnalyzeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    const { repoUrl } = validation.data;

    const data = await getCachedData(`analyze:${repoUrl}`, async () => {
      const ai = new GoogleGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an expert UI/UX designer. Analyze this GitHub repo: ${repoUrl}.
Provide:
1. Clear project name.
2. A concise description.
3. A professional 3-word slogan.
4. Top 4 tech stack keywords.
5. A high-converting color palette (Hex: primary, secondary).
The vibe should be professional for a tech portfolio.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              slogan: { type: Type.STRING },
              techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestedColors: {
                type: Type.OBJECT,
                properties: {
                  primary: { type: Type.STRING },
                  secondary: { type: Type.STRING },
                },
                required: ['primary', 'secondary'],
              },
            },
            required: ['name', 'description', 'slogan', 'techStack', 'suggestedColors'],
          },
        },
      });

      return JSON.parse(response.text || '{}');
    });

    res.json(data);
  } catch (error: any) {
    logger.error('API /api/analyze error:', error);
    res.status(500).json({ error: String(error?.message || error) });
  }
});





// Endpoints de Persistencia (Prisma)
app.post('/api/banners', async (req, res) => {
  try {
    const validation = SaveBannerSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    const { config } = validation.data;

    const banner = await prisma.banner.create({
      data: {
        config: JSON.stringify(config),
      },
    });

    logger.info(`Banner saved: ${banner.shareId}`);
    res.json({ shareId: banner.shareId, id: banner.id });
  } catch (error: any) {
    logger.error('API /api/banners error:', error);
    res.status(500).json({ error: 'Failed to save banner' });
  }
});

app.get('/api/banners/:shareId', async (req, res) => {
  try {
    const { shareId } = req.params;
    const banner = await prisma.banner.findUnique({
      where: { shareId },
    });

    if (!banner) return res.status(404).json({ error: 'Banner not found' });

    // Increment view count async
    prisma.banner.update({ where: { id: banner.id }, data: { views: { increment: 1 } } }).catch(() => {});

    res.json({ config: JSON.parse(banner.config) });
  } catch (error: any) {
    logger.error('API /api/banners/:id error:', error);
    res.status(500).json({ error: 'Failed to load banner' });
  }
});

app.get('/api/og/:shareId', async (req, res) => {
  try {
    const { shareId } = req.params;
    const banner = await prisma.banner.findUnique({
      where: { shareId },
    });

    if (!banner) {
      return res.status(404).json({ error: 'Banner no encontrado' });
    }

    const config = JSON.parse(banner.config);
    const svgString = generateSVGString(config);

    const resvg = new Resvg(svgString, {
      fitTo: { mode: 'width', value: 1200 },
      font: { loadSystemFonts: true },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(pngBuffer);
  } catch (error) {
    logger.error('API /api/og/:shareId error:', error);
    res.status(500).send('Error al generar la imagen OG');
  }
});

async function start() {
  const port = Number(process.env.PORT || 3000);
  const isProd = process.argv.includes('--prod');

  // Conexión condicional a Redis
  if (process.env.REDIS_URL) {
    await redis.connect().catch(e => logger.warn('[Redis] No se pudo conectar:', e));
  }

  if (isProd) {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const host = '0.0.0.0';


  const listenOnPort = (p: number) =>
    new Promise<number>((resolve, reject) => {
      logger.info(`[server] Intentando escuchar en ${host}:${p}`);
      const server = app.listen(p, host);
      server.once('listening', () => {
        logger.info(`[server] Escuchando en ${host}:${p}`);
        resolve(p);
      });
      server.once('error', (err) => {
        logger.error(`[server] Error al escuchar en ${host}:${p}:`, err);
        reject(err);
      });
      server.on('close', () => {
        logger.warn(`[server] El servidor en ${host}:${p} se cerró.`);
      });
    });

  try {
    await listenOnPort(port);
    logger.info(`[server] Server running on http://localhost:${port} (${isProd ? 'prod' : 'dev'})`);
  } catch (err: any) {
    if (err?.code === 'EADDRINUSE') {
      logger.error(`\n[server] El puerto ${port} ya está en uso.\nCierra el proceso que lo está usando o cambia el puerto en la configuración.\n`);
      process.exit(1);
    }
    throw err;
  }
  process.on('uncaughtException', (err) => {
    logger.error('[server] uncaughtException:', err);
  });
  process.on('unhandledRejection', (reason) => {
    logger.error('[server] unhandledRejection:', reason);
  });
}

start().catch((e) => {
  logger.error(e);
  process.exit(1);
});
