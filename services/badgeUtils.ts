import { BadgeItem, BadgeType } from '../types';

export interface BadgeLinkData {
  src: string;
  href: string;
}

export const SOCIAL_PLATFORMS: Record<
  string,
  { label: string; logo: string; defaultColor: string; urlPattern: string }
> = {
  twitter: { label: 'Twitter', logo: 'twitter', defaultColor: '1DA1F2', urlPattern: 'https://twitter.com/' },
  linkedin: { label: 'LinkedIn', logo: 'linkedin', defaultColor: '0A66C2', urlPattern: 'https://linkedin.com/in/' },
  discord: { label: 'Discord', logo: 'discord', defaultColor: '5865F2', urlPattern: 'https://discord.gg/' },
  youtube: { label: 'YouTube', logo: 'youtube', defaultColor: 'FF0000', urlPattern: 'https://youtube.com/@' },
  twitch: { label: 'Twitch', logo: 'twitch', defaultColor: '9146FF', urlPattern: 'https://twitch.tv/' },
  instagram: { label: 'Instagram', logo: 'instagram', defaultColor: 'E4405F', urlPattern: 'https://instagram.com/' },
  sponsors: { label: 'Sponsor', logo: 'github-sponsors', defaultColor: 'EA4AAA', urlPattern: 'https://github.com/sponsors/' },
  facebook: { label: 'Facebook', logo: 'facebook', defaultColor: '1877F2', urlPattern: 'https://facebook.com/' },
  reddit: { label: 'Reddit', logo: 'reddit', defaultColor: 'FF4500', urlPattern: 'https://reddit.com/user/' },
  medium: { label: 'Medium', logo: 'medium', defaultColor: '000000', urlPattern: 'https://medium.com/@' },
  stackoverflow: { label: 'Stack Overflow', logo: 'stackoverflow', defaultColor: 'F58025', urlPattern: 'https://stackoverflow.com/users/' },
  tiktok: { label: 'TikTok', logo: 'tiktok', defaultColor: '000000', urlPattern: 'https://tiktok.com/@' },
  pinterest: { label: 'Pinterest', logo: 'pinterest', defaultColor: 'BD081C', urlPattern: 'https://pinterest.com/' },
  telegram: { label: 'Telegram', logo: 'telegram', defaultColor: '26A5E4', urlPattern: 'https://t.me/' },
  whatsapp: { label: 'WhatsApp', logo: 'whatsapp', defaultColor: '25D366', urlPattern: 'https://wa.me/' },
  slack: { label: 'Slack', logo: 'slack', defaultColor: '4A154B', urlPattern: '' },
  email: { label: 'Email', logo: 'gmail', defaultColor: 'D14836', urlPattern: 'mailto:' },
  website: { label: 'Website', logo: 'google-chrome', defaultColor: '4285F4', urlPattern: 'https://' },
  behance: { label: 'Behance', logo: 'behance', defaultColor: '1769FF', urlPattern: 'https://behance.net/' },
  dribbble: { label: 'Dribbble', logo: 'dribbble', defaultColor: 'EA4C89', urlPattern: 'https://dribbble.com/' },
  codepen: { label: 'CodePen', logo: 'codepen', defaultColor: '000000', urlPattern: 'https://codepen.io/' },
  patreon: { label: 'Patreon', logo: 'patreon', defaultColor: 'F96854', urlPattern: 'https://patreon.com/' },
  kofi: { label: 'Ko-fi', logo: 'ko-fi', defaultColor: 'FF5E5B', urlPattern: 'https://ko-fi.com/' },
  buymeacoffee: { label: 'Buy Me a Coffee', logo: 'buymeacoffee', defaultColor: 'FFDD00', urlPattern: 'https://buymeacoffee.com/' },
  gitlab: { label: 'GitLab', logo: 'gitlab', defaultColor: 'FC6D26', urlPattern: 'https://gitlab.com/' },
  bitbucket: { label: 'Bitbucket', logo: 'bitbucket', defaultColor: '0052CC', urlPattern: 'https://bitbucket.org/' },
  npm: { label: 'NPM', logo: 'npm', defaultColor: 'CB3837', urlPattern: 'https://www.npmjs.com/~' },
  docker: { label: 'Docker', logo: 'docker', defaultColor: '2496ED', urlPattern: 'https://hub.docker.com/u/' },
  devto: { label: 'Dev.to', logo: 'dev.to', defaultColor: '0A0A0A', urlPattern: 'https://dev.to/' },
  hashnode: { label: 'Hashnode', logo: 'hashnode', defaultColor: '2962FF', urlPattern: 'https://hashnode.com/@' },
  hackerrank: { label: 'HackerRank', logo: 'hackerrank', defaultColor: '2EC866', urlPattern: 'https://hackerrank.com/' },
  leetcode: { label: 'LeetCode', logo: 'leetcode', defaultColor: 'FFA116', urlPattern: 'https://leetcode.com/' },
  // NUEVAS PLATAFORMAS TECH AÑADIDAS
  vercel: { label: 'Vercel', logo: 'vercel', defaultColor: '000000', urlPattern: 'https://vercel.com/' },
  react: { label: 'React', logo: 'react', defaultColor: '61DAFB', urlPattern: 'https://react.dev/' },
  nextjs: { label: 'Next.js', logo: 'next.js', defaultColor: '000000', urlPattern: 'https://nextjs.org/' },
  typescript: { label: 'TypeScript', logo: 'typescript', defaultColor: '3178C6', urlPattern: 'https://www.typescriptlang.org/' },
  tailwindcss: { label: 'Tailwind CSS', logo: 'tailwindcss', defaultColor: '06B6D4', urlPattern: 'https://tailwindcss.com/' },
  nodejs: { label: 'Node.js', logo: 'nodedotjs', defaultColor: '339933', urlPattern: 'https://nodejs.org/' },
  python: { label: 'Python', logo: 'python', defaultColor: '3776AB', urlPattern: 'https://python.org/' },
  supabase: { label: 'Supabase', logo: 'supabase', defaultColor: '3ECF8E', urlPattern: 'https://supabase.com/' },
};

