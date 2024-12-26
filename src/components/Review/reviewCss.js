import { css } from 'lit';
import commonStyles from '@/styles/common.js';
import { buttonStyles } from '../Button/buttonCss.js';

export const reviewStyles = [
  commonStyles,
  buttonStyles,
  css`
    .btn {
      padding: 0.625rem 1.125rem !important;
      width: auto !important;
      // padding: 0.625rem 1.125rem;
      // width: auto;
    }

    .section {
      padding: 0 0.875rem;
    }
  `,
];
