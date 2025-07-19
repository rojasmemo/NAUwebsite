// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { resolveCtaLink } from './utils';

describe('resolveCtaLink', () => {
  it('debería devolver null si el cta es undefined', () => {
    expect(resolveCtaLink(undefined)).toBe(null);
  });

  it('debería devolver la URL externa si existe', () => {
    const cta = { externalUrl: 'https://dominio-externo.com' };
    expect(resolveCtaLink(cta)).toBe('https://dominio-externo.com');
  });

  it('debería priorizar la URL externa sobre el enlace interno', () => {
    const cta = {
      externalUrl: 'https://dominio-externo.com',
      internalLink: { _type: 'homePage' },
    };
    expect(resolveCtaLink(cta)).toBe('https://dominio-externo.com');
  });

  it('debería devolver "/" para un enlace interno de tipo "homePage"', () => {
    const cta = { internalLink: { _type: 'homePage' } };
    expect(resolveCtaLink(cta)).toBe('/');
  });

  it('debería devolver "/encuentros" para un enlace interno de tipo "paginaEncuentros"', () => {
    const cta = { internalLink: { _type: 'paginaEncuentros' } };
    expect(resolveCtaLink(cta)).toBe('/encuentros');
  });

  it('debería devolver "/simbolismo-numerico" para un enlace interno de tipo "paginaSimbolismoNumerico"', () => {
    const cta = { internalLink: { _type: 'paginaSimbolismoNumerico' } };
    expect(resolveCtaLink(cta)).toBe('/simbolismo-numerico');
  });

  it('debería devolver una ruta basada en el slug para otros tipos de enlaces internos', () => {
    const cta = { internalLink: { _type: 'genericPage', slug: 'una-pagina-genial' } };
    expect(resolveCtaLink(cta)).toBe('/una-pagina-genial');
  });

  it('debería devolver null para un enlace interno sin slug (y que no es un caso especial)', () => {
    const cta = { internalLink: { _type: 'genericPage' } };
    expect(resolveCtaLink(cta)).toBe(null);
  });

  it('debería devolver null si el objeto cta está vacío o no tiene propiedades relevantes', () => {
    const cta = {};
    expect(resolveCtaLink(cta)).toBe(null);
  });
});
