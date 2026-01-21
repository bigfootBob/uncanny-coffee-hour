import React, { useState } from 'react';
import './SubmitStory.scss';
import Hero from '../components/Hero/Hero'; 
import { useTranslation } from 'react-i18next';

const SubmitStory = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ name: '', story: '' });
  const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'
  const [botField, setBotField] = useState(''); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (botField) return;
    if (!formData.story.trim()) {
      alert("Please write a story first.");
      return;
    }

    setStatus('submitting');

    // for local 
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocal) {
      console.log("--- LOCAL DEV MODE ---");
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
    } finally {
      //  console.log("Attempt finished.");
    }
};

  return (
    <>
      <Hero />
      
      <div className="episodes-page">
        <div className="episodes-header glass-panel">
          <h1>Submit Your Paranormal Tale</h1>
          <p>Have you seen the Puca? Did your coffee taste like ectoplasm? Tell us.</p>
        </div>

        <div className="player-wrapper parchment-panel">
          {status === 'success' ? (
            <div className="success-message" style={{ textAlign: 'center' }}>
              <h2>Received.</h2>
              <p>Your tale has been whispered into the void.</p>
              <button 
                className="cta-button" 
                onClick={() => setStatus(null)}
                style={{ marginTop: '2rem' }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form className="story-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>Whispering Well</h2>
                <p>Leave your tale for the void...</p>
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
              
              <label>
                  <span>Your Name (or Alias)</span>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Unknown Traveler"
                    value={formData.name} 
                    onChange={handleChange}
                  />
              </label>
              
              <label>
                  <span>Your Story</span>
                  <textarea 
                    rows="8" 
                    name="story" 
                    placeholder="It was a dark and stormy night..."
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
                {status === 'submitting' ? 'Sending...' : 'Send to the Vault'}
              </button>
              
              {status === 'error' && (
                <p style={{color: '#8b0000', marginTop: '1rem'}}>
                  The spirits rejected your message. Try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default SubmitStory;