import { describe, it, expect } from 'vitest';
import { generateSVGString } from './svgGenerator';
import { BannerConfig } from '../../types';

describe('svgGenerator Security & Rendering', () => {
  const baseConfig: BannerConfig = {
    title: 'Test Repo',
    subtitle: 'A test project for SVG rendering',
    repoUrl: 'https://github.com/owner/repo',
    author: 'owner',
    theme: 'slate',
    primaryColor: '#0f172a',
    secondaryColor: '#38bdf8',
    textColor: '#ffffff',
    backgroundImage: null,
    logoImage: null,
    logoSize: 100,
    logoPosition: { x: 0, y: 0 },
    layout: 'centered',
    badges: [],
    badgeStyle: 'for-the-badge',
    badgeAlignment: 'center',
    fontFamily: 'Inter',
    pattern: 'none',
    patternOpacity: 0.2,
    gradientEnabled: true,
    textPosition: { x: 0, y: 0 },
    techIcons: ['TypeScript'],
    textOutlineColor: '#000000',
    textOutlineWidth: 0,
    textShadowBlur: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textGlowEnabled: false,
    textGlowColor: '#38bdf8',
    textGlowBlur: 20,
    bgBlur: 0,
    bgBrightness: 100,
    bgContrast: 100,
  };

  it('should escape dangerous characters to prevent XML injection and XSS', () => {
    const configWithInjection: BannerConfig = {
      ...baseConfig,
      title: 'Dev <script>alert(1)</script> & "Dangerous" \'Quotes\'',
      subtitle: 'Sub <tag> & special characters >',
    };

    const svg = generateSVGString(configWithInjection);

    expect(svg).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(svg).toContain('&amp;');
    expect(svg).not.toContain('<script>');
    expect(svg).not.toContain('<tag>');
  });

  it('should block unsafe SSRF image URLs in logo and background', () => {
    const configWithSSRF: BannerConfig = {
      ...baseConfig,
      backgroundImage: 'http://169.254.169.254/latest/meta-data/',
      logoImage: 'file:///etc/passwd',
    };

    const svg = generateSVGString(configWithSSRF);

    expect(svg).not.toContain('169.254.169.254');
    expect(svg).not.toContain('file:///etc/passwd');
  });

  it('should render valid SVG container and dimensions', () => {
    const svg = generateSVGString(baseConfig, '1200x600');

    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg.endsWith('</svg>')).toBe(true);
    expect(svg).toContain('width="1200"');
    expect(svg).toContain('height="600"');
  });
});
