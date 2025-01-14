import {
  resolve
} from 'path'
import {
  VitePWA
} from 'vite-plugin-pwa'

export default {
  root: resolve(__dirname, 'src'),
  base: '/todolist',
  build: {
    outDir: '../dist',
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js',   // Mantém o hash nos arquivos JS
        chunkFileNames: '[name].[hash].js',    // Mantém o hash nos chunks de JS
        assetFileNames: '[name].[ext]',
      },
    },
  },
  server: {
    port: 8080
  },
  plugins: [
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        "id": "/todolist/",
        name: 'Todolist por Renan Augusto',
        short_name: 'Todolist',
        description: 'Descrição do Todolist',
        theme_color: '#0D6EFD',
        icons: [{
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        background_color: "#0D6EFD",
        display: "standalone",
        scope: "/",
        shortcuts: [{
            "name": "How's the weather today?",
            "short_name": "hoje",
            "description": "View weather information for today",
            "url": "/todolist/",
            "icons": [{
              "src": "android-chrome-192x192.png",
              "sizes": "192x192"
            }]
          },
          {
            "name": "How's the weather tomorrow?",
            "short_name": "amanha",
            "description": "View weather information for tomorrow",
            "url": "/todolist/",
            "icons": [{
              "src": "android-chrome-192x192.png",
              "sizes": "192x192"
            }]
          }
        ],
        screenshots: [{
            "src": "/images/screenshot1.png",
            "type": "image/png",
            "sizes": "540x720",
            "form_factor": "narrow"
          },
          {
            "src": "/images/screenshot2.jpg",
            "type": "image/jpg",
            "sizes": "720x540",
            "form_factor": "wide"
          }
        ]
      }
    })
  ]
}