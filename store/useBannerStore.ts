import { create } from 'zustand';
import { BannerConfig, BadgeType, BadgeItem } from '../types';

interface BannerStore {
  config: BannerConfig;
  setConfig: (config: BannerConfig) => void;
  updateConfig: (key: keyof BannerConfig, value: any) => void;
  toggleBadge: (type: BadgeType) => void;
  
  // Draft States for fluid UI updates
  draftTitle: string;
  setDraftTitle: (val: string) => void;
  draftSubtitle: string;
  setDraftSubtitle: (val: string) => void;
  draftLogoSize: number;
  setDraftLogoSize: (val: number) => void;
  draftLogoPosX: number;
  setDraftLogoPosX: (val: number) => void;
  draftPrimaryColor: string;
  setDraftPrimaryColor: (val: string) => void;
  draftSecondaryColor: string;
  setDraftSecondaryColor: (val: string) => void;
  draftBgBlur: number;
  setDraftBgBlur: (val: number) => void;
  draftBgBrightness: number;
  setDraftBgBrightness: (val: number) => void;
  draftBgContrast: number;
  setDraftBgContrast: (val: number) => void;

  applyPreset: (preset: { config: Partial<BannerConfig> }) => void;
}

const DEFAULT_CONFIG: BannerConfig = {
  title: 'Project Nebula',
  subtitle: 'Building the next generation of decentralized web technologies with speed.',
  repoUrl: 'https://github.com/modern/nebula',
  author: 'modern-dev',
  theme: 'slate',
  primaryColor: '#0f172a',
  secondaryColor: '#38bdf8',
  textColor: '#ffffff',
  backgroundImage: null,
  logoImage: null,
  logoSize: 100,
  logoPosition: { x: 0, y: 0 },
  layout: 'centered',
  badges: [
    { id: '1', label: 'stars', value: 'auto', color: '#f59e0b', type: 'stars' },
    { id: '2', label: 'forks', value: 'auto', color: '#38bdf8', type: 'forks' },
    { id: '3', label: 'build', value: 'passing', color: '#10b981', type: 'workflow-status' },
  ],
  badgeStyle: 'for-the-badge',
  badgeAlignment: 'center',
  fontFamily: 'Inter',
  pattern: 'dots',
  patternOpacity: 0.2,
  gradientEnabled: true,
  textPosition: { x: 0, y: 0 },
  techIcons: ['TypeScript', 'React', 'Deno'],
  textOutlineColor: '#000000',
  textOutlineWidth: 0,
  textShadowBlur: 15,
  textShadowColor: 'rgba(0,0,0,0.5)',
  textGlowEnabled: false,
  textGlowColor: '#38bdf8',
  textGlowBlur: 20,
  bgBlur: 0,
  bgBrightness: 100,
  bgContrast: 100
};

export const useBannerStore = create<BannerStore>((set, get) => ({
  config: DEFAULT_CONFIG,
  setConfig: (config) => set({ config }),
  updateConfig: (key, value) => set((state) => ({ config: { ...state.config, [key]: value } })),
  toggleBadge: (type) => {
    const state = get();
    const exists = state.config.badges.find((b) => b.type === type && !b.socialHandle);
    if (exists) {
      state.updateConfig("badges", state.config.badges.filter((b) => b.id !== exists.id));
    } else {
      const newB: BadgeItem = {
        id: Math.random().toString(36).substr(2, 9),
        label: type.replace("-", " "),
        value: "auto",
        color: state.config.secondaryColor,
        type,
      };
      state.updateConfig("badges", [...state.config.badges, newB]);
    }
  },

  draftTitle: DEFAULT_CONFIG.title,
  setDraftTitle: (val) => set((state) => ({ draftTitle: val, config: { ...state.config, title: val } })),
  draftSubtitle: DEFAULT_CONFIG.subtitle,
  setDraftSubtitle: (val) => set((state) => ({ draftSubtitle: val, config: { ...state.config, subtitle: val } })),
  draftLogoSize: DEFAULT_CONFIG.logoSize,
  setDraftLogoSize: (val) => set((state) => ({ draftLogoSize: val, config: { ...state.config, logoSize: val } })),
  draftLogoPosX: DEFAULT_CONFIG.logoPosition.x,
  setDraftLogoPosX: (val) => set((state) => ({ draftLogoPosX: val, config: { ...state.config, logoPosition: { ...state.config.logoPosition, x: val } } })),
  draftPrimaryColor: DEFAULT_CONFIG.primaryColor,
  setDraftPrimaryColor: (val) => set((state) => ({ draftPrimaryColor: val, config: { ...state.config, primaryColor: val } })),
  draftSecondaryColor: DEFAULT_CONFIG.secondaryColor,
  setDraftSecondaryColor: (val) => set((state) => ({ draftSecondaryColor: val, config: { ...state.config, secondaryColor: val } })),
  draftBgBlur: DEFAULT_CONFIG.bgBlur,
  setDraftBgBlur: (val) => set((state) => ({ draftBgBlur: val, config: { ...state.config, bgBlur: val } })),
  draftBgBrightness: DEFAULT_CONFIG.bgBrightness,
  setDraftBgBrightness: (val) => set((state) => ({ draftBgBrightness: val, config: { ...state.config, bgBrightness: val } })),
  draftBgContrast: DEFAULT_CONFIG.bgContrast,
  setDraftBgContrast: (val) => set((state) => ({ draftBgContrast: val, config: { ...state.config, bgContrast: val } })),

  applyPreset: (preset) => set((state) => {
    const newConfig = { ...state.config, ...preset.config };
    return {
      config: newConfig,
      draftTitle: newConfig.title,
      draftSubtitle: newConfig.subtitle,
      draftLogoSize: newConfig.logoSize,
      draftLogoPosX: newConfig.logoPosition.x,
      draftPrimaryColor: newConfig.primaryColor,
      draftSecondaryColor: newConfig.secondaryColor,
      draftBgBlur: newConfig.bgBlur,
      draftBgBrightness: newConfig.bgBrightness,
      draftBgContrast: newConfig.bgContrast,
    };
  }),
}));
