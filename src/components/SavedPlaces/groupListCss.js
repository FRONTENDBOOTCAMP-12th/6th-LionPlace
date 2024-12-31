import { css } from 'lit';

export const groupListStyles = css`
  .list-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 0.0625rem solid #f0f0f0;
    cursor: pointer;
    position: relative;
  }
  .icon {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #f8f9fa;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
  }
  .content {
    flex: 1;
  }
  .title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  .info {
    font-size: 0.875rem;
    color: #8e8e8e;
  }
  .edit-button {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .edit-button img {
    width: 100%;
    height: 100%;
  }
  .dropdown-menu {
    position: absolute;
    top: 3rem;
    right: 1rem;
    background: white;
    border: 0.0625rem solid #ddd;
    border-radius: 0.25rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
  .dropdown-item {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: #333;
    cursor: pointer;
    white-space: nowrap;
  }
  .dropdown-item:hover {
    background: #f5f5f5;
  }
  .new-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    color: #666;
  }
  .header {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
`;
