import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero/Hero';
import SEO from '../components/SEO/SEO';
import './Shop.scss';

const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const formatPrice = (variants) => {
  if (!variants || variants.length === 0) return '';
  try {
    const { value, currency } = variants[0].unitPrice;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
  } catch {
    return '';
  }
};

const Shop = () => {
  const { t } = useTranslation('translation');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/merch-products');
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        setProducts(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        if (import.meta.env.DEV) console.error('Failed to fetch products:', err);
        setError('Could not load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const openProduct = (slug) => {
    const base = import.meta.env.VITE_FOURTHWALL_STOREFRONT_URL;
    if (!base || !slug) return;
    window.open(`${base}/products/${slug}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEO
        title="Shop Uncanny Coffee Hour"
        description="Odds and ends from the voices behind the madness."
      />

      <Hero />

      <div id="shop-page" className="page-container">
        <header className="page-header glass-panel">
          <h1>{t('shop.title')}</h1>
          <p>{t('shop.subhead')}</p>
        </header>

        {loading && <p className="shop-status">Loading products...</p>}
        {error && <p className="shop-status shop-status--error">{error}</p>}

        {!loading && !error && (
          <div className="shop-grid">
            {products.map((product) => {
              const rawImage = product.images?.[0]?.url ?? '';
              const imageUrl = /^https:\/\//i.test(rawImage) ? rawImage : '';
              const price = formatPrice(product.variants);
              const desc = stripHtml(product.description);
              const shortDesc = desc.length > 120 ? `${desc.substring(0, 120)}\u2026` : desc;

              return (
                <article
                  key={product.id}
                  className="product-card glass-panel"
                >
                  <div className="card-image-link">
                    <div className="card-image-wrapper">
                      {imageUrl ? (
                        <img src={imageUrl} alt={product.name} />
                      ) : (
                        <div className="card-image-placeholder" />
                      )}
                      {price && <span className="price-tag">{price}</span>}
                    </div>
                  </div>

                  <div className="card-content">
                    <h3>{product.name}</h3>
                    <p>{shortDesc}</p>
                    <button
                      className="buy-btn"
                      onClick={() => openProduct(product.slug)}
                      aria-label={`${t('shop.details')} – ${product.name}`}
                    >
                      {t('shop.details')}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
