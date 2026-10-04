import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ControlSectionProps {
  title: string;
  icon?: LucideIcon;
  faIcon?: string;
  iconColor: string;
  children: React.ReactNode;
}

const ControlSection: React.FC<ControlSectionProps> = ({ title, icon: Icon, faIcon, iconColor, children }) => {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 space-y-6"
    >
      <h3 className="text-sm font-bold flex items-center gap-2 text-white">
        {Icon ? <Icon className={`${iconColor} w-4 h-4`} /> : faIcon && <i className={`fas ${faIcon} ${iconColor}`}></i>}
        {title}
      </h3>
      {children}
    </motion.div>
  );
};

export default ControlSection;
