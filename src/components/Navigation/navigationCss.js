import { css } from 'lit';

export const navgationStyles = css`
  .navigation-warp {
    & ul {
      display: flex;
      gap: 0.94rem;
      text-align: center;
      inline-size: 100%;
      background: var(--primary);

      & li {
        flex: 1;

        & button {
          background-color: transparent;
          color: var(--lightblue--300);
          opacity: 0.7;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.6;
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
  .loading {
    position: absolute;
    inset-inline-start: 50%;
    inset-block-start: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;

    & img {
      display: flex;
      justify-content: center;
      align-items: center;
      inline-size: 100px;
      aspect-ratio: 1/1;
    }
  }
`;
