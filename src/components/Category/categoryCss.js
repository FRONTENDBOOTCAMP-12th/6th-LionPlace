import { css } from 'lit';

export const categoryStyles = css`
  .category-tab {
    & > ul {
      display: flex;
      gap: 0.38rem;
      overflow: auto;
      padding: 1rem 0 1rem 1.16rem;
      scrollbar-width: none;

      & > li {
        & > button {
          display: flex;
          flex-flow: column wrap;
          justify-content: center;
          align-items: center;
          gap: 0.3rem;
          inline-size: 26.25vw;
          aspect-ratio: 1/1;
          background-color: transparent;
          border-radius: 0.75rem;
          color: var(--contentPrimary);
          font-size: 0.75019rem;
          line-height: 1;
          white-space: nowrap;

          &::before {
            content: '';
            inline-size: 1.125rem;
            aspect-ratio: 1/1;
            mask: url('/images/ico_entire.svg') center/contain no-repeat;
            background-color: var(--primary);
          }

          &.is--active {
            background-color: var(--primary);
            color: var(--white);

            &::before {
              background-color: var(--white);
            }
          }
        }
        .tab-btn:focus-visible {
          outline: 2px solid var(--blue--800);
          outline-offset: 2px;
        }
        .beauty {
          &::before {
            mask: url('/images/ico_beauty.svg');
          }
        }
        .hospital {
          &::before {
            mask: url('/images/ico_hospital.svg');
          }
        }
        .performance {
          &::before {
            mask: url('/images/ico_ticket.svg');
          }
        }
      }
    }
  }

  .summary {
    padding: 1rem 2.25rem;

    & p {
      color: var(--contentPrimary);
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.6;

      & span {
        color: var(--lightblue--400);
      }
    }
  }

  /* 데이터 랜더링되는 영역 */
  .data-container {
    display: flex;
    flex-flow: column wrap;

    .data-item {
      display: flex;
      flex-flow: column;
      gap: 0.75rem;
      padding: 0.75rem 1.4375rem 0;

      .data-item__wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .data-item__inner {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      & span {
        font-size: 0.75019rem;
        font-weight: 600;
        line-height: 1.5;
        white-space: nowrap;
        text-align: center;
      }

      & .rank {
        border-radius: 0.5rem;
        border: 0.5px solid var(--gray-100, #e1e1e1);
        color: var(--contentSecondary);
        padding: 0.125rem 0.5rem;
      }

      & .name {
        display: flex;
        align-items: center;
        color: var(--contentPrimary);
      }

      & .count {
        color: var(--contentSecondary);
      }
    }
  }

  .progress-bar {
    inline-size: 100%;
    block-size: 0.125rem;
    background-color: var(--lightblue--300);

    /* 진행 바 채워지는 부분 */
    .progress-fill {
      height: 100%;
      background-color: var(--lightblue--900);
    }
  }

  /* 더보기 버튼 영역 */
  .btn-container {
    .more-btn {
      display: flex;
      justify-content: center;
      inline-size: 100%;
      padding: 0.9375rem 8.4375rem;
      background-color: transparent;
      &:focus-visible {
        outline: 1px solid var(--blue--800);
        outline-offset: 1px;
      }

      & span {
        color: var(--contentPrimary);
        font-size: 0.75019rem;
        line-height: 1.6;
        white-space: nowrap;
      }

      & img {
        transition: transform 0.3s ease;

        &.is--active {
          transform: rotate(180deg);
        }
      }
    }

    .content {
      overflow: hidden;
      transition: height 0.5s ease;
      height: 0;
    }

    .content-inner {
      padding: 1rem;
    }
  }

  /* 하단 카테고리 뱃지 영역 */
  .category-bedge {
    padding: 0.75rem 3.8125rem 2.3125rem 1.25rem;
    background-color: var(--gray--100);

    & > ul {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      & > li {
        & > span {
          background-color: var(--white);
          border-radius: 1rem;
          color: var(--contentSecondary);
          padding: 0.25rem 0.5rem;
          text-align: center;
          font-size: 0.75019rem;
          font-weight: 600;
          line-height: 1.5;

          & > strong {
            color: var(--contentPrimary);
          }
        }
      }
    }
  }
`;
