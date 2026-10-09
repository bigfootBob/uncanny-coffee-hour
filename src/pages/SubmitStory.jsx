import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero/Hero'; 
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO/SEO';
import './SubmitStory.scss';

const SubmitStory = () => {
  const { t } = useTranslation(); 

  const [formData, setFormData] = useState({ name: '', story: '' });
  const [status, setStatus] = useState(null); // 'submitting', 'success', 'error', 'blank', 'too_many'
  const [botField, setBotField] = useState(''); 
  const successHeadingRef = useRef(null);

  // The form is replaced by the success message, so move focus there
  useEffect(() => {
    if (status === 'success') successHeadingRef.current?.focus();
  }, [status]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'blank') setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (botField) return;
    if (!formData.story.trim()) {
      setStatus('blank');
      return;
    }

    setStatus('submitting');

    // for local tests
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocal) {
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', story: '' });
      }, 1000);
      return; 
    }

    try {
      const response = await fetch("/submit.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: formData.name, 
          story: formData.story,
          bot_field: botField 
        })
      });

      if (response.status === 429) {
        setStatus('too_many');
        return;
      }

      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', story: '' });
      } else {
        console.error("Server Error:", data.message);
        setStatus('error');
      }

    } catch (error) {
      console.error("Network Exception:", error);
      setStatus('error');
    }
};

  return (
    <>
      <SEO 
        title="Uncanny Coffee Hour: Submit a story" 
        description="Share a story for Odd Bob and Dr. Kitsune, the voices behind the madness."
      />
      <Hero />
      
      <div id="submit-story-page" className="page-container">
        <div className="page-header glass-panel">
          <h1>{t('storypage.title')}</h1>
          <p>{t('storypage.subhead')}</p>
        </div>

        <div className="parchment-panel">
          {status === 'success' ? (
            <div className="success-message" style={{ textAlign: 'center' }}>
              <h2 ref={successHeadingRef} tabIndex={-1}>{t('storypage.submit_status')}</h2>
              <p>{t('storypage.submit_message')}</p>
              <button 
                className="cta-button" 
                onClick={() => setStatus(null)}
                style={{ marginTop: '2rem' }}
              >
                {t('storypage.btn_another')}
              </button>
            </div>
          ) : (
            <form className="story-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>{t('storypage.whis_well')}</h2>
                <p>{t('storypage.instructions')}</p>
              </div>
              {/* for bots */}
              <div style={{ display: 'none' }}> 
                 <input 
                   name="bot_field" 
                   value={botField}
                   onChange={(e) => setBotField(e.target.value)}
                   tabIndex="-1"
                   autoComplete="off"
                 />
              </div>
              
              <label htmlFor="story-name">
                  <span>{t('storypage.form_name')}</span>
                  <input 
                    id="story-name"
                    type="text" 
                    name="name" 
                    maxLength={100}
                    autoComplete="name"
                    placeholder={t('storypage.form_name_ph')}
                    value={formData.name} 
                    onChange={handleChange}
                  />
              </label>
              
              <label htmlFor="story-text">
                  <span>{t('storypage.form_story')}</span>
                  <textarea 
                    id="story-text"
                    rows="8" 
                    name="story" 
                    maxLength={10000}
                    aria-required="true"
                    aria-invalid={status === 'blank'}
                    aria-describedby={status === 'blank' ? 'story-form-message' : undefined}
                    placeholder={t('storypage.form_ie')}
                    value={formData.story}
                    onChange={handleChange}
                  ></textarea>
              </label>
              
              <button 
                type="submit" 
                className="cta-button"
                disabled={status === 'submitting'}
                style={{ 
                  opacity: status === 'submitting' ? 0.7 : 1,
                  cursor: status === 'submitting' ? 'wait' : 'pointer'
                }}
              >
                {status === 'submitting' ? t('storypage.form_btn_send') : t('storypage.form_btn')}
              </button>
      
              <div role="alert" id="story-form-message">
                {['error', 'blank', 'too_many'].includes(status) && (
                  <p style={{color: '#8b0000', marginTop: '1rem'}}>
                    {status === 'blank' && t('storypage.form_blank')}
                    {status === 'error' && t('storypage.form_error')}
                    {status === 'too_many' && t('storypage.form_too_many')}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default SubmitStory;