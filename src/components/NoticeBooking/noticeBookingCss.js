import { css } from 'lit';

export const NoticeBookingStyle = css`
  .back-container {
    & > button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      inline-size: 100%;
      border-bottom: 0.5px solid var(--contentTertiary);
      padding: 0.5rem;

      & > span {
        color: var(--contentPrimary);
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.5;
        white-space: nowrap;
      }
    }
  }

  .notice-container {
    display: flex;
    flex-flow: column wrap;
    gap: 0.5rem;
    background-color: var(--gray--50);
    padding-block-end: 3rem;
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
        width: 2.125rem;
        aspect-ratio: 1/1;
        background-color: var(--lightblue--400);
        border-radius: 5000px;
      }

      .notice-booking__text {
        & > h4 {
          color: var(--contentPrimary);
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
        }

        & > p {
          color: var(--contentSecondary);
          font-size: 0.75019rem;
          font-weight: 400;
          line-height: 1.6;
        }

        & > span {
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
        & > strong {
          font-weight: 600;
        }
      }
    }

    & .notice-booking__button {
      display: flex;

      .favorites {
        & button {
          & > span {
            display: block;
            inline-size: 1.125rem;
            aspect-ratio: 1/1;
            mask-image: url('/images/ico_favorite.svg');
            background-color: var(--gray--900);
          }

          &:focus-visible {
            outline: 1px solid var(--blue--800);
            outline-offset: 1px;
          }
        }

        .is--active {
          mask-image: url('/images/ico_favorite.svg');
          background-color: var(--error);
        }
      }

      .more {
        & > button {
          & > img {
            inline-size: 1.125rem;
            aspect-ratio: 1/1;
          }
          &:focus-visible {
            outline: 1px solid var(--blue--800);
            outline-offset: 1px;
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
      background-color: var(--white);
      border-radius: 0.5rem;
      padding: 0.875rem 0.75rem;

      .reservation-top {
        position: relative;
        & > p {
          color: var(--contentPrimary);
          font-size: 0.75019rem;
          font-weight: 600;
          line-height: 1.5;
          text-decoration-line: underline;
        }
        & > figure {
          & > img {
            position: absolute;
            inset-block-start: 0;
            inset-inline-end: 0;
            inline-size: 3.4375rem;
            aspect-ratio: 1/1;
            border-radius: 50%;
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
        inline-size: 50vw;

        .description {
          overflow: hidden;
          inline-size: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;

          & > span {
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .feedback {
          display: flex;
          flex-flow: column wrap;
          gap: 0.12rem;
        }

        .feedback-info {
          max-inline-size: fit-content;
          background-color: var(--gray--50);
          border-radius: 0.25rem;
          padding: 0.125rem 0.5rem;
        }
      }
    }

    .reservation-bottom {
      background-color: var(--white);
      border-top: 0.5px dashed var(--contentTertiary);
      border-radius: 0.5rem;
      color: var(--contentSecondary);
      font-size: 0.75019rem;
      line-height: 1.5;
      padding: 0.5rem 0.75rem;

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
`;
