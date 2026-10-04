
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { BannerConfig, BannerSize } from '../types';

interface BannerCanvasProps {
  config: BannerConfig;
  size: BannerSize;
  onUpdateLogoPos: (x: number, y: number) => void;
  onUpdateTextPos: (x: number, y: number) => void;
}

const BannerCanvas: React.FC<BannerCanvasProps> = ({ config, size, onUpdateLogoPos, onUpdateTextPos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);
  const assetsCanvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDragging, setIsDragging] = useState<'logo' | 'text' | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0, initialX: 0, initialY: 0 });
  
  const [width, height] = useMemo(() => size.split('x').map(Number), [size]);
  const areaScale = useMemo(() => Math.sqrt(width * height) / 800, [width, height]);

  const [bgImageObj, setBgImageObj] = useState<HTMLImageElement | null>(null);
  const [logoImageObj, setLogoImageObj] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (config.backgroundImage) {
      const img = new Image();
      if (config.backgroundImage.startsWith('http')) img.crossOrigin = 'anonymous';
      img.src = config.backgroundImage;
      img.onload = () => setBgImageObj(img);
      img.onerror = () => { console.error("Failed to load background image"); setBgImageObj(null); };
    } else setBgImageObj(null);
  }, [config.backgroundImage]);

  useEffect(() => {
    if (config.logoImage) {
      const img = new Image();
      if (config.logoImage.startsWith('http')) img.crossOrigin = 'anonymous';
      img.src = config.logoImage;
      img.onload = () => setLogoImageObj(img);
      img.onerror = () => { console.error("Failed to load logo image"); setLogoImageObj(null); };
    } else setLogoImageObj(null);
  }, [config.logoImage]);

  // LAYER 1: Background & Patterns
  useEffect(() => {
    const canvas = staticCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = width; canvas.height = height;
    
    // Base Color / Gradient
    if (config.gradientEnabled) {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, config.primaryColor); grad.addColorStop(1, config.secondaryColor);
      ctx.fillStyle = grad;
    } else ctx.fillStyle = config.primaryColor;
    ctx.fillRect(0, 0, width, height);

    // Background Image (Layered over color)
    if (bgImageObj) {
      ctx.save();
      ctx.filter = `blur(${config.bgBlur}px) brightness(${config.bgBrightness}%) contrast(${config.bgContrast}%)`;
      const r = Math.max(width / bgImageObj.width, height / bgImageObj.height);
      const w = bgImageObj.width * r, h = bgImageObj.height * r;
      ctx.drawImage(bgImageObj, (width - w) / 2, (height - h) / 2, w, h);
      ctx.restore();
    }

    // Pattern (Layered over image/color)
    if (config.pattern !== 'none') {
      ctx.save();
      ctx.globalAlpha = config.patternOpacity;
      ctx.fillStyle = config.secondaryColor;

      const spacing = 40 * areaScale;
      if (config.pattern === 'grid') {
        for (let x = 0; x < width; x += spacing) ctx.fillRect(x, 0, 1, height);
        for (let y = 0; y < height; y += spacing) ctx.fillRect(0, y, width, 1);
      } else if (config.pattern === 'dots') {
        for (let x = 0; x < width; x += spacing) {
          for (let y = 0; y < height; y += spacing) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5 * areaScale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.restore();
    }
  }, [width, height, areaScale, config.primaryColor, config.secondaryColor, config.gradientEnabled, config.pattern, config.patternOpacity, bgImageObj]);

  // LAYER 2: Assets
  useEffect(() => {
    const canvas = assetsCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = width; canvas.height = height; ctx.clearRect(0, 0, width, height);

    if (logoImageObj) {
      ctx.save();
      const sz = config.logoSize * areaScale;
      const r = Math.min(sz / logoImageObj.width, sz / logoImageObj.height);
      const w = logoImageObj.width * r, h = logoImageObj.height * r;
      const lx = (width - w - 40 * areaScale) + config.logoPosition.x * areaScale;
      const ly = (40 * areaScale) + config.logoPosition.y * areaScale;
      ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 15 * areaScale;
      ctx.drawImage(logoImageObj, lx, ly, w, h);
      ctx.restore();
    }
  }, [width, height, areaScale, bgImageObj, logoImageObj, config.logoSize, config.logoPosition]);

  // LAYER 3: Text & Effects
  useEffect(() => {
    const canvas = textCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = width; canvas.height = height; ctx.clearRect(0, 0, width, height);

    const bx = (config.layout === 'centered' ? width / 2 : width * 0.1) + config.textPosition.x * areaScale;
    const by = height / 2 + config.textPosition.y * areaScale;
    const tfs = Math.min(height * 0.15, width * 0.1);
    const sfs = tfs * 0.4;

    ctx.textAlign = config.layout === 'centered' ? 'center' : 'left';
    
    // Título
    ctx.font = `800 ${tfs}px "${config.fontFamily}"`;
    ctx.save();
    if (config.textGlowEnabled) {
      ctx.shadowColor = config.textGlowColor; ctx.shadowBlur = config.textGlowBlur * areaScale;
    }
    if (config.textOutlineWidth > 0) {
      ctx.strokeStyle = config.textOutlineColor; ctx.lineWidth = config.textOutlineWidth * areaScale;
      ctx.strokeText(config.title, bx, by);
    }
    ctx.fillStyle = config.textColor; ctx.fillText(config.title, bx, by);
    ctx.restore();

    // Subtítulo con Word Wrap
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.font = `400 ${sfs}px "${config.fontFamily}"`;
    ctx.fillStyle = config.textColor;
    
    const rightMargin = width * 0.05;
    let maxWidth = width - bx - rightMargin;
    if (config.layout === 'centered') {
      const distToClosestEdge = Math.min(bx, width - bx);
      maxWidth = (distToClosestEdge - rightMargin) * 2;
    }
    maxWidth = Math.max(maxWidth, width * 0.3);

    const paragraphs = config.subtitle.split('\n');
    const lines: string[] = [];

    paragraphs.forEach(paragraph => {
      const words = paragraph.split(' ');
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line.length > 0) {
          lines.push(line.trim());
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      if (line.trim().length > 0) lines.push(line.trim());
    });

    const lineHeight = sfs * 1.3;
    lines.forEach((l, i) => {
      ctx.fillText(l.trim(), bx, by + tfs * 0.8 + (i * lineHeight));
    });
    ctx.restore();
    
    // Tech Icons
    ctx.save();
    ctx.textAlign = 'left';
    const pillY = height - 100 * areaScale;
    
    // Calcular ancho total para centrado perfecto
    let totalPillsWidth = 0;
    const pillWidths: number[] = [];
    config.techIcons.forEach(tech => {
      ctx.font = `bold ${14 * areaScale}px "${config.fontFamily}"`;
      const tw = ctx.measureText(tech).width + 20 * areaScale;
      pillWidths.push(tw);
      totalPillsWidth += tw + 10 * areaScale;
    });
    if (totalPillsWidth > 0) totalPillsWidth -= 10 * areaScale;

    let pillX = config.layout === 'centered' ? (width / 2) - (totalPillsWidth / 2) : width * 0.1;

    config.techIcons.forEach((tech, idx) => {
      ctx.font = `bold ${14 * areaScale}px "${config.fontFamily}"`;
      const tw = pillWidths[idx];
      
      ctx.fillStyle = `${config.secondaryColor}44`; 
      ctx.beginPath(); 
      ctx.roundRect(pillX, pillY, tw, 30 * areaScale, 5); 
      ctx.fill();
      
      ctx.fillStyle = config.secondaryColor; 
      ctx.fillText(tech, pillX + 10 * areaScale, pillY + 20 * areaScale);
      
      pillX += tw + 10 * areaScale;
    });
    ctx.restore();

  }, [width, height, areaScale, config.title, config.subtitle, config.textColor, config.secondaryColor, config.fontFamily, config.layout, config.textPosition, config.textOutlineWidth, config.textOutlineColor, config.textGlowEnabled, config.textGlowColor, config.textGlowBlur]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (width / rect.width);
    const y = (e.clientY - rect.top) * (height / rect.height);

    // Detect Logo hit
    const sz = config.logoSize * areaScale;
    const lx = (width - sz - 40 * areaScale) + config.logoPosition.x * areaScale;
    const ly = (40 * areaScale) + config.logoPosition.y * areaScale;
    if (x >= lx && x <= lx + sz && y >= ly && y <= ly + sz) {
       setIsDragging('logo');
       dragStartRef.current = { x: e.clientX, y: e.clientY, initialX: config.logoPosition.x, initialY: config.logoPosition.y };
       return;
    }

    // Detect Text hit (approximate)
    const bx = (config.layout === 'centered' ? width / 2 : width * 0.1) + config.textPosition.x * areaScale;
    const by = height / 2 + config.textPosition.y * areaScale;
    if (Math.abs(x - bx) < 200 * areaScale && Math.abs(y - by) < 100 * areaScale) {
       setIsDragging('text');
       dragStartRef.current = { x: e.clientX, y: e.clientY, initialX: config.textPosition.x, initialY: config.textPosition.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = (e.clientX - dragStartRef.current.x) * (width / containerRef.current!.getBoundingClientRect().width) / areaScale;
    const dy = (e.clientY - dragStartRef.current.y) * (height / containerRef.current!.getBoundingClientRect().height) / areaScale;

    if (isDragging === 'logo') {
       onUpdateLogoPos(dragStartRef.current.initialX + dx, dragStartRef.current.initialY + dy);
    } else {
       onUpdateTextPos(dragStartRef.current.initialX + dx, dragStartRef.current.initialY + dy);
    }
  };

  const handleMouseUp = () => setIsDragging(null);

  const handleExportSVG = () => {
    const tfs = Math.min(height * 0.15, width * 0.1);
    const sfs = tfs * 0.4;
    const bx = (config.layout === 'centered' ? width / 2 : width * 0.1) + config.textPosition.x * areaScale;
    const rightMargin = width * 0.1; // Increased margin for SVG fallback font safety
    let maxWidth = width - bx - rightMargin;
    if (config.layout === 'centered') {
      const distToClosestEdge = Math.min(bx, width - bx);
      maxWidth = (distToClosestEdge - rightMargin) * 2;
    }
    maxWidth = Math.max(maxWidth, width * 0.3);
    
    const svgLines: string[] = [];
    const textCtx = textCanvasRef.current?.getContext('2d');
    
    const paragraphs = config.subtitle.split('\n');
    paragraphs.forEach(paragraph => {
      const words = paragraph.split(' ');
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        let testWidth = testLine.length * sfs * 0.6;
        if (textCtx) {
          textCtx.font = `400 ${sfs}px "${config.fontFamily}"`;
          testWidth = textCtx.measureText(testLine).width;
        }
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

    const svg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${config.primaryColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${config.secondaryColor};stop-opacity:1" />
          </linearGradient>
        </defs>
        ${config.gradientEnabled ? '<rect width="100%" height="100%" fill="url(#bgGrad)" />' : `<rect width="100%" height="100%" fill="${config.primaryColor}" />`}
        ${config.backgroundImage ? `<image href="${config.backgroundImage}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" opacity="0.3" />` : ''}
        
        <!-- Simplified Patterns -->
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
          font-family="${config.fontFamily}" 
          font-size="${tfs}" 
          font-weight="800" 
          fill="${config.textColor}" 
          text-anchor="${config.layout === 'centered' ? 'middle' : 'start'}"
        >${config.title}</text>
        
        ${subtitleSVG}
      </svg>
    `.trim();

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `banner-${Date.now()}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    const temp = document.createElement('canvas'); temp.width = width; temp.height = height;
    const tctx = temp.getContext('2d'); if (!tctx) return;
    [staticCanvasRef, assetsCanvasRef, textCanvasRef].forEach(ref => ref.current && tctx.drawImage(ref.current, 0, 0));
    const link = document.createElement('a'); link.download = `banner-${Date.now()}.png`; link.href = temp.toDataURL('image/png'); link.click();
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl ${isDragging ? 'cursor-grabbing' : 'cursor-crosshair'}`} 
        style={{aspectRatio: `${width}/${height}`}}
      >
        <canvas ref={staticCanvasRef} className="absolute inset-0 w-full h-full" />
        <canvas ref={assetsCanvasRef} className="absolute inset-0 w-full h-full" />
        <canvas ref={textCanvasRef} className="absolute inset-0 w-full h-full" />
        
        {/* Interaction Overlays (Optional: show handles when dragging) */}
        {isDragging && (
           <div className="absolute inset-0 pointer-events-none ring-2 ring-indigo-500/50 ring-inset" />
        )}
      </div>
      <div className="flex gap-4">
        <button onClick={handleDownload} className="bg-linear-to-r from-indigo-600 to-violet-600 px-8 py-3 rounded-xl font-black shadow-xl transition-all active:scale-95 text-xs uppercase tracking-tighter flex items-center gap-2">
          <i className="fas fa-image"></i> Exportar PNG
        </button>
        <button onClick={handleExportSVG} className="bg-slate-800 hover:bg-slate-700 px-8 py-3 rounded-xl font-black shadow-xl transition-all active:scale-95 text-xs uppercase tracking-tighter border border-white/5 flex items-center gap-2 text-indigo-400">
          <i className="fas fa-file-code"></i> Exportar SVG
        </button>
      </div>
    </div>
  );
};

export default BannerCanvas;
