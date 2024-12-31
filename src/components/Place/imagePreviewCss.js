import { css } from 'lit';

export const imagePreviewStyles = css`
  .image-preview {
    font-size: 0.75rem;
    background-color: var(--white);

    h2 {
      padding: 0.5rem 1rem;
      border-bottom: 0.5px solid var(--contentTertiary);
    }

    .list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      justify-content: center;
      gap: 0.0625rem;
      padding: 0.75rem 0.875rem 1rem;
    }

    .image {
      figure img {
        width: 100%;
        object-fit: cover;
        aspect-ratio: 1 / 1;
        height: 100%;
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
    }
  }
`;
