export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.FOURTHWALL_STOREFRONT_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Missing storefront token' });
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
      return res.status(upstreamRes.status).json({
        error: 'Failed to fetch products from storefront',
        details: errorText.slice(0, 500),
      });
    }

    const data = await upstreamRes.json();
    const results = Array.isArray(data?.results) ? data.results : [];
    return res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({
      error: 'Unexpected error while loading products',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
