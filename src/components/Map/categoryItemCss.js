import { css } from 'lit';

export const mcategoryItemStyles = css`
  .category-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    background-color: var(--white);
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
    flex-shrink: 0;

    &.on {
      background-color: var(--primary);
      color: white;
    }

    &:focus-visible {
      outline: 2px solid var(--blue--800);
      outline-offset: 1px;
    }
  }
`;
