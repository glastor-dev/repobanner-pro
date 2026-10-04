import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Save, Share2, Undo2, Redo2 } from 'lucide-react';

interface NavbarProps {
  logoUrl: string | null;
  saveCurrentAsPreset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  logoUrl, 
  saveCurrentAsPreset,
  undo,
  redo,
  canUndo,
  canRedo 
}) => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b border-white/5 bg-slate-900/40 backdrop-blur-2xl sticky top-0 z-50"
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-10 w-10 md:h-12 md:w-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shadow-xl overflow-hidden"
          >
             {logoUrl ? <img src={logoUrl} className="h-full w-full object-cover" /> : <Sparkles className="text-indigo-400 w-5 h-5 md:w-6 md:h-6" />}
          </motion.div>
          <span className="text-lg md:text-xl font-black text-white tracking-tighter uppercase whitespace-nowrap">Repo<span className="text-indigo-400">Banner</span> <span className="hidden sm:inline-block text-[10px] ml-1 bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">PRO</span></span>
        </div>
        <div className="flex gap-2 md:gap-4 items-center">
          <div className="hidden md:flex bg-slate-900 rounded-xl p-1 border border-white/5 mr-2">
             <button 
                onClick={undo} 
                disabled={!canUndo}
                className={`p-2 rounded-lg transition-all ${canUndo ? 'text-slate-200 hover:bg-white/5' : 'text-slate-600 cursor-not-allowed'}`}
                title="Deshacer (Ctrl+Z)"
             >
                <Undo2 className="w-4 h-4" />
             </button>
             <button 
                onClick={redo} 
                disabled={!canRedo}
                className={`p-2 rounded-lg transition-all ${canRedo ? 'text-slate-200 hover:bg-white/5' : 'text-slate-600 cursor-not-allowed'}`}
                title="Rehacer (Ctrl+Shift+Z)"
             >
                <Redo2 className="w-4 h-4" />
             </button>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveCurrentAsPreset} 
            className="bg-white/5 hover:bg-white/10 px-3 md:px-6 py-2 rounded-xl text-xs md:text-sm font-bold border border-white/10 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> <span className="hidden sm:inline">Guardar</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-indigo-600 hover:bg-indigo-500 px-3 md:px-6 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" /> <span className="hidden sm:inline">Compartir</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
