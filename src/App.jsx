import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SEO from './components/SEO/SEO';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Lodge from './pages/lodge';
import Episodes from './pages/Episodes';
import Shop from './pages/Shop';
import Games from './pages/Games';
import SubmitStory from './pages/SubmitStory';
import lostCryptid from './assets/images/four-oh-four.png';
import './App.scss';

function App() {
  const { t } = useTranslation();

  return (
    <>
    
    <SEO />

    <div className="app-container">
      <a href="#main-content" className="skip-link">
        {t('app.skip_link')}
      </a>
      
      <Header />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/lodge" element={<Lodge />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/games" element={<Games />} />
          <Route path="/submit" element={<SubmitStory />} />
          <Route path="*" element={
            <div className='four-oh-four'>
              <h1>404 - {t('misctext.lostroute')}</h1>
              <img src={lostCryptid} alt="Lost in the void" className="error-img" />
              <Link to="/" className="home-btn">{t('misctext.return_safety')}</Link>
            </div>
          } />
        </Routes>
      </main>

      <Footer />

    </div>
    
    </>
  );
}

export default App;