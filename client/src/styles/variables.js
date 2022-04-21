import { css } from 'styled-components/macro';

const variables = css`
  :root {
    --black: #121212;
    --near-black: #181818;
    --dark-gray: #282828;
    --gray: #535353;
    --light-gray: #b3b3b3;
    --white: #ffffff;
    --green: #1db954;

    --font: 'Circular Std', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 24px;

    --spacing-xxs: 4px;
    --spacing-xs: 8px;
    --spacing-sm: 12px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 64px;

    --border-radius-subtle: 4px;
    --border-radius-pills: 30px;

    --site-max-width: 1300px;
  }
`;

export default variables;
