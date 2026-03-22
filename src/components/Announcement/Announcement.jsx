import './Announcement.scss';

const Announcement = ({ message, linkText, linkUrl, icon }) => {
  return (
    <div className="announcement-banner">
      <div className="announcement-content">
        {icon && <span className="announcement-icon">{icon}</span>}
        <p className="announcement-text">{message}</p>
        <a 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="announcement-link"
        >
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default Announcement;