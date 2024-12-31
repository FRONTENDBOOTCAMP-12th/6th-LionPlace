import { css } from 'lit';

export const placeInfoStyles = css`
  .place-info {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    text-align: left;
    font-size: 12px;
    color: var(--contentTertiary);

    li {
      align-self: stretch;
      background-color: #fff;
      border-bottom: 0.5px solid #a6a6a6;
      display: flex;
      align-items: center;
      padding: 8px 0 8px 14px;
      gap: 4px;
      line-height: 160%;

      button {
        color: var(--lightblue--400);
        font-size: 0.75rem;
      }

      .loacation-more-btn {
        display: flex;

        &::before {
          content: '';
          inline-size: 0.9375rem;
          aspect-ratio: 1/1;
          background: url(/images/ico_arrow.svg) center/contain no-repeat;
        }
      }

      .phone-copy-btn {
        display: flex;

        &::before {
          content: '';
          inline-size: 0.9375rem;
          aspect-ratio: 1/1;
          background: url(/images/ico_copy.svg) center/contain no-repeat;
        }
      }

      .call {
        color: var(--contentPrimary);
      }
    }
  }
`;
