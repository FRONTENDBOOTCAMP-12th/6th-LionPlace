import { css } from 'lit';

export const formInputCss = css`
  .form-group {
    max-width: 30rem;
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: var(--white);
  }

  .form-group input {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
    border: 1px solid white;
    border-radius: 6px;
    background-color: transparent;
    color: var(--white);
    font-size: 1rem;
  }

  .form-group input::placeholder {
    color: var(--white);
  }

  .form-group .error {
    display: block;
    color: var(--error);
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  .form-group input:focus {
    outline: 0.5px solid #ffa500;
  }
`;
