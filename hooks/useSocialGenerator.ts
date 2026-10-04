import { useState } from 'react';
import { generateSocialCaptions } from '../services/geminiService';
import { BannerConfig, SocialCopy } from '../types';

export const useSocialGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [socialCaptions, setSocialCaptions] = useState<SocialCopy | null>(null);

  const handleGenerateSocial = async (config: BannerConfig) => {
    setLoading(true);
    try {
      const result = await generateSocialCaptions(config);
      if (result) setSocialCaptions(result);
    } catch (error) {
      console.error('Social Generation Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, socialCaptions, handleGenerateSocial };
};
