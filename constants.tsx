
import { BannerPreset } from './types';

export const THEMES = [
  { id: 'slate', name: 'Deep Slate', primary: '#0f172a', secondary: '#38bdf8', text: '#ffffff' },
  { id: 'nebula', name: 'Space Nebula', primary: '#1e1b4b', secondary: '#818cf8', text: '#ffffff' },
  { id: 'emerald', name: 'Forest Tech', primary: '#064e3b', secondary: '#10b981', text: '#ffffff' },
  { id: 'crimson', name: 'Cyber Red', primary: '#450a0a', secondary: '#ef4444', text: '#ffffff' },
  { id: 'glass', name: 'Glassmorphism', primary: '#f8fafc', secondary: '#6366f1', text: '#0f172a' },
];

export const FONTS = [
  'Inter', 'Roboto Mono', 'Space Grotesk', 'Playfair Display', 'Outfit'
];

export const PATTERNS = [
  { id: 'none', name: 'Solid' },
  { id: 'dots', name: 'Dot Matrix' },
  { id: 'grid', name: 'Blueprint Grid' },
  { id: 'waves', name: 'Abstract Waves' }
];

export const LAYOUTS = [
  { id: 'centered', name: 'Centered', icon: 'fa-align-center' },
  { id: 'split', name: 'Split View', icon: 'fa-columns' },
  { id: 'minimal', name: 'Minimalist', icon: 'fa-minus' },
  { id: 'modern', name: 'Modern Tech', icon: 'fa-microchip' },
];

export const DEFAULT_PRESETS: BannerPreset[] = [
  {
    id: 'minimalist-tech',
    name: 'Minimalist Tech',
    icon: 'fa-terminal',
    config: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      textColor: '#ffffff',
      layout: 'minimal',
      fontFamily: 'Roboto Mono',
      pattern: 'none',
      gradientEnabled: false,
      textGlowEnabled: false,
      textOutlineWidth: 0,
      textShadowBlur: 0
    }
  },
  {
    id: 'bold-corporate',
    name: 'Bold Corporate',
    icon: 'fa-building',
    config: {
      primaryColor: '#1e293b',
      secondaryColor: '#38bdf8',
      textColor: '#f8fafc',
      layout: 'modern',
      fontFamily: 'Inter',
      pattern: 'grid',
      patternOpacity: 0.1,
      gradientEnabled: true,
      textShadowBlur: 20,
    }
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    icon: 'fa-bolt',
    config: {
      primaryColor: '#020617',
      secondaryColor: '#f0abfc',
      textColor: '#ffffff',
      layout: 'centered',
      fontFamily: 'Space Grotesk',
      pattern: 'waves',
      patternOpacity: 0.3,
      textGlowEnabled: true,
      textGlowColor: '#f0abfc',
      textGlowBlur: 30,
    }
  },
  {
    id: 'retro-console',
    name: 'Retro Console',
    icon: 'fa-keyboard',
    config: {
      primaryColor: '#1a1a1a',
      secondaryColor: '#22c55e',
      textColor: '#22c55e',
      layout: 'minimal',
      fontFamily: 'Roboto Mono',
      pattern: 'dots',
      patternOpacity: 0.15,
      gradientEnabled: false,
      textGlowEnabled: true,
      textGlowColor: '#22c55e',
      textGlowBlur: 10,
      textOutlineWidth: 0
    }
  },
  {
    id: 'enterprise-blue',
    name: 'Enterprise Blue',
    icon: 'fa-shield-halved',
    config: {
      primaryColor: '#1e3a8a',
      secondaryColor: '#60a5fa',
      textColor: '#ffffff',
      layout: 'split',
      fontFamily: 'Inter',
      pattern: 'grid',
      patternOpacity: 0.05,
      gradientEnabled: true,
      textShadowBlur: 10,
      textShadowColor: 'rgba(0,0,0,0.3)'
    }
  },
  {
    id: 'sunset-waves',
    name: 'Sunset Waves',
    icon: 'fa-mountain-sun',
    config: {
      primaryColor: '#7c2d12',
      secondaryColor: '#fb923c',
      textColor: '#fff7ed',
      layout: 'centered',
      fontFamily: 'Outfit',
      pattern: 'waves',
      patternOpacity: 0.4,
      gradientEnabled: true,
      textShadowBlur: 15,
      textGlowEnabled: false
    }
  },
  {
    id: 'midnight-violet',
    name: 'Midnight Glow',
    icon: 'fa-moon',
    config: {
      primaryColor: '#2e1065',
      secondaryColor: '#c084fc',
      textColor: '#f5f3ff',
      layout: 'modern',
      fontFamily: 'Space Grotesk',
      pattern: 'dots',
      patternOpacity: 0.2,
      textGlowEnabled: true,
      textGlowColor: '#a855f7',
      textGlowBlur: 40,
      gradientEnabled: true
    }
  },
  {
    id: 'clean-slate',
    name: 'Clean Slate',
    icon: 'fa-square',
    config: {
      primaryColor: '#f8fafc',
      secondaryColor: '#475569',
      textColor: '#1e293b',
      layout: 'minimal',
      fontFamily: 'Inter',
      pattern: 'none',
      gradientEnabled: false,
      textShadowBlur: 0,
      textOutlineWidth: 0
    }
  },
  {
    id: 'cyberpunk-gold',
    name: 'Cyber Gold',
    icon: 'fa-crown',
    config: {
      primaryColor: '#000000',
      secondaryColor: '#fbbf24',
      textColor: '#fbbf24',
      layout: 'centered',
      fontFamily: 'Space Grotesk',
      pattern: 'grid',
      patternOpacity: 0.2,
      textOutlineWidth: 2,
      textOutlineColor: '#78350f',
      textGlowEnabled: true,
      textGlowColor: '#fbbf24',
      textGlowBlur: 20
    }
  }
];
