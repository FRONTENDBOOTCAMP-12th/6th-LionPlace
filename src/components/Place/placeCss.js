import { css } from 'lit';

export const placeStyles = css`
  .place-container {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background: white;
    min-height: 100vh;
    box-sizing: border-box;
    transition: 1s;
    z-index: 99;
    width: 100%;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0.875rem;

      .place-name {
        font-size: 1rem;
      }

      .btn.close-btn {
        padding: 0 !important;
      }
    }

    .place-image {
      display: flex;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;

      figure {
        flex: 1;

        img {
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
      gap: 4px;
      margin: 16px 4px 8px;

      .title {
        align-self: stretch;
        height: 32px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        gap: 6px;
        text-align: left;

        .place-name {
          position: relative;
          font-size: 16px;
          line-height: 150%;
        }
        .place-category {
          position: relative;
          line-height: 160%;
          color: #a6a6a6;
          text-align: left;
        }
      }

      .review-record {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0px 4px;
        box-sizing: border-box;
        text-align: center;
        font-size: 16px;

        .review-score {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: 0px 8px;
          box-sizing: border-box;
          gap: 5px;
        }

        .review-count {
          position: relative;
          font-size: 12px;
          line-height: 160%;
          text-align: center;
        }
      }
    }

    .tab-contents {
      background-color: #e1e1e1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
      font-size: 0.75rem;

      .noticeContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 18px 12px 0px;
        gap: 8px;
        cursor: pointer;
        box-sizing: border-box;

        .notice {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          gap: 84px;
          text-align: left;

          .i {
            position: relative;
            line-height: 150%;

            .span {
              color: #a6a6a6;
            }
          }

          .alarmsetting {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            color: #171f31;

            .iconring {
              width: 18px;
              height: 18px;
              position: relative;
            }
          }
        }

        .coupon {
          position: relative;
          border-radius: 16px;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          text-align: left;

          .image-icon {
            width: 94px;
            border-radius: 16px 0px 0px 16px;
            height: 91px;
            object-fit: cover;
          }

          .textbox {
            align-self: stretch;
            width: 196px;
            border-radius: 0px 16px 16px 0px;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 0px 12px;
            box-sizing: border-box;
            gap: 4px;

            .title {
              align-self: stretch;
              position: relative;
              line-height: 150%;
            }
            .content {
              align-self: stretch;
              position: relative;
              line-height: 160%;
              color: #6b6b6b;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 19px;
              flex-shrink: 0;
            }
            .text {
              align-self: stretch;
              position: relative;
              line-height: 160%;
              color: #a6a6a6;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 19px;
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
`;
