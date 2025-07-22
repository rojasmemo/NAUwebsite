export default {
  name: 'simbolismoNumerico',
  title: 'Simbolismo Numérico',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Usa un número para ordenar los servicios (ej. 1, 2, 3...).',
      validation: (Rule) => Rule.required().integer().positive(),
    },
    {
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      description: 'La imagen principal para el servicio (obligatoria).',
      options: {
        hotspot: true, // Permite un recorte inteligente de la imagen
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      description: 'Un resumen breve del servicio (opcional).',
    },
    {
      name: 'body',
      title: 'Contenido Principal',
      type: 'array',
      of: [{type: 'block'}], // Esto habilita el editor de texto enriquecido
      description: 'El contenido detallado del servicio (obligatorio).',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Precio',
      type: 'number',
      description: 'Precio del servicio en tu moneda local (opcional).',
    },
  ],
  orderings: [
    {
      title: 'Orden Manual',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
};