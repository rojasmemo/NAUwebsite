// /home/guillermo/nau-sanity-studio/sanity.config.js
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'NAU Web Studio',

  projectId: 'b9a3y4ri',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    // Ahora los tipos de esquema se importan desde un único lugar
    types: schemaTypes,
  },
})
