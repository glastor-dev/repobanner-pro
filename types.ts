
export interface BannerConfig {
  title: string;
  subtitle: string;
  repoUrl: string;
  author: string;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundImage: string | null;
  logoImage: string | null;
  logoSize: number;
  logoPosition: { x: number; y: number };
  layout: BannerLayout;
  badges: BadgeItem[];
  badgeStyle: 'for-the-badge' | 'flat' | 'flat-square' | 'plastic' | 'social';
  badgeAlignment: 'left' | 'center' | 'right';
  // PRO fields
  fontFamily: string;
  pattern: 'none' | 'dots' | 'grid' | 'waves';
  patternOpacity: number;
  gradientEnabled: boolean;
  textPosition: { x: number; y: number };
  techIcons: string[];
  // Text Effects
  textOutlineColor: string;
  textOutlineWidth: number;
  textShadowBlur: number;
  textShadowColor: string;
  textGlowEnabled: boolean;
  textGlowColor: string;
  textGlowBlur: number;
  // Background Filters
  bgBlur: number;
  bgBrightness: number;
  bgContrast: number;
}

export interface BannerPreset {
  id: string;
  name: string;
  icon: string;
  config: Partial<BannerConfig>;
}

export type BannerLayout = 'centered' | 'split' | 'minimal' | 'modern';

export type BadgeType = 'stars' | 'forks' | 'license' | 'version' | 'issues' | 'pull-requests' | 'last-commit' | 'contributors' | 'watchers' | 'repo-size' | 'top-lang' | 'workflow-status' | 'commit-activity' | 'release-date' | 'hits' | 'custom' | 'twitter' | 'linkedin' | 'discord' | 'youtube' | 'twitch' | 'instagram' | 'sponsors' | 'facebook' | 'reddit' | 'medium' | 'stackoverflow' | 'tiktok' | 'pinterest' | 'telegram' | 'whatsapp' | 'slack' | 'email' | 'website' | 'behance' | 'dribbble' | 'codepen' | 'patreon' | 'kofi' | 'buymeacoffee' | 'gitlab' | 'bitbucket' | 'npm' | 'docker' | 'devto' | 'hashnode' | 'hackerrank' | 'leetcode' | 'react' | 'nextjs' | 'typescript' | 'tailwindcss' | 'nodejs' | 'python' | 'supabase' | 'vercel' | 'stars-month' | 'forks-month' | 'closed-issues' | 'open-prs' | 'closed-prs' | 'build-status' | 'branches' | 'releases' | 'dependabot' | 'codeql' | 'security-alerts' | 'discussions' | 'downloads' | 'bundle-size' | 'tests-passing' | 'uptime' | 'dependencies' | 'custom-shields';

export interface BadgeItem {
  id: string;
  label: string;
  value: string;
  color: string;
  type: BadgeType;
  socialHandle?: string;
}

export interface RepoAnalysis {
  name: string;
  description: string;
  techStack: string[];
  slogan: string;
  suggestedColors: {
    primary: string;
    secondary: string;
  };
}

export interface SocialCopy {
  hype: string;
  professional: string;
  minimal: string;
}

export enum BannerSize {
  OPEN_GRAPH = '1200x630',
  SOCIAL_PREVIEW = '1280x640',
  PROFILE_README = '1500x500',
  REPOSITORY_BANNER = '2000x600'
}
