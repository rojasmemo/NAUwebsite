// schemas/homePage.js

export default {
  name: 'homePage',
  title: 'Página de Inicio',
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
        {name: 'subheading1', title: 'Sub-encabezado 1', type: 'string'},
        {name: 'subheading2', title: 'Sub-encabezado 2 (opcional)', type: 'string'},
        {name: 'button', title: 'Botón', type: 'link'},
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
      name: 'splitSection1',
      title: 'Sección Dividida 1',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Encabezado', type: 'string'},
        {name: 'paragraph1', title: 'Párrafo 1', type: 'text'},
        {name: 'paragraph2', title: 'Párrafo 2', type: 'text'},
        {name: 'subheading', title: 'Sub-encabezado final', type: 'string'},
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
      title: 'Hero Banner 2 (Intermedio)',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Encabezado', type: 'string'},
        {name: 'subheading1', title: 'Sub-encabezado 1', type: 'string'},
        {name: 'subheading2', title: 'Sub-encabezado 2 (opcional)', type: 'string'},
        {name: 'button', title: 'Botón', type: 'link'},
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
      name: 'featureSection',
      title: 'Sección de Características',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Encabezado Principal', type: 'string'},
        {
          name: 'feature1',
          title: 'Característica 1',
          type: 'object',
          fields: [
            {name: 'title', title: 'Título', type: 'string'},
            {
              name: 'icon',
              title: 'Icono',
              type: 'image',
              fields: [{name: 'alt', title: 'Texto Alternativo', type: 'string'}],
            },
            {name: 'items', title: 'Lista de Puntos', type: 'array', of: [{type: 'string'}]},
            {name: 'link', title: 'Enlace "Conoce más"', type: 'link'},
          ],
        },
        {
          name: 'feature2',
          title: 'Característica 2',
          type: 'object',
          fields: [
            {name: 'title', title: 'Título', type: 'string'},
            {
              name: 'icon',
              title: 'Icono',
              type: 'image',
              fields: [{name: 'alt', title: 'Texto Alternativo', type: 'string'}],
            },
            {name: 'items', title: 'Lista de Puntos', type: 'array', of: [{type: 'string'}]},
            {name: 'link', title: 'Enlace "Conoce más"', type: 'link'},
          ],
        },
        {name: 'subheading', title: 'Sub-encabezado final', type: 'string'},
      ],
    },
    {
      name: 'splitSection2',
      title: 'Sección Dividida 2',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Encabezado', type: 'string'},
        {name: 'paragraph1', title: 'Párrafo 1', type: 'text'},
        {name: 'paragraph2', title: 'Párrafo 2', type: 'text'},
        {name: 'subheading', title: 'Sub-encabezado final', type: 'string'},
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
      name: 'hero3',
      title: 'Hero Banner 3 (Final)',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Encabezado', type: 'string'},
        {name: 'subheading1', title: 'Sub-encabezado (línea superior)', type: 'string'},
        {name: 'button', title: 'Botón', type: 'link'},
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
  // Para asegurar que solo haya un documento de esta página
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
};