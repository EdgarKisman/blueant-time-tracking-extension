import type { UserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default ({ mode }: { mode: string }): UserConfig => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/services': process.env.VITE_DOMAIN
      }
    }
  })
}
