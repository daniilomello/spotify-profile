import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import { GlobalStyle } from './styles';
import { Login } from './pages';

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
          <Login />
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
