import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { catchErrors } from '../services/utils';
import { getPlaylistById, getAudioFeaturesForTrack } from '../services/spotify';
import { SectionWrapper, TrackList, Loader } from '../components';
import { StyledHeader, StyledDropdown } from '../styles';

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracksData, setTracksData] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [sortValue, setSortValue] = useState('');
  const sortOptions = ['danceability', 'energy', 'valence'];

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);
      setPlaylist(data);
      setTracksData(setTracksData.tracks);
    };

    catchErrors(fetchData);
  }, [id]);

  useEffect(() => {
    if (!tracksData) {
      return;
    }

    const fetchMoreData = async () => {
      if (tracksData.next) {
        const { data } = await axios.get(tracksData.next);
        setTracksData(data);

        setTracks((tracks) => [...(tracks ? tracks : []), ...tracksData.items]);
      } else {
        setTracks(tracksData.items);
      }
    };
    catchErrors(fetchMoreData());

    const fetchAudioFeatures = async () => {
      const ids = tracksData.items.map(({ track }) => track.id).join(',');
      const { data } = await getAudioFeaturesForTrack(ids);
      setAudioFeatures((audioFeatures) => [
        ...(audioFeatures ? audioFeatures : []),
        ...data['audio_features'],
      ]);
    };
    catchErrors(fetchAudioFeatures());
  }, [tracksData]);

  const tracksForTracklist = useMemo(() => {
    if (!tracks || !audioFeatures) {
      return null;
    }

    return tracks.map(({ track }) => {
      const trackToAdd = track;

      if (!track.audio_features) {
        const audioFeaturesObj = audioFeatures.find((item) => {
          if (!item || !track) {
            return null;
          }

          return item.id === track.id;
        });
        trackToAdd['audio_features'] = audioFeaturesObj;
      }

      return trackToAdd;
    });
  }, [tracks, audioFeatures]);

  const sortedTracks = useMemo(() => {
    if (!tracksForTracklist) {
      return null;
    }

    return [...tracksForTracklist].sort((a, b) => {
      const aFeatures = a['audio_features'];
      const bFeatures = b['audio_features'];

      if (!aFeatures || !bFeatures) {
        return false;
      }

      return bFeatures[sortValue] - aFeatures[sortValue];
    });
  }, [sortValue, tracksForTracklist]);

  return (
    <>
      {playlist ? (
        <>
          <StyledHeader>
            <div className='header__inner'>
              {playlist.images.length && playlist.images[0].url && (
                <img
                  className='heaader__img'
                  src={playlist.images[0].url}
                  alt='Playlist cover'
                />
              )}

              <div>
                <div className='header__overline'>Playlist</div>
                <h1 className='header__name'>{playlist.name}</h1>
                <p className='header__meta'>
                  {playlist.followers.total ? (
                    <span>
                      {playlist.followers.total}{' '}
                      {`seguidor${playlist.followers.total !== 1 ? 'es' : ''}`}
                    </span>
                  ) : null}

                  <span>
                    {playlist.tracks.total}{' '}
                    {`Música${playlist.tracks.total !== 1 ? 's' : ''}`}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>

          <main>
            <SectionWrapper title='Playlist' breadcrumb={true}>
              <StyledDropdown active={!!sortValue}>
                <label htmlFor='order-select' className='sr-only'>
                  Ordenar por:
                </label>
                <select
                  name='track-order'
                  id='order-select'
                  onChange={(e) => setSortValue(e.target.value)}
                >
                  <option value=''>Ordenar músicas</option>
                  {sortOptions.map((option, i) => (
                    <option key={i} value={option}>
                      {`${option.chartAt(0).toUpperCase()}${option.slice(1)}`}
                    </option>
                  ))}
                </select>
              </StyledDropdown>
              {sortedTracks && <TrackList tracks={sortedTracks} />}
            </SectionWrapper>
          </main>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Playlist;
