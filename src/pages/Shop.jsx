import React from 'react';
import './Shop.scss';
import Hero from '../components/Hero/Hero'; 
import { useTranslation } from 'react-i18next';

const Shop = () => {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      
      <div className="episodes-page">
        <div className="episodes-header glass-panel">
          <h1>Welcome to the Emporium</h1>
          <p>Browse Our Curiosities, Oddities & Wares</p>
        </div>

        <div className="player-wrapper glass-panel">
          more amazing items to come:  <a href="https://uncannycoffee.threadless.com/">Threadless Shop</a>
        </div>
      </div>
    </>
  );
};

export default Shop;