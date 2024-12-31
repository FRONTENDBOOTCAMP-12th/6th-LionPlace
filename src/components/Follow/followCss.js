import { css } from 'lit';

export const followStyles = css`
  .follow-section {
    .follow-section__top {
      & > button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        inline-size: 100%;
        border-bottom: 0.5px solid var(--contentTertiary);
        padding: 0.5rem;

        &:focus-visible {
          outline: 2px solid var(--blue--800);
          outline-offset: 1px;
        }

        & > span {
          color: var(--contentPrimary);
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
          white-space: nowrap;
        }
      }
    }
  }

  .tabs {
    & > ul {
      display: flex;
      gap: 0.75rem;
      border-bottom: 0.5px solid var(--contentTertiary);
      padding: 1rem;

      & > li {
        & > button {
          border-radius: 1rem;
          background-color: var(--gray--100);
          color: var(--contentSecondary);
          font-size: 0.75019rem;
          font-weight: 600;
          padding: 0.5rem 0.75rem;
          transition:
            background-color 0.3s,
            color 0.3s;

          &.is--active {
            background-color: var(--contentPrimary);
            color: var(--white);
          }
        }
      }
    }
  }
`;
