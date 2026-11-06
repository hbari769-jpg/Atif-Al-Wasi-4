// Centralized AI Model Configurations for Aestific
export interface ModelConfig {
  id: string;
  name: string;
  provider: 'Google' | 'Groq' | 'Exa' | 'OpenAI' | 'Anthropic' | 'Custom';
  underlyingModel: string;
  description: string;
  speed: string;
  context: string;
  role?: 'default' | 'coding_reasoning' | 'hard_tasks' | 'web_research' | 'image' | 'fallback';
  isDefault?: boolean;
}

export const GEMINI_MODELS = {
  // Ultra-fast Flash-Lite flagship for instant streaming and everyday responsiveness
  MAIN: "gemini-flash-lite-latest",
  FAST: "gemini-flash-lite-latest",
  PRO: "gemini-3.8-flash",
} as const;

// Production Google Image Generation Models (Nano Banana series)
export const IMAGE_MODELS = {
  DEFAULT: 'gemini-3.1-flash-lite-image',
  HIGH_QUALITY: 'gemini-3.1-flash-image',
} as const;

export const DEFAULT_IMAGE_MODEL_ID = IMAGE_MODELS.DEFAULT;

// Groq models for reasoning, coding specialist, and fallback
export const GROQ_MODELS = { REASONING: "llama-3.3-70b-versatile", FALLBACK: "gemini-flash-lite-latest", MAIN: "llama-3.3-70b-versatile" } as const;

export const DEFAULT_MODEL_ID = GEMINI_MODELS.MAIN;
export const LOW_COST_MODEL_ID = GEMINI_MODELS.FAST;

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'aestific-core',
    name: 'Aestific Core',
    provider: 'Google',
    underlyingModel: 'gemini-flash-lite-latest',
    description: 'Everyday speed & precision',
    speed: 'Ultra Fast',
    context: '1M Tokens',
    role: 'default',
    isDefault: true,
  },
  {
    id: 'aestific-reason',
    name: 'Aestific Reason',
    provider: 'Groq',
    underlyingModel: 'llama-3.3-70b-versatile',
    description: 'Deep logic, math & technical coding',
    speed: 'Fast',
    context: '128K Tokens',
    role: 'coding_reasoning',
  },
  {
    id: 'aestific-ultra',
    name: 'Aestific Ultra',
    provider: 'Google',
    underlyingModel: 'gemini-3.8-flash',
    description: 'Hard multi-step research & system design',
    speed: 'Deep',
    context: '2M Tokens',
    role: 'hard_tasks',
  },
  {
    id: 'aestific-visual',
    name: 'Aestific Visual',
    provider: 'Google',
    underlyingModel: 'gemini-3.1-flash-lite-image',
    description: 'Photorealistic image generation',
    speed: 'Instant',
    context: 'Image Model',
    role: 'image',
  },
];

export function normalizeAndValidateModel(modelInput?: string | null): string {
  if (!modelInput || typeof modelInput !== "string") {
    return DEFAULT_MODEL_ID;
  }
  const clean = modelInput.trim().toLowerCase();
  if (clean === 'default' || clean === 'auto' || clean === 'aestific-core' || clean.includes('flash-lite') || clean.includes('3.1-flash-lite') || clean.includes('3.5')) {
    return GEMINI_MODELS.MAIN;
  }
  if (clean === 'aestific-ultra' || clean === 'ultra' || clean.includes('pro') || clean.includes('3.8-flash') || clean.includes('flash-latest')) {
    return GEMINI_MODELS.PRO;
  }
  if (clean === 'aestific-reason' || clean === 'reason' || clean.includes('qwen') || clean.includes('llama')) {
    return GROQ_MODELS.REASONING;
  }
  if (clean === 'aestific-visual' || clean === 'visual') {
    return IMAGE_MODELS.DEFAULT;
  }
  return DEFAULT_MODEL_ID;
}

export function normalizeAndValidateImageModel(modelInput?: string | null): string {
  return IMAGE_MODELS.DEFAULT;
}