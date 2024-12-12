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
          font-family: 'Pretendard Variable', Pretendard, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.6;
          inline-size: 100%;
          padding: 0.25rem;
          background-size: 100% 0.1875rem;
          background-repeat: no-repeat;
          background-position: bottom;
          white-space: nowrap;

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
`;
