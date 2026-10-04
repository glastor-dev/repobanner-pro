import React from 'react';
import { BannerPreset } from '../../types';
import { DEFAULT_PRESETS } from '../../constants';
import { Layers, FileUp, FileDown, Edit2, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PresetsGalleryProps {
  customPresets: BannerPreset[];
  applyPreset: (p: BannerPreset) => void;
  editPreset: (id: string, e: React.MouseEvent) => void;
  deletePreset: (id: string, e: React.MouseEvent) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PresetsGallery: React.FC<PresetsGalleryProps> = ({
  customPresets,
  applyPreset,
  editPreset,
  deletePreset,
  onExport,
  onImport,
}) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold flex items-center gap-3 text-white">
          <Layers className="text-violet-400 w-5 h-5" /> Galería de Estilos
        </h3>
        <div className="flex gap-2">
          <button
            className="bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1 rounded-lg border border-white/10 font-bold flex items-center gap-1 transition-colors"
            onClick={onExport}
          >
            <FileDown className="w-3 h-3" /> Exportar
          </button>
          <label className="bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1 rounded-lg border border-white/10 font-bold cursor-pointer flex items-center gap-1 transition-colors">
            <FileUp className="w-3 h-3" /> Importar
            <input
              type="file"
              accept="application/json"
              style={{ display: 'none' }}
              onChange={onImport}
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence>
          {customPresets.map((preset) => (
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="group relative bg-slate-950 border border-slate-800 rounded-2xl p-4 cursor-pointer hover:border-indigo-500 transition-all"
            >
              <Sparkles className="text-indigo-400 w-4 h-4 mb-2" />
              <p className="text-[10px] font-bold truncate text-white/50">{preset.name}</p>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={(e) => editPreset(preset.id, e)}
                  className="p-1 hover:text-indigo-400"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => deletePreset(preset.id, e)}
                  className="p-1 hover:text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {DEFAULT_PRESETS.map((preset) => (
          <div
            key={preset.id}
            onClick={() => applyPreset(preset)}
            className="bg-slate-950/40 border border-slate-800/50 rounded-2xl p-4 cursor-pointer hover:border-indigo-500 transition-all"
          >
            <div className="text-slate-500 mb-2"><Sparkles className="w-4 h-4" /></div>
            <p className="text-[10px] font-bold truncate text-white/30">{preset.name}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PresetsGallery;
