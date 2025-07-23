
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
      name: 'introSection',
      title: 'Sección de Introducción (Fondo claro)',
      description: 'Bloque de texto enriquecido que aparece justo debajo del banner principal.',
      type: 'object',
      fields: [
        {
          name: 'body',
          title: 'Contenido',
          type: 'array',
          of: [{type: 'block'}],
        },
      ],
    },
    {
      name: 'bannerWithCards',
      title: 'Banner con 3 Tarjetas',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título del Banner',
          type: 'string',
        },
        {
          name: 'backgroundImage',
          title: 'Imagen de Fondo',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'cards',
          title: 'Tarjetas',
          type: 'array',
          of: [
            {
              title: 'Tarjeta',
              type: 'object',
              fields: [
                {
                  name: 'description',
                  title: 'Texto descriptivo',
                  type: 'text',
                },
              ],
            },
          ],
          validation: (Rule) => Rule.length(3).error('Deben ser exactamente 3 tarjetas.'),
        },
        {
          name: 'bottomIcon',
          title: 'Icono Inferior',
          type: 'image',
        },
      ],
    },
    {
      name: 'detailedSection',
      title: 'Sección Detallada (Fondo blanco)',
      description: 'Sección con título y cuerpo de texto enriquecido.',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'body',
          title: 'Contenido',
          type: 'array',
          of: [{type: 'block'}],
        },
      ],
    },
    {
      name: 'finalSection',
      title: 'Sección Final (Pre-CTA)',
      description: 'La última sección de texto antes del banner de llamada a la acción final.',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
        },
        {
          name: 'body',
          title: 'Contenido',
          type: 'array',
          of: [{type: 'block'}],
        },
      ],
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
