import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import flower from './src/sanity/schemas/flower'

export default defineConfig({
  name: 'default',
  title: 'Jolily Blooms',
  projectId: 'vtcb5edz',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [flower],
  },
})
