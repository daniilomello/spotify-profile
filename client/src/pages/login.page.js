import styled from 'styled-components';

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  p {
    margin-bottom: var(--spacing-lg);
  }
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pills);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);
  cursor: pointer;
  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://danlittle-spotify.herokuapp.com/login';

const Login = () => {
  return (
    <StyledLoginContainer>
      <p>
        Entre contato com o desenvolvedor para testar.
        <br /> App liberador para um numero limitado de pessoas.
      </p>
      <StyledLoginButton href={LOGIN_URI}>Entrar com Spotify</StyledLoginButton>
    </StyledLoginContainer>
  );
};

export default Login;
