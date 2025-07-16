import type { Cta } from './sanity/types';

export const resolveCtaLink = (cta: Cta | undefined): string | null => {
  if (!cta) return null;
  if (cta.externalUrl) return cta.externalUrl;
  if (cta.internalLink) {
    switch (cta.internalLink._type) {
      case 'homePage':
        return '/';
      case 'paginaEncuentros':
        return '/encuentros';
      // Agrega más casos según los tipos de página que tengas
      default:
        return cta.internalLink.slug ? `/${cta.internalLink.slug}` : null;
    }
  }
  return null;
};