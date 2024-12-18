import { css } from 'lit';
import resetStyles from '@/styles/reset.js';
import { buttonStyles } from '../Button/buttonCss';

export const reviewStyles = [
  resetStyles,
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
