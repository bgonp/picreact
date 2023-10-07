import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const FOLDERS = [
  'components',
  'constants',
  'contexts',
  'hooks',
  'models',
  'pages',
  'router',
  'styles',
  'utils',
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: Object.fromEntries(FOLDERS.map((folder) => [folder, `/src/${folder}`])),
  },
})
