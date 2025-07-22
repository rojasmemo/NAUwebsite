// schemas/paginaContacto.js
export default {
  name: 'paginaContacto',
  title: 'Página de Contacto',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título SEO',
      type: 'string',
      description: 'El título que aparece en la pestaña del navegador.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descripción SEO',
      type: 'text',
      description: 'La meta descripción para los motores de búsqueda.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heading',
      title: 'Encabezado Principal',
      type: 'string',
      description: 'El título principal que se muestra en la página (ej. "Contáctanos").',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title', // 1. Selecciona el campo 'title' del documento
    },
    // 2. Usa el campo seleccionado para construir la vista previa
    prepare({title}) {
      return {title: title || 'Página de Contacto (sin título)'}
    },
  },
}