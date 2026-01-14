import React from 'react';
import Transcript from '../Transcript/Transcript'; // Import here
import './EpisodeCard.scss';

const EpisodeCard = ({ episode }) => {
  const headingId = `episode-title-${episode.id}`;

  return (
    <article className="episode-card" aria-labelledby={headingId}>
      {/* ... (image wrapper stays same) ... */}
      <div className="episode-card__image-wrapper">
         <img src={episode.coverArt.src} alt={episode.coverArt.alt} className="episode-card__image" />
      </div>

      <div className="episode-card__content">
        <header>
          {/* ... (header stays same) ... */}
          <span className="episode-card__date">
            <time dateTime={episode.publishDate}>{episode.publishDate}</time>
          </span>
          <h2 id={headingId} className="episode-card__title">
            {episode.title}
          </h2>
          <p className="episode-card__hosts">Hosts: {episode.hosts.join(', ')}</p>
        </header>

        <p className="episode-card__description">{episode.description}</p>

        <div className="episode-card__actions">
          <audio controls className="episode-card__player">
            <source src={episode.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          {/* REPLACED: The old <a href> is gone. 
            ADDED: The new React Component 
          */}
          <Transcript 
            url={episode.transcriptUrl} 
            title={episode.title} 
          />
        </div>
      </div>
    </article>
  );
};

export default EpisodeCard;