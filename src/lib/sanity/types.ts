// src/lib/sanity/types.ts

export interface SanityImage {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export interface Cta {
  text?: string;
  externalUrl?: string;
  internalLink?: {
    _type: string;
    slug?: string;
  };
}
