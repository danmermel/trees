// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   devtools: { enabled: true }
// })


// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   modules: [],
//   ssr: false,
//   // runtimeConfig: {
//   //   public: {
//   //     apiBase: 'https://tv.glynnbird.com'
//   //   }
//   // },
//   css: [
//     'vuetify/lib/styles/main.sass',
//     '@mdi/font/css/materialdesignicons.min.css'
//   ],
//   build: {
//     transpile: ['vuetify'],
//   },
//   vite: {
//     define: {
//       'process.env.DEBUG': false,
//     }
//   }
// })


import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  experimental: {
    payloadExtraction: false
  },
  modules: [
    '@vite-pwa/nuxt'
  ],
  pwa: {
    strategies: 'generateSW',
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    manifest: {
      name: "Trees",
      short_name: "Trees",
      theme_color: '#8a8a5e',
      description: "A website of trees",
      icons: [
        {
          src: 'tree.png',
          sizes: "500x500",
          type: "image/png"
        },
      ]


    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']

    },
    devOptions: {
      enabled: true,
      type: "module"
    }
  },

  css: [
    'vuetify/lib/styles/main.sass',
    "@mdi/font/css/materialdesignicons.css",
  ],

  build: {
    transpile: ['vuetify']
  },

  compatibilityDate: '2024-08-16',
  ssr: false
});