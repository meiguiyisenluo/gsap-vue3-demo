import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import UnpluginInjectPreload from 'unplugin-inject-preload/vite'
import viteImagemin from 'vite-plugin-imagemin'

import path from 'node:path'

const preloadPrefix = 'preload-'
/**
 * 判断某个文件是否在指定目录中
 * @param filePath assetInfo.originalFileName，例如 'src/views/HomeView/assets/img/05.png'
 * @param targetDir 目标目录，例如 'src/views/HomeView/assets/img'
 */
const isInDirectory = (filePath: string, targetDir: string): boolean => {
  const absoluteFile = path.resolve(filePath)
  const absoluteDir = path.resolve(targetDir)
  const relative = path.relative(absoluteDir, absoluteFile)
  return !relative.startsWith('..') && !path.isAbsolute(relative)
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteImagemin({
      disable: false,
      verbose: true,
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    UnpluginInjectPreload({
      files: [
        {
          outputMatch: new RegExp(`^${preloadPrefix}`),
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let target = 'assets/[name]-[hash][extname]'
          if (isInDirectory(assetInfo.originalFileNames[0] ?? '', 'src/views/HomeView/assets/img')) {
            target = preloadPrefix + target
          }
          return target
        }
      }
    }
  }
})
