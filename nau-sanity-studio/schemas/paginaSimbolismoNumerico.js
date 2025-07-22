
// src/sanity/schemas/paginaSimbolismoNumerico.js
import {DocumentTextIcon} from '@sanity/icons'

export default {
  name: 'paginaSimbolismoNumerico',
  title: 'Página de Simbolismo Numérico',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    {
      name: 'title',
      title: 'Título (para SEO y la pestaña del navegador)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seoDescription',
      title: 'Descripción (para SEO)',
      type: 'text',
      rows: 3,
      description: 'Descripción corta para los motores de búsqueda (Google). Máximo 160 caracteres.',
      validation: (Rule) => Rule.required().max(160),
    },
    {
      name: 'mainBanner',
      title: 'Banner Principal',
      type: 'banner', // Usamos nuestro objeto banner reutilizable
    },
    {
      name: 'introduction',
      title: 'Texto de Introducción',
      description: 'Los párrafos que aparecen debajo del banner principal.',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'ctaBanner',
      title: 'Banner de Llamada a la Acción (Final)',
      description: 'El banner que aparece al final de la página para invitar al usuario a contactar.',
      type: 'banner',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainBanner.image',
    },
  },
}
