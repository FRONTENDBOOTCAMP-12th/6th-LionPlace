import { css } from 'lit';

export const editProfileFormStyles = css`
  main.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 1rem;
  }

  .avatar {
    position: relative;
    width: 6rem;
    height: 6rem;
  }

  .avatar img {
    inline-size: 5rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }

  .edited-img {
    position: absolute;
    bottom: 0;
    right: -30px;
    background-color: var(--white);
    padding: 0.26rem;
    border-radius: 50%;
    z-index: 1;
    width: 1.5rem;
    height: 1.5rem;
  }

  .introduction-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 0.625rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 100%;
    max-width: 20rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .introduction-label {
    align-self: flex-start;
    display: block;
    font-size: 1rem;
    margin-bottom: 8px;
    color: #333;
  }

  .introduction-section textarea {
    width: 100%;
    min-height: 8rem;
    padding: 0.625rem;
    font-size: 1rem;
    font-family: inherit;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .introduction-section textarea:focus {
    outline: none;
  }

  .introduction-section button {
    align-self: flex-end;
    padding: 0.625rem 1.25rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;
  }

  .introduction-section button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  .introduction-section button:active {
    background-color: #004080;
    transform: translateY(0);
  }

  .introduction-section .error-message {
    color: #ff4d4d;
    font-size: 0.75rem;
    margin-top: -8px;
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
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .modal-content button {
    display: block;
    margin: 0.5rem auto;
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .modal-content button:hover {
    background: #0056b3;
  }
`;
