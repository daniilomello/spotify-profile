import { useState, useEffect } from 'react';
import { catchErrors } from '../services/utils';
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from '../services/spotify';
import {
  SectionWrapper,
  ArtistsGrid,
  TrackList,
  PlaylistGrid,
  Loader,
} from '../components';
import { StyledHeader } from '../styles';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);

      const userTopTracks = await getTopTracks();
      setTopTracks(userTopTracks.data);
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

      {topArtists && topTracks && playlists ? (
        <main>
          <SectionWrapper title='Top artistas do mês' seeAllLink='/top-artists'>
            <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
          </SectionWrapper>
          <SectionWrapper title='Top músicas do mês' seeAllLink='/top-tracks'>
            <TrackList tracks={topTracks.items.slice(0, 10)} />
          </SectionWrapper>
          <SectionWrapper title='Playlists' seeAllLink='/playlists'>
            <PlaylistGrid playlists={playlists.items.slice(0, 10)} />
          </SectionWrapper>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
