import { StyledGrid } from '../styles';

const ArtistsGrid = ({ artists }) => {
  return (
    <>
      {artists && artists.length ? (
        <StyledGrid type='artist'>
          {artists.map((artist, i) => (
            <li className='grid__item' key={i}>
              <div className='grid__item__inner'>
                {artist.images[0] && (
                  <div className='grid__item__image'>
                    <img src={artist.images[0].url} alt={artist.name} />
                  </div>
                )}
                <h3 className='grid__item__name'>{artist.name}</h3>
                <p className='grid__item__label'>Artista</p>
              </div>
            </li>
          ))}
        </StyledGrid>
      ) : (
        <p className='empty-notice'>Nenhum artista encontrado</p>
      )}
    </>
  );
};

export default ArtistsGrid;
