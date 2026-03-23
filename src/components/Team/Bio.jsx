import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Bio.scss';

const Bio = ({ member }) => {
  const { t } = useTranslation('bios');

  return (
    <div id={member.id} className="team-bio-section glass-panel">
      <h2>{member.name}</h2>

      <div className="bio-images">
        {(() => {
          let list = [];
          if (Array.isArray(member.images)) {
             list = member.images;
          } else if (typeof member.images === 'string') {
             list = member.images.split(/[\n,]/).map(s => s.trim());
          } else if (typeof member.images === 'object' && member.images !== null) {
             list = Object.values(member.images);
          }
          return list.map((img, i) => (
             <img
              key={i}
              src={`/assets/images/bios/${img}`}
              alt={`${member.name} ${i + 1}`}
              className="bio-image"
              onError={(e) => { e.target.style.display = 'none'; }}
             />
          ));
        })()}
      </div>

      <div className="bio-details">
        <p><strong>{t('labels.about')}:</strong> {member.longBio}</p>
        <p><strong>{t('labels.favoriteCryptid')}:</strong> {member.favoriteCryptid}</p>

        {member.favoriteDrink && (
          <p>
            <strong>{t('labels.favoriteDrink')}:</strong>{' '}
            {member.favoriteDrink.link ? (
              <Link to={member.favoriteDrink.link} className="bio-link">
                {member.favoriteDrink.name}
              </Link>
            ) : (
              member.favoriteDrink.name
            )}
          </p>
        )}

        {member.favoriteEpisode && (
          <p>
            <strong>{t('labels.favoriteEpisode')}:</strong>{' '}
            {member.favoriteEpisode.link ? (
              <Link to={member.favoriteEpisode.link} className="bio-link">
                {member.favoriteEpisode.name}
              </Link>
            ) : (
              member.favoriteEpisode.name
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Bio;
