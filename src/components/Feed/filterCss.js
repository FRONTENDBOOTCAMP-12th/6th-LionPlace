import { css } from 'lit';

export const filterStyles = css`
  :host {
    display: block;
    padding: 1rem;
    padding-bottom: 4rem;
    background-color: white;
  }

  .filter-container {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 0.5rem;

    /* 스크롤바 숨기기(모바일 및 웹 환경) */
    -ms-overflow-style: none;
  }

  .filter-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  .filter-button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    background-color: #f9f9f9;
    color: #333;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
    flex-shrink: 0;
  }

  .filter-button.selected {
    background-color: #171f31;
    color: white;
  }

  .feed-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
