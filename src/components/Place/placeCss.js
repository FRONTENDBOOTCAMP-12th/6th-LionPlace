import { css } from 'lit';

export const placeStyles = css`
  .place-section {
    position: absolute;
    top: 0;
    left: 0;
    bottom: unset;
    display: block;
    background: var(--white);
    box-sizing: border-box;
    transition: 1s;
    z-index: 99;
    width: 100%;

    .place-section__top {
      & > button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        inline-size: 100%;
        border-bottom: 0.5px solid var(--contentTertiary);
        padding: 0.5rem;

        &:focus-visible {
          outline: 2px solid var(--blue--800);
          outline-offset: 1px;
        }

        & > span {
          color: var(--contentPrimary);
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
          white-space: nowrap;
        }
      }
    }

    .place-section__main {
      .store-image-preview {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;

        li {
          display: flex;
          position: relative;

          .store-image-more-btn {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .more-image-count {
            position: absolute;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            align-items: center;
            z-index: 11;
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.8);

            &::before {
              content: '';
              inline-size: 2.25rem;
              aspect-ratio: 1/1;
              mask: url(/images/ico_photo.svg) center/contain no-repeat;
              background-color: rgba(255, 255, 255, 0.8);
            }
          }

          &:last-child::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 10;
            background: rgba(0, 0, 0, 0.3);
            content: '';
            pointer-events: none;
          }
        }

        figure {
          flex: 1;

          img {
            vertical-align: top;
            width: 100%;
            object-fit: cover;
            aspect-ratio: 1 / 1;
            height: 100%;
          }
        }
      }

      .place-top {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        margin: 1rem 0 0.5rem;

        .title {
          align-self: stretch;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;

          .place-category {
            color: var(--gray--300);
            font-size: 0.75rem;
          }
        }

        .review-record {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          text-align: center;
          gap: 0.875rem;

          .like-count,
          .review-count {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .like-count::before {
            content: '';
            inline-size: 1.125rem;
            aspect-ratio: 1/1;
            mask: url(/images/ico_heart.svg) center/contain no-repeat;
            background-color: var(--contentPrimary);
          }
        }

        .button-container {
          padding: 8px 0;

          .save-btn {
            font-weight: 600;
            padding: 6px 18px;
            border: 1px solid var(--contentPrimary);
            border-radius: 1rem;
            color: var(--contentPrimary);

            &::before {
              content: '';
              inline-size: 1.125rem;
              aspect-ratio: 1/1;
              mask: url(/images/ico_save.svg) center/contain no-repeat;
              background-color: var(--contentPrimary);
            }

            &.is--active {
              background-color: var(--lightblue--800);
              color: var(--white);
              &::before {
                background-color: var(--white);
              }
            }
          }
        }
      }

      .tab-section {
        background-color: var(--gray--100);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
        font-size: 0.75rem;
        padding-bottom: 70px;
        height: auto;

        .tab-content {
          display: none;
          min-height: calc(100vh - 9.375rem);

          &.is--active {
            display: block;
          }
        }
      }
    }
  }
`;
