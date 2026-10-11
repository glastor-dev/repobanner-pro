import { BannerConfig } from '../../types';

function escapeXml(unsafe: unknown): string {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function sanitizeCssValue(val: unknown, fallback: string): string {
  if (!val || typeof val !== 'string') return fallback;
  const cleaned = val.replace(/[<>"';(){}\\]/g, '').trim();
  return cleaned || fallback;
}

function isSafeImageUrl(url: unknown): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('data:image/')) return true;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return false;
    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '169.254.169.254' ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      (hostname.startsWith('172.') && /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname))
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function generateSVGString(config: BannerConfig, sizeStr: string = '1200x600'): string {
  const [width, height] = sizeStr.split('x').map(Number);
  const areaScale = Math.sqrt(width * height) / 800;

  const primaryColor = sanitizeCssValue(config.primaryColor, '#0f172a');
  const secondaryColor = sanitizeCssValue(config.secondaryColor, '#38bdf8');
  const textColor = sanitizeCssValue(config.textColor, '#ffffff');
  const fontFamily = sanitizeCssValue(config.fontFamily, 'Inter');

  const tfs = Math.min(height * 0.15, width * 0.1);
  const sfs = tfs * 0.4;
  // Dynamic Max Width based on X position to prevent clipping off the right edge
  const bx = (config.layout === 'centered' ? width / 2 : width * 0.1) + (Number(config.textPosition?.x) || 0) * areaScale;
  const rightMargin = width * 0.1;
  let maxWidth = width - bx - rightMargin;
  if (config.layout === 'centered') {
    const distToClosestEdge = Math.min(bx, width - bx);
    maxWidth = (distToClosestEdge - rightMargin) * 2;
  }
  maxWidth = Math.max(maxWidth, width * 0.3);

  // Approximate character width (without Canvas 2D context)
  const charWidth = sfs * 0.6;
  const svgLines: string[] = [];

  const subtitleStr = String(config.subtitle || '');
  const paragraphs = subtitleStr.split('\n');
  paragraphs.forEach(paragraph => {
    const words = paragraph.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const testWidth = testLine.length * charWidth;
      if (testWidth > maxWidth && line.length > 0) {
        svgLines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    if (line.trim().length > 0) svgLines.push(line.trim());
  });

  const startY = height / 2 + (Number(config.textPosition?.y) || 0) * areaScale + tfs * 0.7;
  const lineHeight = sfs * 1.3;
  const subtitleSVG = svgLines.map((l, i) => `
      <text 
        x="${(config.layout === 'centered' ? width / 2 : width * 0.1) + (Number(config.textPosition?.x) || 0) * areaScale}" 
        y="${startY + (i * lineHeight)}" 
        font-family="${fontFamily}, system-ui, sans-serif" 
        font-size="${sfs}" 
        fill="${textColor}" 
        fill-opacity="0.8" 
        text-anchor="${config.layout === 'centered' ? 'middle' : 'start'}"
      >${escapeXml(l.trim())}</text>
  `).join('');

  const safeBgImage = isSafeImageUrl(config.backgroundImage) ? escapeXml(config.backgroundImage) : null;
  const safeLogoImage = isSafeImageUrl(config.logoImage) ? escapeXml(config.logoImage) : null;
  const logoSize = Number(config.logoSize) || 100;
  const logoPosX = Number(config.logoPosition?.x) || 0;
  const logoPosY = Number(config.logoPosition?.y) || 0;
  const bgBlur = Math.max(0, Math.min(50, Number(config.bgBlur) || 0));
  const patternOpacity = Math.max(0, Math.min(1, Number(config.patternOpacity) || 0.2));

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      ${config.gradientEnabled ? '<rect width="100%" height="100%" fill="url(#bgGrad)" />' : `<rect width="100%" height="100%" fill="${primaryColor}" />`}
      
      ${safeBgImage ? `<image href="${safeBgImage}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" opacity="0.3" filter="blur(${bgBlur}px)" />` : ''}
      
      ${config.pattern === 'dots' ? `
        <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="${secondaryColor}" opacity="${patternOpacity}" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      ` : ''}
      
      ${safeLogoImage ? `
        <image 
          href="${safeLogoImage}" 
          x="${(width - logoSize * areaScale - 40 * areaScale) + logoPosX * areaScale}" 
          y="${(40 * areaScale) + logoPosY * areaScale}" 
          width="${logoSize * areaScale}" 
          height="${logoSize * areaScale}" 
        />
      ` : ''}

      <text 
        x="${(config.layout === 'centered' ? width / 2 : width * 0.1) + (Number(config.textPosition?.x) || 0) * areaScale}" 
        y="${height / 2 + (Number(config.textPosition?.y) || 0) * areaScale}" 
        font-family="${fontFamily}, system-ui, sans-serif" 
        font-size="${tfs}" 
        font-weight="800" 
        fill="${textColor}" 
        text-anchor="${config.layout === 'centered' ? 'middle' : 'start'}"
      >${escapeXml(config.title)}</text>
      
      ${subtitleSVG}
    </svg>
  `.trim();
}
