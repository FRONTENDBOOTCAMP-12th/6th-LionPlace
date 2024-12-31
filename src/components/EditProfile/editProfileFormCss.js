import { css } from 'lit';

export const editProfileFormStyles = css`
  :focus {
    outline: 1px solid black;
  }

  .profile-container {
    max-width: 37.5rem;
    margin: 0 auto;
    padding: 1rem;
  }

  .profile-header {
    margin-bottom: 1.5rem;
    border-bottom: 0.5px solid var(--contentTertiary);
  }

  .profile-header button {
    display: flex;
    align-items: center;
    inline-size: 100%;
    padding: 0.25rem;
    transform: translateX(-1rem);
  }

  .profile-header button:focus {
    outline: none;
  }

  .profile-header button:focus img {
    outline: 1px solid black;
  }

  .profile-header button span {
    color: var(--contentPrimary);
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.5;
    white-space: nowrap;
  }

  .profile-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .section-title {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }

  .avatar-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 9.375rem;
    height: 9.375rem;
    margin: 0 auto 1rem;
    border-radius: 50%;
    overflow: hidden;
    background: var(--gray--50);
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  .avatar-edit-btn {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    background: var(--white);
    border: none;
    border-radius: 50%;
    padding: 0.5rem;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .avatar-edit-btn .edit-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
  .avatar-edit-btn .edit-icon:focus {
    border: 0.5px solid black;
  }

  .profile-introduction-section {
    margin-top: 1.5rem;
  }

  .introduction-textarea {
    width: 100%;
    height: 6.25rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
    box-sizing: border-box;
  }

  .save-btn {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin-top: 1rem;
    background: var(--blue--400);
    color: var(--white);
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }

  .save-btn:hover {
    background: var(--blue--500);
  }

  .error-message {
    margin-top: 0.5rem;
    color: var(--error);
    font-size: 0.875rem;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    width: 18rem;
    height: 10rem;
    background: var(--white);
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .modal-content button {
    display: block;
    margin: 0.5rem auto;
    padding: 0.5rem 1rem;
    background: var(--blue--400);
    color: var(--white);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    width: 9rem;
    height: 2rem;
    text-align: center;
    line-height: 1rem;
  }

  .modal-content button:hover {
    background: var(--blue--500);
  }
`;
