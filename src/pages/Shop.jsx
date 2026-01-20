import React from 'react';
import './About.scss';
import Hero from '../components/Hero/Hero'; 

const About = () => {
  return (
    <>
    <Hero />
      
    <div className="container page-content">
      <h1>Submit Your Paranormal Tale</h1>
      <p>Have you seen the Puca? Did your coffee taste like ectoplasm? Tell us.</p>
      
      <form className="story-form">
         <label>
            Your Name (or Alias)
            <input type="text" name="name" />
         </label>
         <label>
            Your Story
            <textarea rows="8" name="story"></textarea>
         </label>
         <button type="submit" className="cta-button">Send to the Vault</button>
      </form>
    </div>
    </>
  );
};

export default About;