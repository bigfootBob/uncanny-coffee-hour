import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Team.scss';

const Team = ({ limit = null }) => {
  const { t } = useTranslation('bios'); 
  const teamData = t('teamMembers', { returnObjects: true });
  const members = Array.isArray(teamData) ? teamData : [];
  const membersToDisplay = limit ? members.slice(0, limit) : members;
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => { // show letter on fail
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section className="team-section" aria-labelledby="team-heading">
      <div className="container">
        <ul className="team-grid">
          {membersToDisplay.map((member, index) => (
            <li key={index} className="team-card">
              <Link 
                to={`/about#${member.id}`} 
                className="team-card-link"
                aria-label={`Read more about ${member.name}`}
              >
                <div className="team-card__avatar">

                  {imageErrors[index] ? (
                    <div className="avatar-placeholder" aria-hidden="true">
                      {member.name.charAt(0)}
                    </div>
                  ) : (
                    <div className="avatar-img">
                      <img 
                        src={`/assets/images/bios/${member.avatar}`}
                        alt={member.name} 
                        className="avatar-img-element"
                        onError={() => handleImageError(index)}
                      />
                    </div>
                  )}
                </div>
                
                <div className="team-card__content">
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="team-card__role">{member.role}</p>
                  <p className="team-card__bio">{member.bio}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Team;