import { css } from 'lit';

export const timeStyles = css`
  .time-wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    padding: 0.44rem 1.12rem;

    & .time-wrap__left {
      display: flex;
      gap: 0.06rem;
      align-items: center;

      p {
        color: var(--contentPrimary);
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.5;
      }
    }
    & .time-wrap__right {
      display: flex;
      justify-self: end;
      align-items: self-end;

      p {
        color: var(--contentPrimary);
        font-size: 0.75019rem;
        font-weight: 600;
        line-height: 1.5;
        text-transform: uppercase;
        margin-inline-end: 0.19rem;
      }
    }
  }
`;
