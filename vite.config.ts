import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import UnocssIcons from '@unocss/preset-icons'
import presetAttributify from '@unocss/preset-attributify'
import { presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      // 但 `presets` 被指定时，默认的预设将会被禁用，
      // 因此你可以在你原有的 App 上使用纯 CSS 图标而不需要担心 CSS 冲突的问题。
      presets: [
        presetAttributify(),
        UnocssIcons(),
        presetUno() // - 取消注释以启用默认的预设
      ],
    }),
  ]
})
