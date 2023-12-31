import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    manifest:{
      name: 'Elsa P. Pelaez Memorial Library App',
        short_name: 'EPPML App',
      icons:[
        {
          src:"/static/images/appIcon.png",
          sizes:"512x512",
          type:"image/png",
          
        }
      ]
    }
  })],
})
