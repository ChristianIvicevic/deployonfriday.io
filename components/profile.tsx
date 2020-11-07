import { SiteMetadata } from 'constants/site-metadata';

export const Profile = () => (
  <div className="profile">
    <img
      src="/images/profile.png"
      alt={SiteMetadata.author.name}
      className="profile__image"
    />
    <p className="profile__description">
      Personal blog by{' '}
      <a
        href={SiteMetadata.author.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {SiteMetadata.author.name}
      </a>
      .
      <br />
      {SiteMetadata.author.summary}
    </p>
  </div>
);
