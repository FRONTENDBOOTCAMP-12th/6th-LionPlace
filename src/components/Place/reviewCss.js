import { css } from 'lit';

export const reviewStyles = css`
  .review-section {
    font-size: 0.75rem;
    background-color: var(--white);

    h2 {
      padding: 0.5rem 1rem;
      border-bottom: 0.5px solid var(--contentTertiary);
      font-size: 1rem;

      .review-count {
        color: var(--lightblue--400);
      }
    }

    button:focus-visible {
      outline: 2px solid var(--blue--800);
      outline-offset: 1px;
    }

    .keyword-preview {
      border-bottom: 0.375rem solid var(--gray--100);

      .keyword-btn {
        width: 100%;

        .keyword-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 14px 12px;

          li {
            position: relative;
            height: 36px;

            .bar {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              background-color: var(--lightblue--400);
              border-radius: 0.5rem;
            }

            .info {
              position: relative;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 7px;
              padding: 0 18px 0 13px;
              font-weight: 600;

              figure {
                display: flex;
                align-items: center;
                gap: 8px;
              }

              .count {
                color: var(--lightblue--400);
              }
            }
          }
        }
      }
    }

    .review-list {
      display: flex;
      flex-direction: column;

      li {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-bottom: 1px solid var(--contentTertiary);
        padding: 0.875rem 1.0625rem;
      }

      .review-content {
        display: flex;
        justify-content: space-between;
        gap: 2.0625rem;
        height: auto;

        .content-text {
          flex: 2;
          font-size: 1rem;
          color: var(--contentSecondary);
          white-space: pre-wrap;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 8;
        }

        .content-image {
          flex: 1;
          width: 100%;
          height: 100%;

          img {
            vertical-align: top;
            width: 100%;
            object-fit: cover;
            aspect-ratio: 1 / 1;
            height: 100%;
          }
        }
      }

      .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .profile-image {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background-color: #f0f0f0;
      }

      .user-details {
        display: flex;
        flex-direction: column;
      }

      .username {
        font-weight: 600;
        font-size: 1rem;
        color: #262626;
        margin-bottom: 0.1875rem;
      }

      .date {
        font-size: 0.75rem;
        color: #737373;
      }
    }

    .image {
      figure img {
        vertical-align: top;
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
