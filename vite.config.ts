import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import UnpluginInjectPreload from 'unplugin-inject-preload/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

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
    ViteImageOptimizer({
      png: {
        quality: 80 // 质量（0-100，值越高越清晰，体积越大）
      },
      jpeg: { quality: 80 },
      webp: {
        quality: 80,
        lossless: true
      },
      avif: { quality: 75 }, // AVIF 压缩率比 WebP 更高，但兼容性稍弱
      include: /\.(png|jpe?g|svg)$/i, // 仅处理指定格式
      exclude: /node_modules/ // 排除 node_modules 目录
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
