import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (dev, prod, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // 1. Plugins: React support is added here
    plugins: [react()],

    // 2. Resolve: Configure path aliases (e.g., use '@' instead of '../../src')
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    // 3. Server: Development environment settings
    server: {
      port: 5173,      // Default port
      strictPort: false, // Automatically tries next port (5174) if 5173 is busy
      open: true,      // Automatically opens the browser on start
      host: true,      // Exposes the server to your local network (LAN)
      
      // Proxy settings (useful for avoiding CORS during development)
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // 4. Build: Production output settings
    build: {
      outDir: 'dist',       // Destination for build files
      sourcemap: true,      // Useful for debugging production issues
      emptyOutDir: true,    // Clears the output folder before each build
      rollupOptions: {
        output: {
          // Manual chunking helps with better caching and smaller bundles
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
  };
});
