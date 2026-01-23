import React from 'react';
import './Shop.scss';
import products from '../data/inventory.json';

const Shop = () => {
  return (
    <div className="shop-page">
      <header className="shop-header">
        <h1>Provisions for the Body, Curios for the Mind</h1>
        <p>Support the podcast. Essential Wares & Uncommon Finds.</p>
      </header>

      <div className="shop-grid">
        {products.map((item) => (
          <article key={item.id} className="product-card">

            <a href={item.link} target="_blank" rel="noopener noreferrer" className="card-image-link">
              <div className="card-image-wrapper">
                <img src={`/assets/images/inventory/${item.image}`} alt={item.name} />
                <span className="price-tag">{item.price}</span>
              </div>
            </a>
            
            <div className="card-content">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
 
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="buy-btn"
              >
                {/* Buy {item.vendor} &rarr; */}
                More Details
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Shop;