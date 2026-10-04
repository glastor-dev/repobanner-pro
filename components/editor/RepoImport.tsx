import React from 'react';
import ControlSection from './ControlSection';
import { Github, Wand2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface RepoImportProps {
  repoUrl: string;
  repoUrlTouched: boolean;
  loading: boolean;
  isValidRepoUrl: (url: string) => boolean;
  onUrlChange: (url: string) => void;
  onAnalyze: () => void;
  onTouched: () => void;
}

const RepoImport: React.FC<RepoImportProps> = ({
  repoUrl,
  repoUrlTouched,
  loading,
  isValidRepoUrl,
  onUrlChange,
  onAnalyze,
  onTouched,
}) => {
  return (
    <ControlSection title="Importar Repositorio" icon={Github} iconColor="text-indigo-400">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            onBlur={onTouched}
            placeholder="GitHub URL..."
            className={`flex-1 bg-slate-950 border rounded-xl px-4 py-3 text-sm outline-none transition-all ${
              repoUrlTouched && !isValidRepoUrl(repoUrl)
                ? 'border-red-500 focus:border-red-500'
                : 'border-slate-800 focus:border-indigo-500'
            }`}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAnalyze}
            disabled={loading || !isValidRepoUrl(repoUrl)}
            className="bg-indigo-600 px-4 rounded-xl disabled:opacity-50 hover:bg-indigo-500 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Wand2 className="w-4 h-4 text-white" />}
          </motion.button>
        </div>
        {repoUrlTouched && !isValidRepoUrl(repoUrl) && (
          <motion.span 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="text-xs text-red-400 font-bold mt-1"
          >
            URL de GitHub inválida. Debe ser del tipo https://github.com/usuario/repositorio
          </motion.span>
        )}
      </div>
    </ControlSection>
  );
};

export default RepoImport;
