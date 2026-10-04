import React, { useRef } from 'react';
import ControlSection from './ControlSection';
import { Palette, Upload, Maximize, MoveHorizontal, Type, Grid3X3 } from 'lucide-react';
import { FONTS, PATTERNS } from '../../constants';
import { motion } from 'framer-motion';

interface BrandingEditorProps {
  logoImage: string | null;
  logoSize: number;
  logoPosX: number;
  fontFamily: string;
  pattern: string;
  primaryColor: string;
  secondaryColor: string;
  gradientEnabled: boolean;
  backgroundImage: string | null;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoDrop: (data: string) => void;
  onBgUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBgDrop: (data: string) => void;
  onUpdateLogoSize: (val: number) => void;
  onUpdateLogoPosX: (val: number) => void;
  onUpdateFont: (val: string) => void;
  onUpdatePattern: (val: string) => void;
  onUpdatePrimaryColor: (val: string) => void;
  onUpdateSecondaryColor: (val: string) => void;
  onUpdateBgUrl: (val: string) => void;
  onUpdateBgBlur: (val: number) => void;
  onUpdateBgBrightness: (val: number) => void;
  onUpdateBgContrast: (val: number) => void;
  onToggleGradient: () => void;
  bgBlur: number;
  bgBrightness: number;
  bgContrast: number;
}
const BrandingEditor: React.FC<BrandingEditorProps> = ({
  logoImage,
  logoSize,
  logoPosX,
  fontFamily,
  pattern,
  primaryColor,
  secondaryColor,
  gradientEnabled,
  backgroundImage,
  onLogoUpload,
  onLogoDrop,
  onBgUpload,
  onBgDrop,
  onUpdateLogoSize,
  onUpdateLogoPosX,
  onUpdateFont,
  onUpdatePattern,
  onUpdatePrimaryColor,
  onUpdateSecondaryColor,
  onUpdateBgUrl,
  onUpdateBgBlur,
  onUpdateBgBrightness,
  onUpdateBgContrast,
  onToggleGradient,
  bgBlur,
  bgBrightness,
  bgContrast,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  return (
    <ControlSection title="Identidad Visual" icon={Palette} iconColor="text-emerald-400">
      {/* Logo */}
      <div className="space-y-4">
        <label className="text-[10px] font-bold text-slate-500 uppercase">Asset de Marca</label>
        <motion.div
          whileHover={{ borderColor: 'rgba(99, 102, 241, 0.5)' }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={e => {
            e.preventDefault(); e.stopPropagation();
            const file = e.dataTransfer.files?.[0];
            if (file && file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onloadend = () => onLogoDrop(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
          className="w-full h-24 bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group overflow-hidden"
          title="Haz click o arrastra una imagen aquí"
        >
          {logoImage ? <img src={logoImage} className="h-full object-contain p-4" /> : <><Upload className="w-5 h-5 text-slate-600 mb-1" /><span className="text-[9px] font-black text-slate-600">SUBIR O ARRASTRAR LOGO</span></>}
          <input type="file" ref={fileInputRef} hidden onChange={onLogoUpload} />
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1">
             <span className="text-[9px] font-bold text-slate-600 flex items-center gap-1"><Maximize className="w-3 h-3" /> ESCALA</span>
             <input type="range" min="20" max="400" value={logoSize} onChange={(e) => onUpdateLogoSize(parseInt(e.target.value))} className="w-full accent-indigo-500" />
           </div>
           <div className="space-y-1">
             <span className="text-[9px] font-bold text-slate-600 flex items-center gap-1"><MoveHorizontal className="w-3 h-3" /> OFFSET X</span>
             <input type="range" min="-300" max="300" value={logoPosX} onChange={(e) => onUpdateLogoPosX(parseInt(e.target.value))} className="w-full accent-indigo-500" />
           </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <label className="text-[10px] font-bold text-slate-500 uppercase">Fondo del Banner</label>
        <motion.div
          whileHover={{ borderColor: 'rgba(99, 102, 241, 0.5)' }}
          onClick={() => bgInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={e => {
            e.preventDefault(); e.stopPropagation();
            const file = e.dataTransfer.files?.[0];
            if (file && file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onloadend = () => onBgDrop(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
          className="w-full h-24 bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group overflow-hidden"
          title="Haz click o arrastra un fondo aquí"
        >
          {backgroundImage ? (
            <div className="relative w-full h-full group/bg">
               <img src={backgroundImage} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/bg:opacity-100 transition-all">
                  <span className="text-[8px] font-black text-white">REEMPLAZAR FONDO</span>
               </div>
            </div>
          ) : (
            <><Upload className="w-5 h-5 text-slate-600 mb-1" /><span className="text-[9px] font-black text-slate-600 uppercase">Subir o arrastrar fondo</span></>
          )}
          <input type="file" ref={bgInputRef} hidden onChange={onBgUpload} />
        </motion.div>
        <div className="relative">
           <input 
             type="text" 
             placeholder="O pega una URL de imagen..." 
             className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-[10px] text-white focus:border-indigo-500 outline-none transition-all pr-12"
             onChange={(e) => onUpdateBgUrl(e.target.value)}
           />
           <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-slate-600 uppercase pointer-events-none">URL</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
           <div className="space-y-1">
             <span className="text-[8px] font-bold text-slate-600 uppercase">Blur</span>
             <input type="range" min="0" max="20" value={bgBlur} onChange={(e) => onUpdateBgBlur(parseInt(e.target.value))} className="w-full h-1 accent-indigo-500 rounded-lg appearance-none bg-slate-800" />
           </div>
           <div className="space-y-1">
             <span className="text-[8px] font-bold text-slate-600 uppercase">Brillo</span>
             <input type="range" min="0" max="200" value={bgBrightness} onChange={(e) => onUpdateBgBrightness(parseInt(e.target.value))} className="w-full h-1 accent-indigo-500 rounded-lg appearance-none bg-slate-800" />
           </div>
           <div className="space-y-1">
             <span className="text-[8px] font-bold text-slate-600 uppercase">Contraste</span>
             <input type="range" min="0" max="200" value={bgContrast} onChange={(e) => onUpdateBgContrast(parseInt(e.target.value))} className="w-full h-1 accent-indigo-500 rounded-lg appearance-none bg-slate-800" />
           </div>
        </div>
      </div>

      {/* Typography & Patterns */}
      <div className="pt-4 border-t border-white/5 space-y-4">
         <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block flex items-center gap-1"><Type className="w-3 h-3" /> Tipografía</label>
              <select value={fontFamily} onChange={(e) => onUpdateFont(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white">
                {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block flex items-center gap-1"><Grid3X3 className="w-3 h-3" /> Patrón</label>
              <select value={pattern} onChange={(e) => onUpdatePattern(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white">
                {PATTERNS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase block text-white/50">Primario</label>
              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <input type="color" value={primaryColor} onChange={(e) => onUpdatePrimaryColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                <span className="text-[9px] font-mono text-slate-500">{primaryColor}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase block text-white/50">Acento</label>
              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                <input type="color" value={secondaryColor} onChange={(e) => onUpdateSecondaryColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                <span className="text-[9px] font-mono text-slate-500">{secondaryColor}</span>
              </div>
            </div>
         </div>
         <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Degradado Dinámico</span>
            <button onClick={onToggleGradient} className={`w-10 h-5 rounded-full transition-all relative ${gradientEnabled ? 'bg-indigo-600 shadow-glow' : 'bg-slate-800'}`}>
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${gradientEnabled ? 'left-6' : 'left-1'}`} />
            </button>
         </div>
      </div>
    </ControlSection>
  );
};

export default BrandingEditor;
