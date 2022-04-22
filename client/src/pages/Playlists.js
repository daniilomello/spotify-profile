import { useState, useEffect } from 'react';
import axios from 'axios';
import { catchErrors } from '../utils';
import { getCurrentUserPlaylists } from '../spotify';
import { SectionWrapper, PlaylistGrid } from '../components';

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylistsData(userPlaylists.data);
    };

    catchErrors(fetchData());
  }, []);

  useEffect(() => {
    if (playlistsData === null) {
      return;
    }

    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);

        setPlaylists((playlists) => {
          return [...(playlists ? playlists : []), ...playlistsData.items];
        });
      } else {
        setPlaylists([...playlistsData.items]);
      }
    };

    catchErrors(fetchMoreData());
  }, [playlistsData]);

  return (
    <main>
      {playlists && (
        <main>
          <SectionWrapper title='Playlists' breadcrumb='true'>
            <PlaylistGrid playlists={playlists} />
          </SectionWrapper>
        </main>
      )}
    </main>
  );
};

export default Playlists;
