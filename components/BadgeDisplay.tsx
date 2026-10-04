
import React from 'react';
import { BadgeItem } from '../types';
import { getBadgeLinkData } from '../services/badgeUtils';

interface BadgeDisplayProps {
  repoUrl: string;
  badges: BadgeItem[];
  style?: string;
  alignment?: 'left' | 'center' | 'right';
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ repoUrl, badges, style = 'for-the-badge', alignment = 'center' }) => {
  const alignmentClass = alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex flex-wrap gap-3 w-full ${alignmentClass}`}>
      {badges.map((badge) => {
        const { src, href } = getBadgeLinkData({ repoUrl, badge, style });
        return (
          <a key={badge.id} href={href} target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-105 active:scale-95">
            <img 
              src={src} 
              alt={badge.label} 
              loading="lazy"
              className="h-8 rounded shadow-sm" 
            />
          </a>
        );
      })}
    </div>
  );
};

export default BadgeDisplay;
