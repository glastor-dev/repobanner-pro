import React, { useState } from 'react';
import { BadgeItem, BadgeType } from '../../types';
import BadgeDisplay from '../BadgeDisplay';
import { ShieldCheck, Hash, Share2, Code2, Heart, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BADGE_GROUPS } from '../../services/badgeUtils';

interface BadgesHubProps {
  repoUrl: string;
  badges: BadgeItem[];
  badgeStyle: any;
  badgeAlignment: any;
  secondaryColor: string;
  toggleBadge: (type: BadgeType) => void;
}

const BadgesHub: React.FC<BadgesHubProps> = ({
  repoUrl,
  badges,
  badgeStyle,
  badgeAlignment,
  secondaryColor,
  toggleBadge,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('stats');

  const categories = [
    { id: 'stats', label: 'Stats', icon: Hash },
    { id: 'social', label: 'Social', icon: Share2 },
    { id: 'tech', label: 'Tech', icon: Code2 },
    { id: 'funding', label: 'Funding', icon: Heart },
    { id: 'custom', label: 'Custom', icon: PenTool },
  ];

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-3 text-white">
          <ShieldCheck className="text-emerald-400 w-5 h-5" /> Badges Dinámicos
        </h3>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                : 'bg-slate-950 text-slate-500 border border-transparent hover:bg-slate-800'
            }`}
          >
            <cat.icon className="w-3 h-3" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="min-h-[100px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {BADGE_GROUPS[activeCategory]?.badges.map((type) => (
              <button
                key={type}
                onClick={() => toggleBadge(type)}
                className={`px-3 py-2 rounded-xl text-[9px] font-bold uppercase border transition-all ${
                  badges.some((b) => b.type === type)
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                    : 'bg-white/5 border-transparent text-slate-500 hover:bg-white/10'
                }`}
              >
                {type.replace(/-/g, ' ')}
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pt-4 border-t border-white/5">
        <BadgeDisplay
          repoUrl={repoUrl}
          badges={badges}
          style={badgeStyle}
          alignment={badgeAlignment}
        />
      </div>
    </motion.div>
  );
};

export default BadgesHub;
