import {ImageIcon} from '@sanity/icons'

// src/sanity/schemas/banner.js
export default {
  name: 'banner',
  title: 'Banner',
  type: 'object',
  icon: ImageIcon,
  fields: [
    {
      name: 'image',
      title: 'Imagen del Banner',
      type: 'image', 
      options: {
        hotspot: true, // Permite recortar la imagen de forma inteligente
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Texto Alternativo',
      type: 'string',
      description: 'Importante para la accesibilidad (SEO). Describe la imagen.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heading',
      title: 'Encabezado',
      type: 'string',
      description: 'El título principal que se mostrará sobre el banner (opcional).',
    },
    {
      name: 'tagline',
      title: 'Subtítulo o Lema',
      type: 'string',
      description: 'Un texto corto debajo del encabezado (opcional).',
    },
    {
      name: 'cta',
      title: 'Botón de Llamada a la Acción (Opcional)',
      type: 'link',
    },
  ],
};
