import { css } from 'lit';

export const headerStyles = css`
  header {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.875rem;

    .title,
    .place-name {
      flex: 1;
      font-size: 1rem;
    }

    .close-btn,
    .back-btn {
      padding: 0 !important;
      width: auto !important;
    }
  }
`;
