import { Link } from 'react-router-dom';
import './Bio.scss';

const Bio = ({ member }) => {
  return (
    <div id={member.id} className="team-bio-section glass-panel">
      <h2>{member.name}</h2>

      <div className="bio-images">
        {member.images?.map((img, i) => (
          <img
            key={i}
            src={`/assets/images/bios/${img}`}
            alt={`${member.name} ${i + 1}`}
            className="bio-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ))}
      </div>

      <div className="bio-details">
        <p><strong>About:</strong> {member.longBio}</p>
        <p><strong>Favorite Cryptid:</strong> {member.favoriteCryptid}</p>

        {member.favoriteDrink && (
          <p>
            <strong>Favorite Drink:</strong>{' '}
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
            <strong>Favorite Episode:</strong>{' '}
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
