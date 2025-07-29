// nau-sanity-studio/schemas/paginaSobreNau.js
export default {
  name: 'paginaSobreNau',
  title: 'Página Sobre NAU',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título de la Página (para SEO)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seoDescription',
      title: 'Descripción SEO',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.required().max(160).warning('Una buena descripción SEO tiene entre 50 y 160 caracteres.'),
    },
    {
      name: 'heroBanner1',
      title: 'Hero Banner 1',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'mainText', title: 'Texto Principal', type: 'text' },
        { name: 'secondaryText', title: 'Texto Secundario', type: 'text' },
        { name: 'heroImage1', title: 'Imagen de Fondo', type: 'image' },
        { name: 'decorativeImage', title: 'Imagen Decorativa', type: 'image' },
      ],
    },
    {
      name: 'contentSection1',
      title: 'Sección de Contenido 1: ¿Por qué existimos?',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo', type: 'string' },
        {
          name: 'paragraphs',
          title: 'Párrafos',
          type: 'array',
          of: [{ type: 'text' }],
        },
      ],
    },
    {
      name: 'contentSection2',
      title: 'Sección de Contenido 2: ¿Qué hacemos y cómo?',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo', type: 'string' },
        {
          name: 'paragraphs',
          title: 'Párrafos',
          type: 'array',
          of: [{ type: 'text' }],
        },
        { name: 'cta', title: 'Botón (CTA)', type: 'link' },
        { name: 'contentImage', title: 'Imagen de la Sección', type: 'image' },
      ],
    },
    {
      name: 'bannerWithCards',
      title: 'Banner con Tarjetas: ¿Cómo lo hacemos?',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo', type: 'string' },
        { name: 'backgroundImage', title: 'Imagen de Fondo', type: 'image' },
        {
          name: 'cards',
          title: 'Tarjetas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'description', title: 'Descripción', type: 'text' },
              ],
            },
          ],
        },
        { name: 'bottomText', title: 'Texto Inferior', type: 'text' },
      ],
    },
    {
      name: 'contentSection3',
      title: 'Sección de Contenido 3: Nuestro Propósito',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'subtitle', title: 'Subtítulo', type: 'string' },
        {
          name: 'paragraphs',
          title: 'Párrafos',
          type: 'array',
          of: [{ type: 'text' }],
        },
      ],
    },
    {
      name: 'heroBanner2',
      title: 'Hero Banner 2',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'mainText', title: 'Texto Principal', type: 'text' },
        { name: 'cta', title: 'Botón (CTA)', type: 'link' },
        { name: 'heroImage2', title: 'Imagen de Fondo', type: 'image' },
      ],
    },
  ],
}