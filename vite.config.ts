import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { join } from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const contentDir = join(__dirname, 'src', 'content');

  return {
    plugins: [
      react(),
      {
        name: 'tsx-files',
        async resolveId(id) {
          if (id.startsWith('/src/content/')) {
            return id;
          }
        },
        async load(id) {
          if (id.startsWith('/src/content/')) {
            try {
              const filePath = join(contentDir, id.replace('/src/content/', ''));
              const text = fs.readFileSync(filePath, 'utf-8');
              return {
                code: text,
                map: null
              };
            } catch (err) {
              console.error(`Error loading ${id}:`, err);
              throw err;
            }
          }
        }
      }
    ],
    base: env.VITE_BASE_URL || '/',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsDir: 'assets',
      sourcemap: true,
      rollupOptions: {
        input: {
          main: join(__dirname, 'index.html')
        }
      },
      assetsInclude: ['src/content/note/**/*.md']
    },
    server: {
      port: 4000,
      open: true,
      fs: {
        allow: ['..']
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
