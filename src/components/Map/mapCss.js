import { css } from 'lit';

export const mapStyles = css`
  .map,
  .map-content {
    width: 100%;
    height: 100%;
  }

  .category-list {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    z-index: 10;
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    white-space: nowrap;
  }

  .category-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    background-color: var(--white);
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
    flex-shrink: 0;

    &.on {
      background-color: var(--primary);
      color: white;
    }
  }

  .search-btn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
  }

  .my-location-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 0.5rem;
  }

  .loading {
    position: absolute;
    inset-inline-start: 50%;
    inset-block-start: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;

    & img {
      display: flex;
      justify-content: center;
      align-items: center;
      inline-size: 100px;
      aspect-ratio: 1/1;
    }
  }
`;