export const BADGE_GROUPS: Record<string, { label: string; badges: BadgeType[] }> = {
  stats: {
    label: 'Repository Stats',
    badges: [
      'stars', 'stars-month', 'forks', 'forks-month', 'license', 'version', 'issues', 'closed-issues', 'pull-requests', 'open-prs', 'closed-prs',
      'last-commit', 'contributors', 'watchers', 'repo-size', 'top-lang',
      'workflow-status', 'build-status', 'commit-activity', 'release-date', 'hits', 'branches', 'releases', 'dependabot', 'codeql', 'security-alerts', 'discussions', 'downloads', 'bundle-size', 'tests-passing', 'uptime', 'dependencies', 'custom-shields'
    ]
  },
  social: {
    label: 'Social Media',
    badges: [
      'twitter', 'linkedin', 'discord', 'youtube', 'twitch', 'instagram',
      'facebook', 'reddit', 'medium', 'tiktok', 'pinterest', 'telegram',
      'whatsapp', 'slack', 'email', 'website'
    ]
  },
  frameworks: {
    label: 'Tech Stack (Auto-Color)',
    badges: [
      'react', 'nextjs', 'typescript', 'tailwindcss', 'nodejs', 'python', 'supabase', 'vercel'
    ]
  },
  tech: {
    label: 'Platforms',
    badges: [
      'stackoverflow', 'behance', 'dribbble', 'codepen', 'gitlab',
      'bitbucket', 'npm', 'docker', 'devto', 'hashnode', 'hackerrank',
      'leetcode'
    ]
  },
  funding: {
    label: 'Funding',
    badges: ['sponsors', 'patreon', 'kofi', 'buymeacoffee']
  },
  custom: {
    label: 'Custom',
    badges: ['custom']
  }
};

