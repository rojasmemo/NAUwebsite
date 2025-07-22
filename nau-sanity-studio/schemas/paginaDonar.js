// schemas/paginaDonar.js

export default {
  name: 'paginaDonar',
  title: 'Página de Donar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título (para SEO)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seoDescription',
      title: 'Descripción (para SEO)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hero1',
      title: 'Hero Banner 1 (Superior)',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Encabezado', type: 'string'},
        {name: 'subheading', title: 'Sub-encabezado', type: 'string'},
        {
          name: 'image',
          title: 'Imagen de Fondo',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Texto Alternativo', type: 'string'}],
        },
      ],
    },
    {
      name: 'introduction',
      title: 'Párrafo de Introducción',
      type: 'text',
      description: 'El texto que aparece debajo del primer banner. Usa **texto en negrita** para resaltar.',
    },
    {
      name: 'donationSection',
      title: 'Sección de Métodos de Donación',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Encabezado', type: 'string'},
        {
          name: 'donationCard1',
          title: 'Tarjeta de Donación 1 (Online)',
          type: 'object',
          fields: [
            {name: 'text', title: 'Texto', type: 'string'},
            {name: 'buttonText', title: 'Texto del Botón', type: 'string'},
            {name: 'buttonUrl', title: 'URL del Botón', type: 'url', validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'mailto']})},
          ],
        },
        {
          name: 'donationCard2',
          title: 'Tarjeta de Donación 2 (Transferencia)',
          type: 'object',
          fields: [
            {name: 'text', title: 'Texto', type: 'string'},
            {name: 'bankDetails', title: 'Detalles Bancarios', type: 'array', of: [{type: 'string'}]},
          ],
        },
        {name: 'footerText', title: 'Texto de pie de sección', type: 'string', description: 'El texto que aparece debajo de las tarjetas, ej: *Si realizas una transferencia...*'},
      ],
    },
    {
      name: 'splitSection',
      title: 'Sección Dividida (Agradecimiento)',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Texto principal (negrita)', type: 'text'},
        {
          name: 'image',
          title: 'Imagen',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Texto Alternativo', type: 'string'}],
        },
      ],
    },
    {
      name: 'hero2',
      title: 'Hero Banner 2 (Final)',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Encabezado', type: 'string'},
        {name: 'subheading', title: 'Sub-encabezado', type: 'string'},
        {name: 'cta', title: 'Botón (CTA)', type: 'link'},
        {
          name: 'image',
          title: 'Imagen de Fondo',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Texto Alternativo', type: 'string'}],
        },
      ],
    },
  ],
  __experimental_actions: ['create', 'update', 'delete', 'publish'],
};