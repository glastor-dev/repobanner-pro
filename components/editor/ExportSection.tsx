import React from 'react';
import { Copy, Terminal, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExportSectionProps {
  markdownBadgeBlock: string;
  repoUrl: string;
  badgeAlignment: string;
  onCopy: (text: string) => void;
}

const ExportSection: React.FC<ExportSectionProps> = ({
  markdownBadgeBlock,
  repoUrl,
  badgeAlignment,
  onCopy,
}) => {
  const readmeCode = `<!-- REPOBANNER START -->\n[![Banner](${repoUrl}/raw/main/banner.png)](${repoUrl})\n\n<p align="${badgeAlignment}">\n${markdownBadgeBlock}</p>\n<!-- REPOBANNER END -->`;

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold flex items-center gap-3 text-white">
          <Terminal className="text-amber-400 w-5 h-5" /> Exportar README.md
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCopy(readmeCode)}
          className="bg-amber-600/10 text-amber-400 border border-amber-500/20 px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-600/20 flex items-center gap-2"
        >
          <Copy className="w-4 h-4" /> Copiar Código
        </motion.button>
      </div>
      <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 overflow-hidden">
        <pre className="text-[11px] text-amber-300/80 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
          {readmeCode}
        </pre>
      </div>
      <p className="text-[10px] text-slate-500 italic flex items-center gap-2">
        <Github className="w-3 h-3" /> Tip: Pega este bloque al inicio de tu archivo README.md para obtener un look profesional instantáneo.
      </p>
    </motion.div>
  );
};

export default ExportSection;
