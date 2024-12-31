import { css } from 'lit';

export const loginFormCss = css`
  .login-section {
    max-width: 30rem;
    margin: 0 auto;
    padding: 2rem;
    margin-top: 2rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--white);
  }

  .help-links {
    display: flex;
    justify-content: center;
    padding-right: 2rem;
    padding-left: 2rem;
    gap: 1rem;
  }

  .help-links a {
    text-decoration: none;
  }
`;
