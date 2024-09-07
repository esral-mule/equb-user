import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType:'prompt',
  includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest:{
    name:"Equb Member",
    short_name:"Equb Member",
    description:"make your life easy with Equb",
    icons:[{
      src: '/icons/android/android-launchericon-48-48.png',
      sizes:'48x48',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src: '/icons/android/android-launchericon-72-72.png',
      sizes:'72x72',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src: '/icons/android/android-launchericon-96-96.png',
      sizes:'96x96',
      type:'image/png',
      purpose:'apple touch icon',
    },
    {
      src: '/icons/android/android-launchericon-144-144.png',
      sizes:'144x144',
      type:'image/png',
      purpose:'any maskable',
    }
  ],
  theme_color:'#171717',
  background_color:'#f0e7db',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}

export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugIn)],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
})