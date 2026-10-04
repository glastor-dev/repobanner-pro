
import React, { useState, useEffect } from 'react';
import { BannerSize, BannerPreset, BadgeType } from './types';
import { THEMES, LAYOUTS, FONTS, PATTERNS, DEFAULT_PRESETS } from './constants';
import BannerCanvas from './components/BannerCanvas';
import { getBadgeLinkData } from './services/badgeUtils';
import { ToastContainer, ToastType } from './components/ui/Toast';
import { Share2, Link as LinkIcon, Loader2, Download } from 'lucide-react';
import { toPng } from 'html-to-image';

import { useBannerStore } from './store/useBannerStore';
import { useRepositoryAnalysis } from './hooks/useRepositoryAnalysis';
// import { useSocialGenerator } from './hooks/useSocialGenerator';
import { useHistory } from './hooks/useHistory';
import { useBannerStorage } from './hooks/useBannerStorage';

// Components
import Navbar from './components/layout/Navbar';
import RepoImport from './components/editor/RepoImport';
import MessagingEditor from './components/editor/MessagingEditor';
import BrandingEditor from './components/editor/BrandingEditor';
import PresetsGallery from './components/editor/PresetsGallery';
import BadgesHub from './components/editor/BadgesHub';
// import SocialSuite from './components/editor/SocialSuite';
import ExportSection from './components/editor/ExportSection';

