import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // import.meta.dirname = dossier de ce fichier (la racine du projet)
  const env = loadEnv(mode, import.meta.dirname, '')

  const proxy = {
    '/api/groq': {
      target: 'https://api.groq.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/groq/, '/openai/v1'),
      headers: { Authorization: `Bearer ${env.GROQ_API_KEY}` },
    },
    '/api/openrouter': {
      target: 'https://openrouter.ai',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/openrouter/, '/api/v1'),
      headers: { Authorization: `Bearer ${env.OPENROUTER_API_KEY}` },
    },
  }

  return {
    plugins: [react(), tailwindcss()],
    server: { proxy },
    preview: { proxy },
  }
})