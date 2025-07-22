export default {
  name: 'encuentro',
  title: 'Encuentro',
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
      description: 'Usa un número para ordenar los encuentros (ej. 1, 2, 3...).',
      validation: (Rule) => Rule.required().integer().positive(),
    },
    {
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      description: 'La imagen principal para el encuentro (obligatoria).',
      options: {
        hotspot: true, // Permite un recorte inteligente de la imagen
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      description: 'Un resumen breve del encuentro (opcional).',
    },
    {
      name: 'body',
      title: 'Contenido Principal',
      type: 'array',
      of: [{type: 'block'}], // Esto habilita el editor de texto enriquecido
      description: 'El contenido detallado del encuentro (obligatorio).',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Precio',
      type: 'number',
      description: 'Precio del encuentro en tu moneda local (opcional).',
    },
    {
      name: 'date',
      title: 'Fecha del Encuentro',
      type: 'datetime',
      description: 'Fecha y hora del encuentro (opcional).',
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