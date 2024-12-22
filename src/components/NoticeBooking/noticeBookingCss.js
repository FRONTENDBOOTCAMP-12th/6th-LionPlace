import { css } from 'lit';

export const NoticeBookingStyle = css`
  .notice-container {
    display: flex;
    flex-flow: column wrap;
    gap: 0.5rem;
    background-color: var(--gray--50);
    padding-block-end: 1rem;
  }

  /* notice-booking */
  .notice-booking {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    .notice-booking__info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      & > figure {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--lightblue--400);
        border-radius: 5000px;
        width: 2.125rem;
        aspect-ratio: 1/1;

        img {
          background-color: var(--lightblue--400);
        }
      }

      .notice-booking__text {
        & h4 {
          color: var(--contentPrimary);
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
        }

        & p {
          color: var(--contentSecondary);
          font-size: 0.75019rem;
          font-weight: 400;
          line-height: 1.6;
        }

        & span {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          &::after {
            content: '';
            display: inline-flex;
            inline-size: 1px;
            block-size: 0.7813rem;
            background-color: var(--contentSecondary);
          }
        }
        & strong {
          font-weight: 600;
        }
      }
    }

    & .notice-booking__button {
      display: flex;

      .favorites {
        & button {
          & > div {
            inline-size: 1.125rem;
            aspect-ratio: 1/1;
            mask-image: url('/public/images/ico_favorite.svg');
            background-color: var(--gray--900);
          }
        }

        & .is--active {
          mask-image: url('/public/images/ico_favorite.svg');
          background-color: var(--error);
        }
      }
      & .more {
        & button {
          img {
            inline-size: 1.125rem;
            aspect-ratio: 1/1;
          }
        }
      }
    }
  }

  /* reservation-card */
  .reservation-card {
    margin: 0 1rem;

    .reservation-details {
      display: flex;
      flex-flow: column wrap;
      gap: 0.75rem;
      padding: 0.875rem 0.75rem;
      background-color: var(--white);
      border-radius: 0.5rem;

      .reservation-header {
        position: relative;
        & h2 {
          color: var(--contentPrimary);
          font-size: 0.75019rem;
          font-weight: 600;
          line-height: 1.5;
          text-decoration-line: underline;
        }
        & figure {
          & img {
            position: absolute;
            inset-block-start: 0;
            inset-inline-end: 0;
          }
        }
      }

      .review {
        display: flex;
        flex-flow: column wrap;
        gap: 0.25rem;
        color: var(--contentSecondary);
        font-size: 0.75019rem;
        line-height: 1.6;
        width: 11rem;

        .description {
          overflow: hidden;
          inline-size: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .feedback {
          display: flex;
          flex-flow: column wrap;
          gap: 0.12rem;
        }

        .feedback-info {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.125rem 0.5rem;
          background-color: var(--gray--50);
          border-radius: 0.25rem;
          max-inline-size: fit-content;
        }

        .feedback-btn {
          color: var(--contentSecondary);
        }
      }
    }

    .reservation-footer {
      background-color: var(--white);
      border-top: 0.5px dashed var(--contentTertiary);
      border-radius: 0.5rem;
      padding: 0.5rem 0.75rem;
      color: var(--contentSecondary);
      font-size: 0.75019rem;
      line-height: 1.5;

      .staff-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .manager {
          color: var(--contentPrimary);
          font-weight: 600;
        }
      }
    }
  }

  .menu {
    position: absolute;
    inset-inline-end: 0.9375rem;
    inset-block-start: 2.8125rem;
    inline-size: 5rem;
    border: 1px solid var(--gray--100);
    box-sizing: border-box;
    border-radius: 1.125rem;

    & button {
      inline-size: 100%;
      text-align: left;
      padding: 0.5625rem;
    }
  }

  .not-reserved {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    padding: 5rem;
  }
`;
