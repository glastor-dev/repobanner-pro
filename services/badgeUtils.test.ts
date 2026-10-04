import { expect, test, describe } from 'vitest';
import { getBadgeLinkData, SOCIAL_PLATFORMS, BADGE_GROUPS } from './badgeUtils';
import { BadgeItem } from '../types';

describe('badgeUtils', () => {
  const mockRepoUrl = 'https://github.com/glastor-dev/repobanner-pro';

  test('should generate correct URL for tech framework badges', () => {
    const badge: BadgeItem = {
      id: '1',
      type: 'react',
      label: 'React',
      value: 'auto',
      color: 'auto'
    };

    const result = getBadgeLinkData({ repoUrl: mockRepoUrl, badge, style: 'for-the-badge' });
    
    // Tech badges shouldn't append handle/username, they should just link to the official site
    expect(result.href).toBe('https://react.dev/');
    // Tech badges shouldn't have 'link' suffix, they use the special layout
    expect(result.src).toContain('https://img.shields.io/badge/-React-61DAFB');
  });

  test('should generate correct URL for repository stats badges', () => {
    const badge: BadgeItem = {
      id: '2',
      type: 'stars',
      label: 'stars',
      value: 'auto',
      color: '#f59e0b'
    };

    const result = getBadgeLinkData({ repoUrl: mockRepoUrl, badge, style: 'flat' });
    
    expect(result.href).toBe('https://github.com/glastor-dev/repobanner-pro/stargazers');
    expect(result.src).toContain('glastor-dev/repobanner-pro');
    expect(result.src).toContain('f59e0b');
  });

  test('should generate correct URL for social platforms', () => {
    const badge: BadgeItem = {
      id: '3',
      type: 'twitter',
      label: 'Twitter',
      value: 'auto',
      socialHandle: 'glastor_dev',
      color: 'auto'
    };

    const result = getBadgeLinkData({ repoUrl: mockRepoUrl, badge, style: 'flat' });
    
    expect(result.href).toBe('https://twitter.com/glastor_dev');
    expect(result.src).toContain('glastor_dev');
    expect(result.src).toContain('1DA1F2'); // Twitter default color
  });
});