export function getBadgeLinkData(options: {
  repoUrl: string;
  badge: BadgeItem;
  style: string;
}): BadgeLinkData {
  const { repoUrl, badge, style } = options;

  const repoPath = repoUrl.replace('https://github.com/', '').replace(/\/$/, '');
  const username = repoPath.split('/')[0] || '';

  const colorValue = badge.color ? badge.color.replace('#', '') : 'blue';
  const handle = badge.socialHandle || 'link';

  if (badge.type in SOCIAL_PLATFORMS) {
    const platform = SOCIAL_PLATFORMS[badge.type];
    const finalColor = badge.color && badge.color !== 'auto' ? colorValue : platform.defaultColor;
    
    const isFramework = BADGE_GROUPS.frameworks.badges.includes(badge.type as BadgeType);

    const text = badge.type === 'sponsors' ? 'Sponsor Me' : (isFramework ? '' : handle);
    const targetUrl = badge.type === 'sponsors' ? `${platform.urlPattern}${username}` : (isFramework ? platform.urlPattern : `${platform.urlPattern}${handle}`);

    const src = isFramework
        ? `https://img.shields.io/badge/-${encodeURIComponent(platform.label)}-${finalColor}?style=${style}&logo=${platform.logo}&logoColor=white`
        : `https://img.shields.io/badge/${platform.label}-${encodeURIComponent(text)}-${finalColor}?style=${style}&logo=${platform.logo}&logoColor=white`;

    return {
      src,
      href: targetUrl,
    };
  }

  let badgeSrc = '';
  let badgeHref = `${repoUrl}`;

  switch (badge.type) {
    case 'stars':
      badgeSrc = `https://img.shields.io/github/stars/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/stargazers`;
      break;
    case 'stars-month':
      badgeSrc = `https://img.shields.io/github/stars/${repoPath}/?style=${style}&color=${colorValue}&logo=github&label=stars%20this%20month`;
      badgeHref = `${repoUrl}/stargazers`;
      break;
    case 'forks':
      badgeSrc = `https://img.shields.io/github/forks/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/network/members`;
      break;
    case 'forks-month':
      badgeSrc = `https://img.shields.io/github/forks/${repoPath}/?style=${style}&color=${colorValue}&logo=github&label=forks%20this%20month`;
      badgeHref = `${repoUrl}/network/members`;
      break;
    case 'license':
      badgeSrc = `https://img.shields.io/github/license/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      break;
    case 'version':
      badgeSrc = `https://img.shields.io/github/v/release/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/releases`;
      break;
    case 'issues':
      badgeSrc = `https://img.shields.io/github/issues/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/issues`;
      break;
    case 'closed-issues':
      badgeSrc = `https://img.shields.io/github/issues-closed/${repoPath}?style=${style}&color=${colorValue}&logo=github&label=closed%20issues`;
      badgeHref = `${repoUrl}/issues?q=is%3Aissue+is%3Aclosed`;
      break;
    case 'pull-requests':
      badgeSrc = `https://img.shields.io/github/issues-pr/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/pulls`;
      break;
    case 'open-prs':
      badgeSrc = `https://img.shields.io/github/issues-pr/${repoPath}?style=${style}&color=${colorValue}&logo=github&label=open%20PRs`;
      badgeHref = `${repoUrl}/pulls?q=is%3Apr+is%3Aopen`;
      break;
    case 'closed-prs':
      badgeSrc = `https://img.shields.io/github/issues-pr-closed/${repoPath}?style=${style}&color=${colorValue}&logo=github&label=closed%20PRs`;
      badgeHref = `${repoUrl}/pulls?q=is%3Apr+is%3Aclosed`;
      break;
    case 'last-commit':
      badgeSrc = `https://img.shields.io/github/last-commit/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      break;
    case 'contributors':
      badgeSrc = `https://img.shields.io/github/contributors/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/graphs/contributors`;
      break;
    case 'watchers':
      badgeSrc = `https://img.shields.io/github/watchers/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      break;
    case 'repo-size':
      badgeSrc = `https://img.shields.io/github/repo-size/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      break;
    case 'top-lang':
      badgeSrc = `https://img.shields.io/github/languages/top/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      break;
    case 'workflow-status':
      badgeSrc = `https://img.shields.io/github/actions/workflow/status/${repoPath}/main.yml?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/actions`;
      break;
    case 'build-status':
      badgeSrc = `https://img.shields.io/github/workflow/status/${repoPath}/build?style=${style}&color=${colorValue}&logo=github&label=build`;
      badgeHref = `${repoUrl}/actions`;
      break;
    case 'commit-activity':
      badgeSrc = `https://img.shields.io/github/commit-activity/m/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      break;
    case 'release-date':
      badgeSrc = `https://img.shields.io/github/release-date/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      break;
    case 'hits':
      badgeSrc = `https://img.shields.io/badge/dynamic/json?color=${colorValue}&label=hits&query=value&url=https%3A%2F%2Fapi.countapi.xyz%2Fhit%2F${repoPath.replace('/', '-')}` +
        `%2Fvisits&style=${style}&logo=github`;
      break;
    case 'branches':
      badgeSrc = `https://img.shields.io/github/branches/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/branches`;
      break;
    case 'releases':
      badgeSrc = `https://img.shields.io/github/releases/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/releases`;
      break;
    case 'dependabot':
      badgeSrc = `https://img.shields.io/github/dependabot/${repoPath}?style=${style}&color=${colorValue}&logo=dependabot`;
      badgeHref = `${repoUrl}/network/updates`;
      break;
    case 'codeql':
      badgeSrc = `https://img.shields.io/github/codeql/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/security/code-scanning`;
      break;
    case 'security-alerts':
      badgeSrc = `https://img.shields.io/github/alerts/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/security/dependabot`;
      break;
    case 'discussions':
      badgeSrc = `https://img.shields.io/github/discussions/${repoPath}?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/discussions`;
      break;
    case 'downloads':
      badgeSrc = `https://img.shields.io/github/downloads/${repoPath}/total?style=${style}&color=${colorValue}&logo=github`;
      badgeHref = `${repoUrl}/releases`;
      break;
    case 'bundle-size':
      badgeSrc = `https://img.shields.io/bundlephobia/minzip/${repoPath}?style=${style}&color=${colorValue}&logo=bundlephobia`;
      badgeHref = `https://bundlephobia.com/result?p=${repoPath}`;
      break;
    case 'tests-passing':
      badgeSrc = `https://img.shields.io/github/tests/${repoPath}?style=${style}&color=${colorValue}&logo=github&label=tests`;
      badgeHref = `${repoUrl}/actions`;
      break;
    case 'uptime':
      badgeSrc = `https://img.shields.io/uptimerobot/status/m786786786-123456789?style=${style}&color=${colorValue}&logo=uptimerobot`;
      badgeHref = `https://uptimerobot.com/`;
      break;
    case 'dependencies':
      badgeSrc = `https://img.shields.io/librariesio/github/${repoPath}?style=${style}&color=${colorValue}&logo=librariesio`;
      badgeHref = `https://libraries.io/github/${repoPath}`;
      break;
    case 'custom-shields':
      badgeSrc = badge.value || `https://img.shields.io/badge/custom-badge-${colorValue}?style=${style}`;
      badgeHref = badge.label || repoUrl;
      break;
    default:
      badgeSrc = `https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${encodeURIComponent(badge.value)}-${colorValue}?style=${style}`;
  }

  return { src: badgeSrc, href: badgeHref };
}
