import { css } from 'lit';

export const orderStyles = css`
  .order-section {
    .order-section__inner {
      padding: 0.75rem;
      background-color: var(--gray--200);
    }

    .order {
      display: flex;
      flex-flow: column wrap;

      & > h3 {
        color: var(--contentPrimary);
        text-align: center;
        font-size: 0.75019rem;
        font-weight: 600;
        line-height: 1.5;

        & > strong {
          font-size: 1rem;
        }
      }

      .order-list {
        border-radius: 1rem 1rem 0 0;
        box-sizing: border-box;
        background: var(--white);
        margin-block-start: 0.75rem;
        border-collapse: separate;

        /* td 공통 */
        & td {
          border: 0.5px solid var(--contentTertiary);

          & > a {
            display: block;
            color: var(--contentPrimary);
            text-align: center;
            padding: 0.5rem;
            font-size: 0.75019rem;
            font-weight: 600;
            line-height: 1.5;
            white-space: nowrap;
          }
        }

        /* thead */
        & thead {
          & > tr {
            & > td {
              &:nth-of-type(1) {
                border-top-left-radius: 1rem;
                border-right: 0;
              }
              &:nth-of-type(2) {
                border-right: 0;
              }
              &:nth-of-type(3) {
                border-top-right-radius: 1rem;
              }
            }
          }
        }

        /* tbody */
        & tbody {
          & tr {
            &:nth-of-type(1),
            &:nth-of-type(2),
            &:nth-of-type(3) {
              & td {
                border-top: 0;
                border-right: 0;

                &:nth-of-type(3n) {
                  border-right: 0.5px solid var(--contentTertiary);
                }
              }
            }
            &:nth-of-type(3) {
              & td {
                border-bottom: 0;
              }
            }
          }
        }
      }
    }

    .event {
      overflow: hidden;
      position: relative;
      border: 0.5px solid var(--contentTertiary);
      border-top: 0;
      border-radius: 0rem 0rem 1rem 1rem;
      background: linear-gradient(90deg, #8db0f9 0%, rgba(141, 176, 249, 0) 72.63%);
      box-sizing: border-box;

      .event-link {
        display: block;
        padding: 0.625rem 1rem 0;
      }

      .event-text {
        display: flex;
        flex-flow: column wrap;

        & > strong {
          color: var(--primary);
          font-size: 1.333rem;
        }
        & > span {
          color: var(--contentSecondary);
          font-size: 0.75019rem;
          font-weight: 600;
          line-height: 1.5;
        }
      }

      .event-img {
        position: absolute;
        inset-inline-end: 0;
        inset-block-end: 0;
        border-radius: 0rem 0rem 1rem 0;

        & > img {
          display: block;
          inline-size: 8.125rem;
          block-size: 4.5rem;
          border-radius: 0rem 0rem 1rem 0;
        }
      }
    }

    .get-news {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.875rem 1.5625rem;
      white-space: nowrap;

      & > p {
        display: inline-flex;
        align-items: start;
        gap: 0.25rem;
        color: var(--contentSecondary);
        font-size: 0.75019rem;
        font-weight: 600;
        line-height: 1.5;

        &::before {
          content: '';
          inline-size: 0.9375rem;
          aspect-ratio: 1/1;
          background: url('/images/ico_robot.svg') center/contain no-repeat;
        }
      }
      & > button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        border-radius: 1.25rem;
        background: var(--lightblue--400);
        color: var(--white);
        font-size: 0.75019rem;
        font-weight: 600;
        line-height: 1.5;
        padding: 0.25rem 0.75rem;

        &::before {
          content: '';
          inline-size: 1rem;
          aspect-ratio: 1/1;
          background: url('/images/ico_ring.svg') center/contain no-repeat;
        }
      }
    }
  }
`;
