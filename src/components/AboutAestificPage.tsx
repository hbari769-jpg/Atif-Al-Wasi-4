import React, { useEffect } from 'react';
import { ArrowLeft, Sparkles, Compass, ArrowRight, MessageSquare, Cpu, Code2, Search, Image as ImageIcon } from 'lucide-react';
import { AestificArchIcon } from './AestificLogo';
import { updatePageSEO } from '../lib/seo';

interface AboutAestificPageProps {
  onBack: () => void;
  onNavigate?: (path: string) => void;
}

export const AboutAestificPage: React.FC<AboutAestificPageProps> = ({ onBack, onNavigate }) => {
  useEffect(() => {
    updatePageSEO('about');
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col w-screen h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans">
      {/* Top Header Bar */}
      <header className="h-16 px-4 sm:px-8 border-b border-zinc-200 dark:border-white/10 bg-zinc-50/90 dark:bg-zinc-950/80 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors border border-zinc-300 dark:border-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Aestific</span>
          </button>

          <div className="flex items-center gap-2.5">
            <AestificArchIcon size={20} className="text-black dark:text-white shrink-0" />
            <span
              className="lowercase font-medium tracking-[0.18em] text-sm sm:text-base text-zinc-900 dark:text-white select-none"
              style={{ fontFamily: "'Comfortaa', cursive, sans-serif", fontWeight: 500 }}
            >
              aestific platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleLinkClick({ preventDefault: () => {} } as any, '/signup')}
            className="px-4 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content Scrollable Area */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-10 sm:py-16 relative">
        <div className="max-w-3xl mx-auto space-y-12 relative z-10 pb-20">
          
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 dark:bg-white/10 text-zinc-800 dark:text-zinc-200">
              <Sparkles className="w-3 h-3 text-zinc-700 dark:text-zinc-300" />
              <span>PLATFORM OVERVIEW</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
              What is Aestific?
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
              Aestific is an AI platform designed to bring multiple AI capabilities into one place, making artificial intelligence easier to access and use.
            </p>
          </div>

          {/* Capabilities List */}
          <div className="space-y-6 pt-4 border-t border-zinc-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Core Capabilities
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              It brings together capabilities such as:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-black dark:text-white shrink-0" />
                <span className="text-sm font-medium">AI Chat</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 flex items-center gap-3">
                <Cpu className="w-5 h-5 text-black dark:text-white shrink-0" />
                <span className="text-sm font-medium">Advanced Reasoning</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 flex items-center gap-3">
                <Code2 className="w-5 h-5 text-black dark:text-white shrink-0" />
                <span className="text-sm font-medium">Coding Assistance</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 flex items-center gap-3">
                <Search className="w-5 h-5 text-black dark:text-white shrink-0" />
                <span className="text-sm font-medium">Web Research</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 flex items-center gap-3 sm:col-span-2">
                <ImageIcon className="w-5 h-5 text-black dark:text-white shrink-0" />
                <span className="text-sm font-medium">Image Generation</span>
              </div>
            </div>
          </div>

          {/* Explain Core Features */}
          <div className="space-y-8 pt-6 border-t border-zinc-200 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Feature Architecture
            </h2>

            {/* Aestific Enhance */}
            <div className="space-y-2 p-6 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Aestific Enhance
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                Aestific Enhance transforms rough, everyday instructions into clearer and more effective prompts while preserving the user's original intent and style.
              </p>
            </div>

            {/* Aestific Focus */}
            <div className="space-y-3 p-6 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Aestific Focus
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                Aestific Focus provides contextual tools for selected text, including:
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <li className="px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-medium text-center">Explain</li>
                <li className="px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-medium text-center">Translate</li>
                <li className="px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-medium text-center">Verify</li>
                <li className="px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-medium text-center">Reply</li>
              </ul>
            </div>

            {/* Smart Routing */}
            <div className="space-y-2 p-6 rounded-3xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Smart Routing
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                Aestific intelligently selects suitable AI models for different tasks, helping users access different AI capabilities through one platform.
              </p>
            </div>
          </div>

          {/* Closing Section */}
          <div className="pt-8 border-t border-zinc-200 dark:border-white/10 text-center space-y-6">
            <blockquote className="text-xl sm:text-2xl font-light tracking-tight text-zinc-950 dark:text-white">
              “Beyond intelligence, into possibility.”
            </blockquote>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all cursor-pointer shadow-md flex items-center gap-2"
              >
                <span>Open Aestific Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/signup"
                onClick={(e) => handleLinkClick(e, '/signup')}
                className="px-6 py-3 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white text-sm font-medium hover:bg-zinc-200 dark:hover:bg-white/20 transition-all cursor-pointer"
              >
                Create Account
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
