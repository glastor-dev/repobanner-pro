import React, { useState } from 'react';
import { analyzeRepository } from '../services/geminiService';
import { BannerConfig } from '../types';

export const useRepositoryAnalysis = (
  setConfig: React.Dispatch<React.SetStateAction<BannerConfig>>
) => {
  const [loading, setLoading] = useState(false);

  const handleRepoAnalyze = async (repoUrl: string, currentAuthor: string) => {
    if (!repoUrl.includes('github.com')) {
      alert('Invalid GitHub URL');
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeRepository(repoUrl);
      if (result) {
        const author = repoUrl.split('github.com/')[1]?.split('/')[0] || currentAuthor;
        setConfig(prev => ({
          ...prev,
          title: result.name,
          subtitle: result.description,
          primaryColor: result.suggestedColors.primary,
          secondaryColor: result.suggestedColors.secondary,
          techIcons: result.techStack,
          author: author,
          textGlowColor: result.suggestedColors.secondary
        }));
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleRepoAnalyze };
};
