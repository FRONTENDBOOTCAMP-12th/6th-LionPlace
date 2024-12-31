import { css } from 'lit';

export const postStyles = css`
  .post-container {
    background: white;
    margin-bottom: 1.25rem;
    border-radius: 0.9375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 1rem 1rem 0.75rem 1rem;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .profile-image {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #f0f0f0;
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }

  .username {
    font-weight: 600;
    font-size: 1rem;
    color: #262626;
    margin-bottom: 0.1875rem;
  }

  .date {
    font-size: 0.75rem;
    color: #737373;
  }

  .like-icon button {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    background-color: #737373; /* 기본 색상 */
    border: none;
    outline: none;
    transition:
      transform 0.2s ease-in-out,
      background-color 0.2s ease-in-out;
    mask: url('/images/ico_like.svg') no-repeat center;
    mask-size: contain;
  }

  .like-icon button.liked {
    background-color: #ff6b6b;
  }

  .post-image {
    width: 100%;
    border-radius: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .post-content {
    font-size: 0.875rem;
    line-height: 1.5;
    color: #262626;
    white-space: pre-wrap;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 기본 2줄 표시 */
    max-height: 3rem;
    transition: max-height 0.3s ease;
  }

  .post-content.expanded {
    -webkit-line-clamp: unset; /* 줄 제한 해제 */
    max-height: none;
  }

  .more-button {
    color: #737373;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    cursor: pointer;
    display: inline-block;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
  }
`;
