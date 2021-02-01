import { SiteMetadata } from 'constants/site-metadata';
import styled from 'styled-components';

export const Profile = () => (
  <StyledProfile>
    <Image
      src="/images/profile.jpg"
      alt={SiteMetadata.author.name}
      width={48}
      height={48}
    />
    <Description>
      Personal blog by{' '}
      <a
        href={SiteMetadata.author.url}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {SiteMetadata.author.name}
      </a>
      .
      <br />
      {SiteMetadata.author.summary}
    </Description>
  </StyledProfile>
);

const StyledProfile = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 3.5rem;
`;

const Image = styled.img`
  border-radius: 50%;
  height: 3rem;
  margin-right: 1rem;
  width: 3rem;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 0;
`;
