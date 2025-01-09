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
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#A475EF',
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
        background_color: "#3367D6",
        display: "standalone",
        scope: "/",
        shortcuts: [{
            "name": "How's the weather today?",
            "short_name": "Today",
            "description": "View weather information for today",
            "url": "/today?source=pwa",
            "icons": [{
              "src": "/images/today.png",
              "sizes": "192x192"
            }]
          },
          {
            "name": "How's the weather tomorrow?",
            "short_name": "Tomorrow",
            "description": "View weather information for tomorrow",
            "url": "/tomorrow?source=pwa",
            "icons": [{
              "src": "/images/tomorrow.png",
              "sizes": "192x192"
            }]
          }
        ],
        description: "Weather forecast information",
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