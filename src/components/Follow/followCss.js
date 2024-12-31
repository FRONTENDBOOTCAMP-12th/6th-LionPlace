import { css } from 'lit';

export const followStyles = css`
  .header {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    background: white;
  }

  .back-button {
    font-size: 1.5rem;
    margin-right: 1rem;
    cursor: pointer;
    background: none;
    border: none;
  }

  .title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .tabs {
    display: flex;
    justify-content: flex-start; /* 왼쪽 정렬 */
    gap: 1rem; /* 탭 간의 간격 추가 */
    padding: 0.5rem 0;
    padding-left: 1.5rem; /* 왼쪽 간격 추가 */
    border-bottom: 1px solid #eee;
    background: white;
  }

  .tab {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: bold;
    color: #666;
    background-color: #f5f5f5;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .tab.active {
    background-color: #171f31;
    color: #fff;
  }

  .content {
    padding: 1rem;
  }
`;
