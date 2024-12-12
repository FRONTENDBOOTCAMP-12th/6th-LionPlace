import { css } from 'lit';

export const profileAllStyles = css`
  .profile {
    position: relative;
    background-color: var(--primary);
    padding: 2.25rem 1.375rem 1.375rem 1.375rem;
  }

  .profile-container {
    display: flex;
    flex-flow: column wrap;
    gap: 0.5rem;

    & .profile-container__top {
      display: grid;
      grid-template-columns: min-content 1fr;
      gap: 1.19rem;

      & .avatar {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: start;
        inline-size: 3.51563rem;
        aspect-ratio: 1/1;
        border: 0.1875rem solid #fff;
        border-radius: 5000px;

        & button {
          color: var(--white);
          text-align: center;
          font-size: 0.78144rem;
          inline-size: 100%;
          block-size: 100%;
          font-weight: 600;
          font-family: var(--font--pretendard);
          line-height: 1.5;
          background-color: inherit;
        }

        & img {
          position: absolute;
          inset-block-end: 0;
          inset-inline-end: 0;
          background-color: var(--white);
          padding: 0.26rem;
          border-radius: 5000px;
        }
      }

      & .user-info {
        display: flex;
        flex-flow: column wrap;
        color: #fff;

        & .nickname {
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
        }

        & .review {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;

          & > ul {
            display: flex;
            padding: 0.25rem 0.38rem;
            width: 100%;

            & :not(li ~ li) {
              &::before {
                visibility: hidden;
                margin-inline: 0;
              }
            }

            & > li {
              display: flex;
              width: 100%;

              &::before {
                content: '';
                display: inline-block;
                margin-inline: 0.5rem;
                width: 0.0625rem;
                height: 1.75rem;
                margin-block: 0.28rem;
                background-color: #ddd;
              }

              &:nth-of-type(2) {
                &::before {
                  margin-inline: 0;
                  margin-inline-end: 0.5rem;
                }
              }

              & > a {
                display: flex;
                flex-flow: column wrap;
                inline-size: 100%;

                & span {
                  font-size: 0.75019rem;
                  line-height: 1.5;
                  white-space: nowrap;

                  &:nth-of-type(1) {
                    line-height: 1.6;
                  }
                  &:nth-of-type(2) {
                    font-weight: 600;
                  }
                }
              }
            }
          }
        }
      }
    }

    & .profile-container__bottom {
      display: flex;
      gap: 0.31rem;

      & a {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        padding: 0.375rem 1.125rem;
        inline-size: 100%;
        background-color: var(--lightblue--800);
        border-radius: 0.5rem;
        color: var(--white);
        font-size: 0.75019rem;
        font-weight: 600;
        font-family: var(--font--pretendard);
        line-height: 1.5;

        &::before {
          content: '';
          inline-size: 1.125rem;
          block-size: 1.125rem;
        }

        &:nth-of-type(1) {
          &::before {
            background: url(/images/ico_wirte.png);
          }
        }

        &:nth-of-type(2) {
          &::before {
            background: url(/images/ico_misson.png);
          }
        }
      }
    }
  }

  .coupon {
    & .coupon-link {
      text-align: center;
      color: var(--white);

      & .coupon-text {
        position: absolute;
        top: 0.72rem;
        right: 1.25rem;
        font-size: 0.75019rem;
        line-height: 1.6;
        border: 0.0625rem solid var(--white);
        padding: 0.25rem;
        border-radius: 0.25rem;
        inline-size: 1.875rem;
        block-size: 1.25rem;
      }

      & .coupon-count {
        display: flex;
        position: absolute;
        top: 0.53rem;
        right: 1rem;
        justify-content: center;
        align-items: center;
        width: 0.75rem;
        aspect-ratio: 1 / 1;
        font-size: 0.75019rem;
        padding: 0.15rem;
        color: var(--primary);
        background-color: var(--white);
        border-radius: 5000px;
      }
    }
  }
`;
