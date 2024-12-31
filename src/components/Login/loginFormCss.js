import { css } from 'lit';

export const loginFormCss = css`
  .form-container {
    height: 100vh;
  }

  .login-section {
    max-width: 30rem;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--white);
  }

  .help-links {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    gap: 1rem;
  }

  .help-links a {
    text-decoration: none;
  }
`;
