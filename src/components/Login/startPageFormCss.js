import { css } from 'lit';

export const startPageFormCss = css`
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
  }

  .start-section {
    max-width: 30rem;
    margin: 0 auto;
    padding: 2rem;
    margin-top: 2rem;
  }

  app-logo {
    display: block;
    margin-bottom: 20.5rem;
  }

  action-button {
    display: block;
  }
`;
