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
        border-radius: 1rem;
        background-color: var(--gray--100);
        color: var(--primary);
        white-space: nowrap;
        position: relative;
        margin-right: -1.12rem;
        z-index: 1;
        font-family: 'Pretendard Variable', Pretendard, sans-serif;

        &::before {
          content: '';
          display: inline-block;
          inline-size: 1.125rem;
          aspect-ratio: 1/1;
          background-color: var(--primary);
          mask: url(/public/images/ico_reserved.svg) center/contain no-repeat;
        }

        &.is--active {
          background-color: var(--primary);
          color: var(--white);
          z-index: 2;

          &::before {
            background-color: var(--white);
          }
        }

        &:not([data-tab='tab-reserved']) {
          &::before {
            mask-image: url(/images/ico_order.svg);
          }
        }
      }
    }
  }

  .tab-contents {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    background-color: var(--lightblue--200);

    .tab-content {
      display: none;

      &.is--active {
        display: block;
      }
    }
  }
`;
