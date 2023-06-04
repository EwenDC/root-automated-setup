import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import noEmit from "rollup-plugin-no-emit";
import legacy from "@vitejs/plugin-legacy";
import { VitePWA } from "vite-plugin-pwa";

const staticAssetCacheSettings = {
  cacheableResponse: {
    statuses: [0, 200],
  },
  expiration: {
    maxAgeSeconds: 60 * 60 * 24 * 365,
    maxEntries: 30,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Allow importing SVG as react components
    svgrPlugin({
      svgrOptions: {
        memo: true,
      },
    }),
    // Exclude most SVG files from the output since we just use them to generate react components
    // (mask-icon.svg is the exception as it's used for the safari mask image)
    noEmit({
      match: (file) => /.svg$/.test(file) && !/mask-icon/.test(file),
    }),
    splitVendorChunkPlugin(),
    legacy({
      targets: [">0.2%", "not dead", "not op_mini all"],
    }),
    VitePWA({
      injectRegister: "inline",
      // Must maintain compatibility with the existing CRA web worker by having the same output filename
      filename: "service-worker.js",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,ico,svg}"],
        // Don't automatically precache the legacy bundles, as only a small amount of web-worker enabled browsers can't handle ESM
        globIgnores: ["**/node_modules/**/*", "**/*-legacy-*.js"],
        runtimeCaching: [
          // Google fonts cache based on https://developer.chrome.com/docs/workbox/modules/workbox-recipes/#google-fonts-cache
          {
            urlPattern: ({ url }) => url.origin === "https://fonts.googleapis.com",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: ({ url }) => url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              ...staticAssetCacheSettings,
            },
          },
          // Cache any JS we need that wasn't precached. This is specifically for those legacy bundles we excluded from precaching
          {
            urlPattern: /\/assets\/.+\.js$/,
            handler: "CacheFirst",
            options: {
              cacheName: "legacy-js",
              ...staticAssetCacheSettings,
            },
          },
        ],
      },
      manifest: {
        name: "Root Automated Setup",
        short_name: "Root Auset",
        description: "Automate the Advanced Setup process for Leder Games popular board game Root",
        theme_color: "#2C2E35",
        background_color: "#FFFFF0",
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  base: "/root-automated-setup/",
  server: {
    open: true,
  },
  build: {
    assetsInlineLimit: 0,
    sourcemap: true,
  },
});
