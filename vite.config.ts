/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    //if you have tests that rely on CSS, turn CSS ON
    //parsing CSS is slow
    css: false,
    exclude: [
      '**/dist/**',
      '**/src/graphql/**',
      '**/node_modules/**',
      '**/src/graphql/**',
    ],
    coverage: {
      exclude: [
        '**/dist/**',
        '**/src/graphql/**',
        '**/node_modules/**',
        '**/src/codegen.ts',
        '**/src/main.tsx',
        '**/*.config.ts',
        '**/*.config.js',
        '**/*.d.ts',
        '**/*.test.tsx',
      ]
    },
  },
})
