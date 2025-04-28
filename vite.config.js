import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import process from 'process'
import { configHtmlPlugin } from "./lib/html"
import { wrapperEnv } from "./lib/utils"



export default defineConfig(({ mode, command, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);
  const isBuild = command === 'build';
  // const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  return {
    plugins: [react(),
    configHtmlPlugin(viteEnv, isBuild)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components')
      }
    },
    server: {
      port: Number(env.VITE_PORT) || 3888,
      host: '0.0.0.0',
      proxy: {
        '/gm': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gm/, '')
        }
      }
    },
  }
})
