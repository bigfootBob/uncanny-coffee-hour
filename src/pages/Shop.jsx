import React from 'react';
import products from '../data/inventory.json';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero/Hero'; 
import SEO from '../components/SEO/SEO';
import './Shop.scss';

const Shop = () => {

  const { t } = useTranslation(['translation', 'inventory']);

  return (
    <>

    <SEO 
      title="Shop Uncanny Coffee Hour" 
      description="Odds and ends from the voices behind the madness."
    />

    <Hero />

    <div id="shop-page" className="page-container">
      <header className="page-header glass-panel">
        <h1>{t("shop.title")}</h1>
        <p>{t("shop.subhead")}</p>
      </header>

      <div className="shop-grid">
        {products.map((item) => (
          <article key={item.id} className="product-card glass-panel">

            <a href={item.link} target="_blank" rel="noopener noreferrer" className="card-image-link">
              <div className="card-image-wrapper">
                <img src={`/assets/images/inventory/${item.image}`} alt={t(`inventory:${item.id}.name`)} />
                <span className="price-tag">{t(`inventory:${item.id}.price`)}</span>
              </div>
            </a>
            
            <div className="card-content">
              <h3>{t(`inventory:${item.id}.name`)}</h3>
              <p>{t(`inventory:${item.id}.desc`)}</p>
 
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="buy-btn"
              >
                {t("shop.details")}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </>
  );
};

export default Shop;