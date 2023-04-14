import path from 'path'
import type { PluginOption } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import ElementPlus from 'unplugin-element-plus/vite'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import { visualizer } from 'rollup-plugin-visualizer'

function setupPlugins(env: ImportMetaEnv): PluginOption[] {
  return [
    vue(),
    ElementPlus(),
    viteImagemin({
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
    viteCompression({
      threshold: 600000, // 对大于 600kb 的文件进行压缩
      deleteOriginFile: true,
    }),
    env.VITE_GLOB_APP_PWA === 'true' && VitePWA({
      injectRegister: 'auto',
      manifest: {
        name: 'chatGPT',
        short_name: 'chatGPT',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
    visualizer(),
  ]
}

export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv

  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    plugins: setupPlugins(viteEnv),
    server: {
      host: '0.0.0.0',
      port: 1002,
      open: false,
      proxy: {
        '/api': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('/api/', '/'),
        },
      },
    },
    // build: {
    //   reportCompressedSize: false,
    //   sourcemap: false,
    //   commonjsOptions: {
    //     ignoreTryCatch: false,
    //   },
    // },
    build: {
      assetsDir: 'static',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: env.mode === 'production', // 默认为false
          drop_debugger: env.mode !== 'development', // 默认为true
        },
      },
      // sourcemap: mode !== "production",
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if ((id.includes('vue') && !id.includes('.vue'))
            || id.includes('vue-router'))
              return 'vue'
            if (id.includes('element-plus'))
              return 'element'
            if (id.includes('highlight.js'))
              return 'highlight'

            // 将 node_modules 中的代码单独打包成一个 JS 文件
            if (id.includes('node_modules'))
              return 'vendor'
          },
          // manualChunks(id) {
          //   // 将 node_modules 中的代码单独打包成一个 JS 文件
          //   if (id.includes('node_modules'))
          //   return 'vendor'
          // },
          // manualChunks(id) {
          //   //静态资源分拆打包
          //   if (id.includes("node_modules")) {
          //     return id
          //       .toString()
          //       .split("node_modules/")[1]
          //       .split("/")[0]
          //       .toString();
          //   }
          // },
        },
      },
    },
  }
})
