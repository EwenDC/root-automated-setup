import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'
import million from 'million/compiler'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Only need this so the HTML is minified since Vite doesn't minify it by default :(
    createHtmlPlugin(),
    million.vite({ auto: true }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]],
      },
    }),
    // Allow importing SVG as react components
    svgrPlugin({
      svgrOptions: {
        prettier: false,
        memo: true,
      },
      esbuildOptions: {
        jsx: 'automatic',
        jsxImportSource: 'react',
      },
    }),
    VitePWA({
      injectRegister: 'inline',
      // Maintain compatibility with the old CRA web worker by having the same output filename
      filename: 'service-worker.js',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,ico,svg}'],
        globIgnores: ['**/node_modules/**/*'],
        runtimeCaching: [
          // Google fonts cache based on https://developer.chrome.com/docs/workbox/modules/workbox-recipes/#google-fonts-cache
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Root Automated Setup',
        short_name: 'Root Auset',
        description: 'Automate the Advanced Setup process for Leder Games popular board game Root',
        theme_color: '#2C2E35',
        background_color: '#FFFFF0',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        launch_handler: {
          client_mode: 'focus-existing',
        },
      },
    }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint .',
        useFlatConfig: true,
      },
    }),
  ],
  base: '/root-automated-setup/',
  server: {
    open: true,
  },
  build: {
    assetsInlineLimit: 0,
    // Since createHtmlPlugin is already using terser may as well use it for the rest of the project too
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        // Only unsafe if you're doing things you shouldn't, which we aren't
        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
      },
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules') && !id.endsWith('.css')) {
            return 'vendor'
          }
          return null
        },
      },
    },
  },
})