const App: React.FC = () => {
  // Config Store
  const {
    config,
    setConfig,
    applyPreset,
    draftTitle,
    setDraftTitle,
    draftSubtitle,
    setDraftSubtitle,
    draftLogoSize,
    setDraftLogoSize,
    draftLogoPosX,
    setDraftLogoPosX,
    draftPrimaryColor,
    setDraftPrimaryColor,
    draftSecondaryColor,
    setDraftSecondaryColor,
    draftBgBlur,
    setDraftBgBlur,
    draftBgBrightness,
    setDraftBgBrightness,
    draftBgContrast,
    setDraftBgContrast,
    updateConfig,
    toggleBadge
  } = useBannerStore();

  // History Management
  const { state: historyConfig, push: pushHistory, undo, redo, canUndo, canRedo } = useHistory(config);
  
  // Cloud Storage Hook
  const { saveBanner, loadBanner, isSaving, isLoading: isLoadingCloud } = useBannerStorage();

  // Load shared banner on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareId = params.get('share');
    if (shareId) {
      loadBanner(shareId).then((loadedConfig) => {
        if (loadedConfig) {
          setConfig(loadedConfig);
          addToast('Diseño cargado desde la nube', 'success');
          window.history.replaceState({}, '', window.location.pathname); // Clean URL
        }
      });
    }
  }, []);

  // Sync history with active config
  useEffect(() => {
    const timer = setTimeout(() => {
      pushHistory(config);
    }, 1000);
    return () => clearTimeout(timer);
  }, [config]);

  // Toast System
  const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType }[]>([]);
  const addToast = (message: string, type: ToastType = 'info') => {
    setToasts(prev => [...prev, { id: Date.now(), message, type }]);
  };
  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault(); undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault(); redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Services Hooks
  const { loading: analysisLoading, handleRepoAnalyze } = useRepositoryAnalysis(setConfig);
  // Eliminar Social Suite AI y generación de copys IA
  const socialLoading = false;
  const socialCaptions = null;
  const handleGenerateSocial = () => {};

  // Local State
  const [repoUrlTouched, setRepoUrlTouched] = useState(false);
  // Eliminar generación de logo IA
  const [logoLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<BannerSize>(BannerSize.OPEN_GRAPH);
  const [customPresets, setCustomPresets] = useState<BannerPreset[]>([]);

  useEffect(() => {
    const savedPresets = localStorage.getItem('repobanner-presets');
    if (savedPresets) {
      try { setCustomPresets(JSON.parse(savedPresets)); } catch (e) { console.error("Failed to load presets", e); }
    }
    const savedLogo = localStorage.getItem('repobanner-logo');
    if (savedLogo) setLogoUrl(savedLogo);
    // No generar logo por IA
  }, []);


  const saveCurrentAsPreset = () => {
    const name = prompt("Name your preset:");
    if (!name) return;
    const icon = prompt("Lucide icon name (e.g. Sparkles):", "Sparkles");
    const newPreset: BannerPreset = {
      id: Date.now().toString(),
      name,
      icon: icon || 'Save',
      config: { ...config }
    };
    const updated = [...customPresets, newPreset];
    setCustomPresets(updated);
    localStorage.setItem('repobanner-presets', JSON.stringify(updated));
    addToast('Ajustes guardados como nuevo estilo', 'success');
  };

  const deletePreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("¿Estás seguro de eliminar este estilo?")) return;
    const updated = customPresets.filter(p => p.id !== id);
    setCustomPresets(updated);
    localStorage.setItem('repobanner-presets', JSON.stringify(updated));
  };

  const editPreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const preset = customPresets.find(p => p.id === id);
    if (!preset) return;
    const newName = prompt("Nuevo nombre:", preset.name);
    if (!newName) return;
    const updated = customPresets.map(p => p.id === id ? { ...p, name: newName } : p );
    setCustomPresets(updated);
    localStorage.setItem('repobanner-presets', JSON.stringify(updated));
  };

  const exportPresets = () => {
    const data = JSON.stringify(customPresets, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'repobanner-presets.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importPresets = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          const updated = [...customPresets, ...imported];
          setCustomPresets(updated);
          localStorage.setItem('repobanner-presets', JSON.stringify(updated));
        }
      } catch (err) { console.error("Import error", err); }
    };
    reader.readAsText(file);
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateConfig('backgroundImage', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateConfig('logoImage', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('Copiado al portapapeles', 'success');
  };

  const renderMarkdownBadgeBlock = () => {
    return config.badges
      .map((badge) => {
        const { src, href } = getBadgeLinkData({
          repoUrl: config.repoUrl,
          badge,
          style: config.badgeStyle,
        });
        return `[![${badge.label}](${src})](${href})\n`;
      })
      .join('');
  };

  function isValidRepoUrl(url: string) {
    return /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(url.trim());
  }

  const handleShare = async () => {
    const shareId = await saveBanner(config);
    if (shareId) {
      const url = `${window.location.origin}?share=${shareId}`;
      navigator.clipboard.writeText(url);
      addToast('Enlace copiado al portapapeles', 'success');
    } else {
      addToast('Error al guardar el diseño', 'error');
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById('banner-preview');
    if (!element) return;

    try {
      addToast('Generando imagen...', 'info');
      const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `repobanner-${config.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
      addToast('Imagen descargada', 'success');
    } catch (err) {
      addToast('Error al generar la imagen', 'error');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200">
      <Navbar 
        logoUrl={logoUrl} 
        saveCurrentAsPreset={saveCurrentAsPreset} 
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <main className="max-w-screen-2xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <aside className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-28">
          <RepoImport 
            repoUrl={config.repoUrl}
            repoUrlTouched={repoUrlTouched}
            loading={analysisLoading}
            isValidRepoUrl={isValidRepoUrl}
            onUrlChange={(url) => { updateConfig('repoUrl', url); setRepoUrlTouched(true); }}
            onAnalyze={() => handleRepoAnalyze(config.repoUrl, config.author)}
            onTouched={() => setRepoUrlTouched(true)}
          />

          <MessagingEditor 
            title={draftTitle}
            subtitle={draftSubtitle}
            setTitle={setDraftTitle}
            setSubtitle={setDraftSubtitle}
          />

          <BrandingEditor 
            logoImage={config.logoImage}
            logoSize={draftLogoSize}
            logoPosX={draftLogoPosX}
            fontFamily={config.fontFamily}
            pattern={config.pattern}
            primaryColor={draftPrimaryColor}
            secondaryColor={draftSecondaryColor}
            gradientEnabled={config.gradientEnabled}
            bgBlur={draftBgBlur}
            bgBrightness={draftBgBrightness}
            bgContrast={draftBgContrast}
            backgroundImage={config.backgroundImage}
            onLogoUpload={handleLogoUpload}
            onLogoDrop={(data) => updateConfig('logoImage', data)}
            onBgUpload={handleBgUpload}
            onBgDrop={(data) => updateConfig('backgroundImage', data)}
            onUpdateLogoSize={setDraftLogoSize}
            onUpdateLogoPosX={setDraftLogoPosX}
            onUpdateFont={(val) => updateConfig('fontFamily', val)}
            onUpdatePattern={(val) => updateConfig('pattern', val)}
            onUpdatePrimaryColor={setDraftPrimaryColor}
            onUpdateSecondaryColor={setDraftSecondaryColor}
            onUpdateBgUrl={(url) => updateConfig('backgroundImage', url)}
            onUpdateBgBlur={setDraftBgBlur}
            onUpdateBgBrightness={setDraftBgBrightness}
            onUpdateBgContrast={setDraftBgContrast}
            onToggleGradient={() => updateConfig('gradientEnabled', !config.gradientEnabled)}
          />
        </aside>

        <section className="lg:col-span-8 space-y-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                 <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Editor <span className="text-indigo-500">Pro</span></h2>
                 <button 
                   onClick={handleShare}
                   disabled={isSaving || isLoadingCloud}
                   className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/50 text-indigo-300 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                 >
                   {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Share2 className="w-3 h-3" />}
                   {isSaving ? 'Guardando...' : 'Compartir'}
                 </button>
                 <button 
                   onClick={handleDownload}
                   className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/50 text-emerald-300 rounded-lg text-xs font-bold transition-all"
                 >
                   <Download className="w-3 h-3" /> PNG
                 </button>
               </div>

               <div className="flex bg-slate-900 rounded-xl p-1 border border-white/5 shadow-2xl overflow-x-auto max-w-full">
                  {Object.values(BannerSize).map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${selectedSize === s ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>{s.split('x')[0]}px</button>
                  ))}
               </div>
            </div>
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative" id="banner-preview">
                 <BannerCanvas 
                   config={config} 
                   size={selectedSize} 
                   onUpdateLogoPos={(x, y) => updateConfig('logoPosition', { x, y })}
                   onUpdateTextPos={(x, y) => updateConfig('textPosition', { x, y })}
                 />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PresetsGallery 
              customPresets={customPresets}
              applyPreset={applyPreset}
              editPreset={editPreset}
              deletePreset={deletePreset}
              onExport={exportPresets}
              onImport={importPresets}
            />
            <BadgesHub 
              repoUrl={config.repoUrl}
              badges={config.badges}
              badgeStyle={config.badgeStyle}
              badgeAlignment={config.badgeAlignment}
              secondaryColor={config.secondaryColor}
              toggleBadge={toggleBadge}
            />
          </div>



          <ExportSection 
            markdownBadgeBlock={renderMarkdownBadgeBlock()}
            repoUrl={config.repoUrl}
            badgeAlignment={config.badgeAlignment}
            onCopy={copyToClipboard}
          />
        </section>
      </main>

      <footer className="mt-20 border-t border-white/5 py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 opacity-50 text-[10px] font-bold uppercase tracking-widest text-center md:text-left">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>RepoBanner Pro Engine v2.0</span>
         </div>
         <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <span>Powered by GLASTOR® CORE</span>
            <span>Shields.io Dynamic API</span>
         </div>
      </footer>
    </div>
  );
};

export default App;
