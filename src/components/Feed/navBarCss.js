import { css } from 'lit';

export const navBarStyles = css`
  .tab-menu {
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 0.0625rem solid #eee;
  }

  .tab-menu__list {
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .tab-menu__list-item {
    flex: 1;
  }

  .tab-menu__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0;
    text-decoration: none;
    color: #666;
    width: 100%;
    position: relative;
  }

  .tab-menu__item--active::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0.625rem;
    right: 0.625rem;
    height: 0.1875rem;
    background-color: #171f31;
  }

  .tab-menu__icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .tab-menu__label {
    font-size: 0.75rem;
  }
`;
