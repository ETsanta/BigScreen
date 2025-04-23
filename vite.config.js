import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import process from 'process'


function pathResolve(dir) {
  return path.resolve(process.cwd(), '.', dir);
}
// https://vite.dev/config/
export default defineConfig(({ mode, command, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    resolve: {
      alias: {
        // 推荐使用更简洁的配置方式
        '@': path.resolve(__dirname, 'src'),
        // 如果需要二级别名
        '@components': path.resolve(__dirname, 'src/components')
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true
        }
      }
    }
  }
})
