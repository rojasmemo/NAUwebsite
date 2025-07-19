"""// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import FeatureCard from './FeatureCard.astro';

// Mock para el componente SanityImage, ya que no queremos probar Sanity en esta prueba unitaria.
const MockSanityImage = {
  template: '<img src="mock-sanity-image" alt="mock-alt" />',
  props: ['image', 'alt', 'width', 'class', 'loading', 'noShadow'],
};

describe('FeatureCard', () => {
  it('debería renderizar el título y el slot de contenido', async () => {
    const container = await AstroContainer.create();
    const result = await container.render(FeatureCard, {
      props: {
        // @ts-ignore
        icon: { _type: 'image', asset: { _ref: 'image-xxx-jpg' } },
        title: 'Título de Prueba',
      },
      slots: {
        default: 'Este es el contenido del slot.',
      },
      components: {
        './SanityImage.astro': MockSanityImage,
      }
    });

    expect(result).to.include('Título de Prueba');
    expect(result).to.include('Este es el contenido del slot.');
  });

  it('debería renderizar un enlace cuando se proporciona la prop link', async () => {
    const container = await AstroContainer.create();
    const result = await container.render(FeatureCard, {
      props: {
        // @ts-ignore
        icon: { _type: 'image', asset: { _ref: 'image-xxx-jpg' } },
        title: 'Prueba con Enlace',
        link: '/mi-enlace',
        linkText: 'Ir ahora',
      },
      components: {
        './SanityImage.astro': MockSanityImage,
      }
    });

    expect(result).to.include('href="/mi-enlace"');
    expect(result).to.include('Ir ahora');
  });

  it('debería renderizar un span deshabilitado cuando no se proporciona la prop link', async () => {
    const container = await AstroContainer.create();
    const result = await container.render(FeatureCard, {
      props: {
        // @ts-ignore
        icon: { _type: 'image', asset: { _ref: 'image-xxx-jpg' } },
        title: 'Prueba sin Enlace',
        linkText: 'No disponible',
      },
      components: {
        './SanityImage.astro': MockSanityImage,
      }
    });

    expect(result).to.include('<span');
    expect(result).to.include('cursor-not-allowed');
    expect(result).to.include('No disponible');
    expect(result).not.to.include('<a');
  });
});
""