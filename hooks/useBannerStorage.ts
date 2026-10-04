import { useState } from 'react';
import { BannerConfig } from '../types';

export const useBannerStorage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveBanner = async (config: BannerConfig): Promise<string | null> => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config }),
      });
      
      if (!response.ok) throw new Error('Failed to save');
      
      const data = await response.json();
      return data.shareId;
    } catch (error) {
      console.error('Save error:', error);
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const loadBanner = async (shareId: string): Promise<BannerConfig | null> => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/banners/${shareId}`);
      if (!response.ok) throw new Error('Failed to load');
      const data = await response.json();
      return data.config;
    } catch (error) {
      console.error('Load error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { saveBanner, loadBanner, isSaving, isLoading };
};