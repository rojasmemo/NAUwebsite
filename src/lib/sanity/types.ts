// src/lib/sanity/types.ts
import type { Image } from 'sanity';

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

export interface HomePage {
  title: string;
  seoDescription: string;
  hero1: Hero;
  splitSection1: SplitSection;
  hero2: Hero;
  featureSection: FeatureSection;
  splitSection2: SplitSection;
  hero3: Hero;
}

export interface Hero {
  heading: string;
  subheading1?: string;
  subheading2?: string;
  image: SanityImage;
  alt?: string;
  cta?: Cta;
}

export interface SplitSection {
  heading: string;
  paragraph1: string;
  paragraph2?: string;
  subheading?: string;
  image: SanityImage;
  alt?: string;
}

export interface FeatureSection {
  heading: string;
  feature1: Feature;
  feature2: Feature;
  subheading: string;
}

export interface Feature {
  icon: Image;
  iconAlt?: string;
  title: string;
  items: string[];
  link?: Cta;
}