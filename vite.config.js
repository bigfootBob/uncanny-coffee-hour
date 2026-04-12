import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (empty prefix = no filter, so server-side vars like
  // FOURTHWALL_STOREFRONT_TOKEN are included alongside VITE_ client vars)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'fourthwall-api-dev',
        configureServer(server) {
          server.middlewares.use('/api/merch-products', async (req, res) => {
            if (req.method !== 'GET') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            const token = env.FOURTHWALL_STOREFRONT_TOKEN;
            if (!token) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing storefront token' }));
              return;
            }

            const upstreamUrl = new URL('https://storefront-api.fourthwall.com/v1/collections/all/products');
            upstreamUrl.searchParams.set('storefront_token', token);
            upstreamUrl.searchParams.set('page', '0');
            upstreamUrl.searchParams.set('size', '50');

            try {
              const upstreamRes = await fetch(upstreamUrl.toString(), {
                headers: { Accept: 'application/json' },
              });

              if (!upstreamRes.ok) {
                const errorText = await upstreamRes.text();
                res.statusCode = upstreamRes.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to fetch products', details: errorText.slice(0, 500) }));
                return;
              }

              const data = await upstreamRes.json();
              const results = Array.isArray(data?.results) ? data.results : [];
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ results }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Unexpected error', details: err.message }));
            }
          });
        },
      },
    ],
  }
})
