import { css } from 'lit';

export const tabStyles = css`
  .tabs {
    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    & nav {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.25rem 5.625rem;
      background-color: var(--gray--50);
    }
  }

  .tab-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.25rem 5.625rem;
    position: relative;

    & > li {
      position: relative;

      & > button {
        display: flex;
        padding: 0.5rem 1.125rem;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        background-color: var(--gray--100);
        color: var(--primary);
        white-space: nowrap;
        position: relative;
        margin-right: -1.12rem;
        z-index: 1;
        font-family: 'Pretendard Variable', Pretendard, sans-serif;

        &:nth-of-type(1) {
          border-radius: 1rem 0 0 1rem;
        }

        &::before {
          content: '';
          display: inline-block;
          inline-size: 1.125rem;
          aspect-ratio: 1/1;
          background-color: var(--primary);
          mask: url(/images/ico_reserved.svg) center/contain no-repeat;
        }

        &.is--active {
          background-color: var(--primary);
          color: var(--white);
          z-index: 2;
          border-radius: 1rem;

          &::before {
            background-color: var(--white);
          }
        }

        &:not([data-tab='tab-reserved']) {
          border-radius: 0 1rem 1rem 0;

          &.is--active {
            border-radius: 1rem;
          }
          &::before {
            mask-image: url(/images/ico_order.svg);
          }
        }
      }
    }
  }

  .tab-contents {
    .tab-content {
      display: none;

      &.is--active {
        display: block;
      }
    }
  }
`;
