import { css } from 'lit';

export const submitButtonCss = css`
  button {
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: var(--white);
    border: none;
    border-radius: 6px;
    color: var(--blue--900);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }

  button[disabled] {
    background-color: var(--gray--50);
    color: var(--gray--500);
    cursor: not-allowed;
  }

  button:focus {
    outline: 0.5px solid #ffa500;
    outline-offset: 0.5px;
  }
`;
