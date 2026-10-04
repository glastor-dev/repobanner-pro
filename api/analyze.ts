import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import { rateLimit, getCache, setCache } from './_middleware';

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!apiKey) return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
  if (!rateLimit(req, res)) return;
  const repoUrl = String(req.body?.repoUrl || '');
  if (!repoUrl.includes('github.com')) return res.status(400).json({ error: 'Invalid repoUrl' });

  const cacheKey = `analyze:${repoUrl}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const ai = new GoogleGenAI({ apiKey });
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
    const result = JSON.parse(response.text || '{}');
    setCache(cacheKey, result);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: String(error?.message || error) });
  }
}
