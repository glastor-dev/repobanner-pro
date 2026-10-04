import { RepoAnalysis, SocialCopy, BannerConfig } from "../types";

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`${url} failed: ${response.status} ${text}`);
  }
  return response.json() as Promise<T>;
}

export async function analyzeRepository(repoUrl: string): Promise<RepoAnalysis | null> {
  try {
    return await postJson<RepoAnalysis>('/api/analyze', { repoUrl });
  } catch (error) {
    console.error('Gemini Analysis Error:', error);
    return null;
  }
}

export async function generateSocialCaptions(config: BannerConfig): Promise<SocialCopy | null> {
  try {
    return await postJson<SocialCopy>('/api/social', { config });
  } catch (error) {
    console.error('Gemini Social Error:', error);
    return null;
  }
}
