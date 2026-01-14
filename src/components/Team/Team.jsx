import React from 'react';
import bioData from '../../data/bios.json'; // Importing your new JSON file
import './Team.scss';

const Team = () => {
  return (
    <section className="team-section" aria-labelledby="team-heading">
      <div className="container">
        <h2 id="team-heading" className="team-section__title">Meet the Hosts</h2>
        
        <ul className="team-grid">
          {bioData.map((member) => (
            <li key={member.id} className="team-card">
              <div className="team-card__avatar">
                {/* A11y Note: If the image is purely decorative, alt="" is fine.
                   If it conveys info, describe it. Here we assume generic avatars.
                */}
                <div className="avatar-placeholder" aria-hidden="true">
                  {member.name.charAt(0)}
                </div>
              </div>
              
              <div className="team-card__content">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Team;