/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssPresetEnv from 'postcss-preset-env'

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
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  resolve: {
    alias: Object.fromEntries(FOLDERS.map((folder) => [folder, `/src/${folder}`])),
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 3,
          features: {
            'nesting-rules': true,
          },
        }),
      ],
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
