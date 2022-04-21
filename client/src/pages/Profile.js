import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
} from '../spotify';
import { SectionWrapper, ArtistsGrid } from '../components';
import { StyledHeader } from '../styles';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const userTopArtistis = await getTopArtists();
      setTopArtists(userTopArtistis.data);

      console.log(userTopArtistis.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && (
        <StyledHeader type='user'>
          <div className='header__inner'>
            {profile.images.length && profile.images[0].url && (
              <img
                className='header__img'
                src={profile.images[0].url}
                alt='avatar'
              />
            )}

            <div>
              <div className='header__overline'>Perfil</div>
              <h1 className='header__name'>{profile.display_name}</h1>
              <p className='header__meta'>
                {playlists && (
                  <span>
                    {playlists.total} playlist
                    {playlists.total !== 1 ? 's' : ''}
                  </span>
                )}
                <span>
                  {profile.followers.total} Seguidor
                  {profile.followers.total !== 1 ? 'es' : ''}
                </span>
              </p>
            </div>
          </div>
        </StyledHeader>
      )}

      {topArtists && (
        <main>
          <SectionWrapper title='Top artistas do mês' seeAllLink='/top-artists'>
            <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
          </SectionWrapper>
        </main>
      )}
    </>
  );
};

export default Profile;
