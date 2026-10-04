import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import { rateLimit, getCache, setCache } from './_middleware';

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!apiKey) return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
  if (!rateLimit(req, res)) return;
  const config = req.body?.config;
  if (!config || typeof config !== 'object') return res.status(400).json({ error: 'Invalid config' });

  const cacheKey = `social:${config.title}:${config.subtitle}:${config.repoUrl}:${(config.techIcons||[]).join(',')}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create 3 social media captions for this GitHub project:\nTitle: ${config.title}\nSubtitle: ${config.subtitle}\nURL: ${config.repoUrl}\nTech: ${(config.techIcons || []).join(', ')}\n\nStyles:\n1. Hype: Viral, emoji-rich, exciting.\n2. Professional: Serious, LinkedIn-ready, outcome-focused.\n3. Minimal: Short, punchy, developer-centric.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hype: { type: Type.STRING },
            professional: { type: Type.STRING },
            minimal: { type: Type.STRING },
          },
          required: ['hype', 'professional', 'minimal'],
        },
      },
    });
    const result = JSON.parse(response.text || '{}');
    setCache(cacheKey, result);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: String(error?.message || error) });
  }
}
