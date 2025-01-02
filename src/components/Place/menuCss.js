import { css } from 'lit';

export const menuStyles = css`
  .menu-section {
    font-size: 0.75rem;
    background-color: var(--white);

    h2 {
      padding: 0.5rem 1rem;
      border-bottom: 0.5px solid var(--contentTertiary);
      font-size: 1rem;

      .menu-count {
        color: var(--lightblue--400);
      }
    }

    .list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
      gap: 0.5625rem;
      padding: 0.75rem 0.875rem 1rem;
    }

    .image {
      figure img {
        vertical-align: top;
        width: 100%;
      }
    }

    .info {
      border: 0.5px solid var(--contentTertiary);
      padding: 0.5rem 1.375rem 0.375rem 0.625rem;
      line-height: 1.5;

      .name {
        white-space: nowrap;
      }

      .price {
        color: var(--error);
      }
    }

    .more-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      color: var(--contentSecondary);
      background-color: var(--gray--50);
      padding: 0.75rem;

      &::after {
        content: '';
        inline-size: 1.125rem;
        aspect-ratio: 1/1;
        mask: url(/images/ico_arrow_right.svg) center/contain no-repeat;
        background-color: var(--contentSecondary);
      }

      &:focus-visible {
        outline: 2px solid var(--blue--800);
        outline-offset: 1px;
      }
    }
  }
`;
