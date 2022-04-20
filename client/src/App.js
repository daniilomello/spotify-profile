import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import styled from 'styled-components/macro';
import { GlobalStyle } from './styles';

const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 30px;
  display: inline-block;
`;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className='App'>
      <GlobalStyle />
      <header className='App-header'>
        {!token ? (
          <StyledLoginButton
            className='App-link'
            href='http://localhost:8888/login'
            rel='noopener noreferrer'
          >
            Entrar com Spotify
          </StyledLoginButton>
        ) : (
          <Router>
            <ScrollToTop />
            <Switch>
              <Route path='/top-artists'>
                <h1>Top Artistas</h1>
              </Route>
              <Route path='/top-tracks'>
                <h1>Top Tracks</h1>
              </Route>
              <Route path='/playlists/:id'>
                <h1>Playlist</h1>
              </Route>
              <Route path='/playlists'>
                <h1>Playlists</h1>
              </Route>
              <Route path='/'>
                <h1>Entrou</h1>
                <button onClick={logout}>Sair</button>

                {profile && (
                  <>
                    <h1>{profile.display_name}</h1>
                    {profile.images.length && profile.images[0].url && (
                      <img src={profile.images[0].url} alt='avatar' />
                    )}
                    <p>{profile.followers.total} Seguidores</p>
                  </>
                )}
              </Route>
            </Switch>
          </Router>
        )}
      </header>
    </div>
  );
}

export default App;
