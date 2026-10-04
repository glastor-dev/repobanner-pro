import React from 'react';
import ControlSection from './ControlSection';
import { Type } from 'lucide-react';

interface MessagingEditorProps {
  title: string;
  subtitle: string;
  setTitle: (val: string) => void;
  setSubtitle: (val: string) => void;
}

const MessagingEditor: React.FC<MessagingEditorProps> = ({ title, subtitle, setTitle, setSubtitle }) => {
  return (
    <ControlSection title="Mensajería" icon={Type} iconColor="text-sky-400">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Título</label>
            <span className={`text-[9px] font-bold ${title.length > 30 ? 'text-amber-400' : 'text-slate-600'}`}>{title.length}/35</span>
          </div>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 35))}
            maxLength={35}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none font-bold text-white transition-all"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Descripción</label>
            <span className={`text-[9px] font-bold ${subtitle.length > 130 ? 'text-amber-400' : 'text-slate-600'}`}>{subtitle.length}/150</span>
          </div>
          <textarea 
            rows={3}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value.slice(0, 150))}
            maxLength={150}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none resize-none leading-relaxed text-white transition-all h-24"
          />
        </div>
      </div>
    </ControlSection>
  );
};

export default MessagingEditor;
