import { BannerConfig } from '../../types';

export function generateSVGString(config: BannerConfig, sizeStr: string = '1200x600'): string {
  const [width, height] = sizeStr.split('x').map(Number);
  const areaScale = Math.sqrt(width * height) / 800;

  const tfs = Math.min(height * 0.15, width * 0.1);
  const sfs = tfs * 0.4;
  // Dynamic Max Width based on X position to prevent clipping off the right edge
  const bx = (config.layout === 'centered' ? width / 2 : width * 0.1) + config.textPosition.x * areaScale;
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

  const paragraphs = config.subtitle.split('\n');
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

  const startY = height / 2 + config.textPosition.y * areaScale + tfs * 0.7;
  const lineHeight = sfs * 1.3;
  const subtitleSVG = svgLines.map((l, i) => `
      <text 
        x="${(config.layout === 'centered' ? width / 2 : width * 0.1) + config.textPosition.x * areaScale}" 
        y="${startY + (i * lineHeight)}" 
        font-family="${config.fontFamily}, system-ui, sans-serif" 
        font-size="${sfs}" 
        fill="${config.textColor}" 
        fill-opacity="0.8" 
        text-anchor="${config.layout === 'centered' ? 'middle' : 'start'}"
      >${l.trim()}</text>
  `).join('');

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${config.primaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${config.secondaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      ${config.gradientEnabled ? '<rect width="100%" height="100%" fill="url(#bgGrad)" />' : `<rect width="100%" height="100%" fill="${config.primaryColor}" />`}
      
      ${config.backgroundImage ? `<image href="${config.backgroundImage}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" opacity="0.3" filter="blur(${config.bgBlur}px)" />` : ''}
      
      ${config.pattern === 'dots' ? `
        <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="${config.secondaryColor}" opacity="${config.patternOpacity}" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      ` : ''}
      
      ${config.logoImage ? `
        <image 
          href="${config.logoImage}" 
          x="${(width - config.logoSize * areaScale - 40 * areaScale) + config.logoPosition.x * areaScale}" 
          y="${(40 * areaScale) + config.logoPosition.y * areaScale}" 
          width="${config.logoSize * areaScale}" 
          height="${config.logoSize * areaScale}" 
        />
      ` : ''}

      <text 
        x="${(config.layout === 'centered' ? width / 2 : width * 0.1) + config.textPosition.x * areaScale}" 
        y="${height / 2 + config.textPosition.y * areaScale}" 
        font-family="${config.fontFamily}, system-ui, sans-serif" 
        font-size="${tfs}" 
        font-weight="800" 
        fill="${config.textColor}" 
        text-anchor="${config.layout === 'centered' ? 'middle' : 'start'}"
      >${config.title}</text>
      
      ${subtitleSVG}
    </svg>
  `.trim();
}
