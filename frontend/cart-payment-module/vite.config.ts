// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'cartModule',
      filename: 'remoteEntry.js',
      exposes: {
        './Cart': './src/Cart.tsx',
        './Payment': './src/Payment.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 5174,
  },
  build: {
    target: 'esnext',
  },
})