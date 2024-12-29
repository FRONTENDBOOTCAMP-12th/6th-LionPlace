import { css } from 'lit';

export const followingStyles = css`
  .list {
    padding: 1rem;
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .profile img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ddd;
  }

  .username {
    font-size: 1rem;
    font-weight: bold;
  }

  .follow-button {
    padding: 0.5rem 1rem;
    background-color: #171f31;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
  }
`;
