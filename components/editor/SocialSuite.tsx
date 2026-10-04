import React from 'react';
import { SocialCopy } from '../../types';
import { Share2, Wand2, Loader2, Bot, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialSuiteProps {
  socialCaptions: SocialCopy | null;
  socialLoading: boolean;
  onGenerate: () => void;
  onCopy: (text: string) => void;
}

const SocialSuite: React.FC<SocialSuiteProps> = ({
  socialCaptions,
  socialLoading,
  onGenerate,
  onCopy,
}) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold flex items-center gap-3 text-white">
          <Share2 className="text-indigo-400 w-5 h-5" /> Social Suite AI
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGenerate}
          disabled={socialLoading}
          className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-600/20 disabled:opacity-50 flex items-center gap-2"
        >
          {socialLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4" />
          )}
          Generar Copy
        </motion.button>
      </div>
      {socialCaptions ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {Object.entries(socialCaptions).map(([key, text]) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={key} 
              className="bg-slate-950 p-4 rounded-2xl border border-white/5 group relative"
            >
              <span className="text-[10px] font-black text-indigo-400 uppercase mb-2 block">
                {key}
              </span>
              <p className="text-[11px] leading-relaxed opacity-70 mb-4 text-white/70">{text as string}</p>
              <button
                onClick={() => onCopy(text as string)}
                className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold text-white transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-3 h-3" /> Copiar
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-12 flex flex-col items-center justify-center opacity-30">
          <Bot className="w-12 h-12 mb-4" />
          <p className="text-xs font-bold uppercase text-white/50">Crea leyendas optimizadas con Gemini</p>
        </div>
      )}
    </motion.div>
  );
};

export default SocialSuite;
