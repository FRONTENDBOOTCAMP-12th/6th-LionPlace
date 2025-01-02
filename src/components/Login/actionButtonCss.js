import { css } from 'lit';

export const actionButtonStyles = css`
  button {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    background-color: var(--white);
    border: none;
    border-radius: 6px;
    color: #1a1f2e;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }

  button:focus {
    outline: 0.5px solid #ffa500;
    outline-offset: 0.5px;
  }
`;
