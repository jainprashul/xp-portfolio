import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";

/**
 * Vite does not run Vercel serverless functions. Without this middleware,
 * /api/visitor-analytics serves api/visitor-analytics.js as raw JS and the
 * client JSON parse fails.
 */
function visitorAnalyticsDevPlugin(): Plugin {
  return {
    name: 'visitor-analytics-dev',
    configureServer(server) {
      server.middlewares.use('/api/visitor-analytics', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            ip: '127.0.0.1',
            country: 'DEV',
            country_name: 'Local Development',
            city: 'localhost',
            region: 'dev',
            timestamp: new Date().toISOString(),
          })
        );
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visitorAnalyticsDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@components": path.resolve(__dirname, './src/components'),
      "@assets": path.resolve(__dirname, './src/assets'),
    }
  }
})
