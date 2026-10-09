import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Team.scss';

const Team = ({ limit = null }) => {
  const { t } = useTranslation('bios');
  const { t: tMain } = useTranslation();
  const teamData = t('teamMembers', { returnObjects: true });
  const members = Array.isArray(teamData) ? teamData : [];
  const membersToDisplay = limit ? members.slice(0, limit) : members;
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section className="team-section" aria-labelledby="team-heading">
      <div className="container">
        <h2 id="team-heading" className="sr-only">{tMain('a11y.team')}</h2>
        <ul className="team-grid">
          {membersToDisplay.map((member, index) => (
            <li key={index} className="team-card">
              <Link
                to={`/about#${member.id}`}
                className="team-card-link"
                aria-label={tMain('a11y.read_more_about', { name: member.name })}
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
                        alt=""
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