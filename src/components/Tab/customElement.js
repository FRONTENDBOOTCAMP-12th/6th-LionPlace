import { LitElement, html, css } from 'lit';

class MyCustomElement extends LitElement {
  static styles = css`
    div {
      border: 1px solid #ccc;
      padding: 10px;
      background-color: #f9f9f9;
    }
  `;

  render() {
    return html`<div>이것은 커스텀 엘리먼트의 내용입니다!</div>`;
  }
}

customElements.define('my-custom-element', MyCustomElement);
