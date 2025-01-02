import { css } from 'lit';

export const savedPlacesStyles = css`
  :host {
    display: block;
    background: white;
    min-height: 100vh;
    padding-bottom: 3.75rem;
  }
  .header {
    margin-left: 1.25rem;
    border-bottom: 0.0625rem solid #f0f0f0;
  }
  .title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  .subtitle {
    font-size: 0.875rem;
    color: #666;
    margin-top: 0.25rem;
  }
  .create-group-form {
    padding: 1rem;
    background-color: #f8f9fa;
    border-bottom: 0.0625rem solid #f0f0f0;
  }
  .create-group-form h2 {
    margin: 0; /* 상단 마진 제거 */
    margin-bottom: 0.5rem; /* 하단 여백 추가 */
    font-size: 1.25rem;
    font-weight: bold;
  }
  .input-field {
    width: 100%;
    padding: 0.75rem;
    border: 0.0625rem solid #ddd;
    border-radius: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    box-sizing: border-box;
  }
  .input-field:focus {
    border: 0.125rem solid #171f31;
    outline: none;
  }
  .button-group {
    display: flex;
    gap: 0.5rem;
  }
  .button {
    flex: 1;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: opacity 0.2s;
  }
  .button:active {
    opacity: 0.8;
  }
  .create-button {
    background-color: #171f31;
    color: white;
  }
  .cancel-button {
    background-color: #f0f0f0;
    color: #666;
  }
  .place-title {
    margin-left: 1.25rem;
  }
  .place-item {
    display: flex;
    padding: 1rem;
    gap: 1rem;
    border-bottom: 0.0625rem solid #f0f0f0;
  }
  .place-image {
    width: 5rem;
    height: 5rem;
    border-radius: 0.5rem;
    background-size: cover;
    background-position: center;
  }
  .place-content {
    flex: 1;
  }
  .place-name {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0;
  }
  .place-info {
    font-size: 0.875rem;
    color: #8e8e8e;
    margin-top: 0;
  }
  .back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
  }
  .back-button a {
    color: inherit;
    text-decoration: none;
  }
`;
