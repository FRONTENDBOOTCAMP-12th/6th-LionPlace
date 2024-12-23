import { html, LitElement } from 'lit';

import '@/components/Time/time.js';
import '@/components/ProfileAll/profileAll.js';
import '@/components/Navigation/navigation.js';
import '@/components/Tab/tab.js';
import '@/components/Category/category.js';
import '@/components/Feed/navBar.js';
import '@/layout/Footer/footer.js';

class ReservedPage extends LitElement {
  render() {
    return html`
      <time-element></time-element>
      <profileall-element></profileall-element>
      <navigation-element></navigation-element>
      <tab-element></tab-element>
      <nav-bar></nav-bar>
      <c-footer></c-footer>
    `;
  }
}

customElements.define('reserved-page', ReservedPage);
