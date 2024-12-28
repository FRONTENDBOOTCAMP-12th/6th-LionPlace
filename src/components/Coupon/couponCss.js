import { css } from 'lit';

export const couponStyle = css`
  .coupon-section {
    .coupon-section__top {
      & > button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-bottom: 0.5px solid var(--contentTertiary);
        inline-size: 100%;

        & > span {
          color: var(--contentPrimary);
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
          white-space: nowrap;
        }
      }

      & > p {
        display: flex;
        align-items: center;
        gap: 0.125rem;
        color: var(--contentSecondary);
        padding: 0.5rem 0.875rem;
        font-size: 0.75019rem;
        line-height: 1.6;

        &::after {
          content: '';
          inline-size: 0.9375rem;
          aspect-ratio: 1/1;
          background: url(/images/ico_question.svg) center/contain no-repeat;
        }
      }
    }

    .coupon-section__center {
      background-color: var(--gray--50);

      & > nav {
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;

        & > ul {
          display: inline-flex;
          gap: 0.25rem;
          overflow: auto;
          padding: 0.75rem 0 0.75rem 1.125rem;
          min-inline-size: 100%;

          & > li {
            &:nth-of-type(1) {
              & > button {
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;

                &::before {
                  content: '';
                  inline-size: 1.125rem;
                  aspect-ratio: 1/1;
                  mask: url(/images/ico_arrow_down.svg) center/contain no-repeat;
                  background-color: var(--contentSecondary);
                }
              }
            }

            & > button {
              flex-shrink: 0;
              text-align: center;
              padding: 0.5rem 0.75rem;
              border-radius: 1rem;
              border: 1px solid var(--gray--100);
              box-sizing: border-box;
              background-color: var(--white);
              color: var(--contentPrimary);
              font-size: 0.75019rem;
              font-weight: 600;
              line-height: 1.6;
              white-space: nowrap;

              &.is--active {
                background-color: var(--contentSecondary);
                border-color: var(--contentSecondary);
                color: var(--white);

                &::before {
                  background-color: var(--white);
                }
              }
            }
          }
        }
      }

      .location {
        color: var(--contentPrimary);
        font-size: 0.75019rem;
        font-weight: 400;
        line-height: 1.6;
        padding: 0.5rem 1rem;
        & > strong {
          font-weight: 600;
        }

        &::after {
          content: '';
          display: inline-block;
          vertical-align: text-top;
          inline-size: 0.9375rem;
          aspect-ratio: 1/1;
          background: url(/images/ico_gps.svg) center/contain no-repeat;
          padding-inline-start: 0.19rem;
        }
      }
    }

    .coupon-section__bottom {
      display: flex;
      overflow-y: auto;
      flex-flow: column wrap;
      gap: 1rem;
      background-color: var(--gray--50);
      min-height: 80vh;
      padding-block-end: 3rem;

      .coupon {
        position: relative;

        .coupon-inner {
          display: grid;
          grid-template-columns: min-content 1fr;
          align-items: center;
          gap: 0.62rem;
          padding: 0.75rem 0.62rem;
          margin-inline: 0.88rem;
          background-color: var(--white);
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);

          .coupon-icon {
            & > img {
              padding: 0.5rem;
              background-color: var(--contentPrimary);
              border-radius: 0.5rem;

              &.is--disabled {
                background-color: var(--contentTertiary);
              }
            }
          }

          .coupon-text {
            display: flex;
            flex-flow: column wrap;
            font-size: 0.75019rem;
            font-weight: 600;
            line-height: 1.5;
            white-space: nowrap;

            & > b {
              color: var(--lightblue--400);

              &.is--disabled {
                color: var(--contentSecondary);
              }
            }
            & > strong {
              color: var(--contentPrimary);

              &.is--disabled {
                color: var(--contentSecondary);
              }
            }
            & > span {
              color: var(--contentTertiary);
              font-weight: 400;
              line-height: 1.6;
            }
          }
        }

        .coupon-btn {
          position: absolute;
          inset-inline-end: 0.88rem;
          inset-block-start: 0;
          padding: 1.35rem 1.125rem;
          border-radius: 0.5rem;
          background: var(--lightblue--100);
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);

          &.is--disabled {
            border-left: 1px dashed var(--gray--100);
            background: var(--gray--50);
            padding: 1.125rem 0.447rem;

            & > span {
              display: flex;
              flex-flow: column wrap;
              justify-content: center;
              align-items: center;
              gap: 0.325rem;
              color: var(--contentTertiary);

              &::before {
                content: '';
                display: block;
                inline-size: 1.25rem;
                aspect-ratio: 1/1;
                mask: url('/images/ico_check.svg') center/contain no-repeat;
                background-color: var(--contentTertiary);
                text-align: center;
              }
            }
          }

          & > span {
            color: var(--lightblue--400);
            font-size: 0.75019rem;
            font-weight: 600;
            line-height: 1.5;
            white-space: nowrap;

            & > span {
              display: block;
            }
          }
        }
      }
    }

    .empty {
      display: flex;
      overflow-y: auto;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      min-height: 80vh;

      & > img {
        inline-size: 8.9375rem;
        block-size: 6.1875rem;
      }

      & > p {
        font-size: 0.75019rem;
      }
    }
  }
`;
