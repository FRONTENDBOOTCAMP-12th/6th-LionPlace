import { css } from 'lit';

export const navgationStyles = css`
  .navigation-warp {
    & ul {
      display: flex;
      gap: 1.25rem;
      text-align: center;
      inline-size: 100%;
      padding: 0.5rem;
      background: var(--primary);
      box-sizing: border-box;

      & li {
        flex: 1;

        & button {
          background-color: transparent;
          color: var(--contentTertiary);
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1.125rem;
          inline-size: 100%;
          padding: 0.25rem;
          background-size: 100% 0.1875rem;
          background-repeat: no-repeat;
          background-position: bottom;
          white-space: nowrap;

          &:focus-visible {
            outline: 2px solid var(--white);
            outline-offset: 2px;
          }

          &.is--active {
            color: var(--lightblue--300);
            background-image: linear-gradient(
              to bottom,
              var(--lightblue--300),
              var(--lightblue--300)
            );
            opacity: 1;
          }
        }
      }
    }
  }
`;
