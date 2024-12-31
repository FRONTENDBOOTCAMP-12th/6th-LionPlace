import { css } from 'lit';

export const followerStyles = css`
  .empty-state {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    color: var(--gray--500);
    font-size: 1rem;
    gap: 1rem;
    min-block-size: 100vh;
    background-color: var(--gray--50);
  }
`;
