import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero/Hero';
import Team from '../components/Team/Team';
import Bio from '../components/Team/Bio';
import FriendData from '../data/friends.json';
import SEO from '../components/SEO/SEO';
import './About.scss';

import aboutPicDesktop from '../assets/images/about-toon-desktop.webp';
import aboutPicMobile from '../assets/images/about-toon-mobile.webp';

const About = () => {
  const { t } = useTranslation('translation');
  const { t: tBios } = useTranslation('bios');
  const location = useLocation();
  const aboutText = t('aboutpage.about_text', { returnObjects: true });
  const safeAboutText = Array.isArray(aboutText) ? aboutText : [];
  
  const teamData = tBios('teamMembers', { returnObjects: true });
  const members = Array.isArray(teamData) ? teamData : [];

  useEffect(() => {
    const targetId = location.state?.selectedSection || location.hash?.replace('#', '');
    if (targetId) {
      // Adding a small timeout ensures the Bio cards have finished rendering in the DOM
      setTimeout(() => {
        const element = document.getElementById(targetId);

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.warn(`Attempted to scroll to ID "${targetId}" but it was not found.`);
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <SEO
        title="About the Hosts"
        description="Meet Odd Bob and Dr. Kitsune, the voices behind the madness."
      />

      <div id="about-page" className="page-container">
        <Hero />

        <section className="page-header glass-panel">
          <h1>{t('app.title')}</h1>
          <p>{t('aboutpage.subhead')}</p>
        </section>

        <section id="aboutus" className="about-text glass-panel">
          <h2>{t('aboutpage.about')}</h2>

          {safeAboutText.map((paragraph, i) => (
            <p key={i} className="about-paragraph">
              {paragraph}
            </p>
          ))}
        </section>

        <section id="friends" className="about-text glass-panel">
          <h2>{t('aboutpage.friendo_title')}</h2>
          <p>
            {t('aboutpage.friendo_desc')}
          </p>

          <div className="friends-grid">

            {FriendData.map((friend, index) => (
              <a
                key={friend.id || index}
                href={friend.link}
                target="_blank"
                rel="noopener noreferrer"
                className="friend-card"
              >
                <div className="friend-info">
                  <h3>{friend.name}</h3>
                  {friend.desc && <p>{friend.desc}</p>}
                </div>

                <div className="friend-icon">
                  {friend.icon ? (
                    <img src={`/assets/images/icons/${friend.icon}`} alt="" />
                  ) : (
                    <span className="generic-arrow">➔</span>
                  )}
                </div>
              </a>
            ))}

          </div>
        </section>

        <section id="whatisit" className="about-text glass-panel">
          <h2>{t('aboutpage.what_podcast')}</h2>
          <p>
            {t('aboutpage.what_podtext')}
          </p>
        </section>

        <section className="team-section-wrapper">
          <Team limit={3} />
        </section>

        <section id="bios-section" className="full-bios container" style={{ marginTop: '4rem' }}>
          {members.slice(0, 3).map((member) => (
            <Bio key={member.id} member={member} />
          ))}
        </section>

        <section className="outro-toon">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={aboutPicMobile}
              type="image/webp"
            />
            <source
              srcSet={aboutPicDesktop}
              type="image/webp"
            />
            <img
              src={aboutPicDesktop}
              alt="Cartoon team portrait"
              className="about-image"
              loading="eager"
            />
          </picture>
        </section>

      </div>
    </>
  );
};

export default About;