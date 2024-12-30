import { css } from 'lit';

export const footerStyle = css`
  footer {
    display: flex;
    flex-flow: column wrap;
    gap: 0.62rem;
    background-color: var(--gray--100);
    padding: 1.12rem 1.06rem 6.94rem;
  }

  .footer__top {
    display: flex;
    justify-content: center;
    align-items: center;

    .language-icon {
      position: absolute;
      inset-inline-start: 0.5rem;
      pointer-events: none;
    }
    .select-arrow {
      position: absolute;
      inset-inline-end: 0.5rem;
      pointer-events: none;
    }

    .global-list {
      display: inline-flex;
      position: relative;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: var(--white);

      select {
        padding: 0.12rem 1.75rem 0.12rem 1.63rem;
        appearance: none;
        border: 0;
        background-color: var(--white);
        color: var(--contentSecondary);
        font-size: 0.75019rem;
        line-height: 1.6;
      }
    }
  }

  .footer__bottom {
    .footer-nav {
      display: flex;
      flex-flow: column wrap;
      gap: 0.19rem;

      .footer-nav__top,
      .footer-nav__bottom {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        gap: 1rem;

        & > li {
          position: relative;
          font-size: 0.75019rem;
          line-height: 1.6;
          text-align: center;

          + li {
            &::before {
              content: '';
              display: inline-flex;
              position: absolute;
              inset: 0.125rem auto auto -0.5125rem;
              border-right: 1px solid var(--contentSecondary);
              block-size: 0.8125rem;
            }
          }
          & > strong {
            font-weight: 600;
          }
        }
      }
      .footer-nav__top {
        color: var(--contentPrimary);
      }
      .footer-nav__bottom {
        color: var(--contentSecondary);
      }
    }

    & > p {
      color: var(--contentSecondary);
      text-align: center;
      font-size: 0.75019rem;
      line-height: 1.6;
    }
  }
`;
