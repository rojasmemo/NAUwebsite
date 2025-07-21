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
      case 'paginaSimbolismoNumerico':
        return '/simbolismo-numerico';
      case 'paginaContacto':
        return '/contacto';
      case 'paginaDonar':
        return '/donar';
      default:
        return cta.internalLink.slug ? `/${cta.internalLink.slug}` : null;
    }
  }
  return null;
};