import { css } from 'lit';

export const followingStyles = css`
  .list {
    display: flex;
    flex-flow: column wrap;
    gap: 1rem;
    padding: 1rem;
    min-block-size: 100vh;
    background-color: var(--gray--50);

    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .profile {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        & > img {
          inline-size: 2.5rem;
          aspect-ratio: 1/1;
          border-radius: 50%;
          background-color: #ddd;
        }
      }
    }
  }

  .username {
    font-size: 1rem;
    font-weight: 600;
  }

  .follow-button {
    background-color: var(--primary);
    color: var(--white);
    border-radius: 1.25rem;
    font-size: 0.75019rem;
    font-weight: 600;
    line-height: 1.5;
    padding: 0.5rem 1rem;
  }
`;
