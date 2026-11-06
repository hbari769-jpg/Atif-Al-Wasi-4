export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  h1: string;
}

export const SITE_URL = 'https://aestific.com';
export const DEFAULT_OG_IMAGE = 'https://aestific.com/aestific-logo.png';

export const PAGES_SEO: Record<string, PageSEO> = {
  home: {
    title: 'Aestific AI — Beyond Intelligence, Into Possibility',
    description: 'Discover Aestific AI, an intelligent platform for AI chat, reasoning, coding, web research, image generation, and more.',
    canonical: 'https://aestific.com/',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Beyond Intelligence Into Possibility',
  },
  about: {
    title: 'About Aestific AI — Intelligence Reimagined',
    description: "Discover Aestific AI's mission, unified neural architecture principles, and vision for making advanced artificial intelligence intuitive and accessible.",
    canonical: 'https://aestific.com/about',
    ogType: 'article',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'About Aestific AI',
  },
  enhance: {
    title: 'Aestific Enhance — Intelligent Prompt Transformation | Aestific AI',
    description: 'Transform rough instructions into structured, context-rich prompts with tone, formatting, and semantic precision using Aestific Enhance.',
    canonical: 'https://aestific.com/enhance',
    ogType: 'website',
    ogImage: 'https://aestific.com/aestific-enhance-poster.png',
    h1: 'Aestific Enhance',
  },
  focus: {
    title: 'Aestific Focus — Contextual Precision Toolbar | Aestific AI',
    description: 'Select any word, sentence, or claim from an AI response to instantly explain, translate, verify facts, or reply without breaking your conversation flow.',
    canonical: 'https://aestific.com/focus',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Aestific Focus',
  },
  founder: {
    title: 'Meet the Founder — Atif Al Wasi | Aestific AI',
    description: 'Learn about Atif Al Wasi, the founder and developer of Aestific AI, and his vision to build accessible, unified artificial intelligence from Bangladesh.',
    canonical: 'https://aestific.com/founder',
    ogType: 'profile',
    ogImage: 'https://aestific.com/founder-colonnade.jpg',
    h1: 'Meet the Founder — Atif Al Wasi',
  },
  docs: {
    title: 'Documentation — System Architecture & Safety Guides | Aestific AI',
    description: 'Explore official documentation, core principles, multi-model intelligence, AI safety limitations, acceptable use, and data security in Aestific AI.',
    canonical: 'https://aestific.com/docs',
    ogType: 'article',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Documentation & System Architecture',
  },
  support: {
    title: 'Help & Support — Assistance & Community | Aestific AI',
    description: 'Get help, submit support tickets, review troubleshooting guidance, and connect directly with the Aestific AI support and engineering team.',
    canonical: 'https://aestific.com/support',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Help & Support Center',
  },
  privacy: {
    title: 'Privacy Policy — Data Governance & Protection | Aestific AI',
    description: 'Read the official Aestific AI Privacy Policy. Learn how your account data, chat histories, uploaded files, and privacy rights are safeguarded and managed.',
    canonical: 'https://aestific.com/privacy',
    ogType: 'article',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Privacy Policy for Aestific AI',
  },
  terms: {
    title: 'Terms of Service — User Agreement | Aestific AI',
    description: 'Review the official Terms of Service for Aestific AI, covering terms of use, account obligations, acceptable use guidelines, and platform service terms.',
    canonical: 'https://aestific.com/terms',
    ogType: 'article',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Terms of Service for Aestific AI',
  },
  signup: {
    title: 'Sign Up — Create Your Free Account | Aestific AI',
    description: 'Create your free Aestific AI account to unlock multi-turn intelligence chat, custom neural reasoning, live web research, and high-resolution image generation.',
    canonical: 'https://aestific.com/signup',
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    h1: 'Create your Aestific AI account',
  },
};

/**
 * Updates DOM head elements dynamically for client-side routing.
 */
export function updatePageSEO(pageKey: keyof typeof PAGES_SEO | string) {
  if (typeof document === 'undefined') return;

  const config = PAGES_SEO[pageKey] || PAGES_SEO.home;

  // Title
  document.title = config.title;

  // Meta Description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', config.description);

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', config.canonical);

  // OpenGraph Tags helper
  const setMetaProperty = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  setMetaProperty('og:site_name', 'Aestific AI');
  setMetaProperty('og:title', config.title);
  setMetaProperty('og:description', config.description);
  setMetaProperty('og:url', config.canonical);
  setMetaProperty('og:type', config.ogType || 'website');
  setMetaProperty('og:image', config.ogImage || DEFAULT_OG_IMAGE);

  // Twitter Tags helper
  const setMetaName = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:title', config.title);
  setMetaName('twitter:description', config.description);
  setMetaName('twitter:image', config.ogImage || DEFAULT_OG_IMAGE);
}
