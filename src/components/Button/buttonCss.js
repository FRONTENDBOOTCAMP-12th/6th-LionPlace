import { css } from 'lit';

export const buttonStyles = css`
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    outline: none;
    border: none;
    cursor: pointer;
    font-family: 'Pretendard Variable', Pretendard, sans-serif;

    &.base {
      inline-size: 17.875rem;
      padding: 0.75rem 6.25rem;
    }
    &.black {
      background-color: var(--contentPrimary);
      color: var(--white);
    }
    &.ico1::before {
      content: '';
      inline-size: 1.1875rem;
      block-size: 1.125rem;
      background: url(/images/ico_write.png);
    }
    &.rounded {
      border-radius: 0.5rem;
    }
  }
`;
