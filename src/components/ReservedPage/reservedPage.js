import { html, LitElement } from 'lit';

import '@/components/Time/time.js';
import '@/components/ProfileAll/profileAll.js';
import '@/components/Navigation/navigation.js';
import '@/components/Tab/tab.js';
import '@/components/ReservedCategory/reservedCategory.js';
import '@/components/Order/order.js';

class ReservedPage extends LitElement {
  render() {
    return html`
      <time-element></time-element>
      <profileall-element></profileall-element>
      <navigation-element></navigation-element>
      <tab-element></tab-element>
    `;
  }
}

customElements.define('reserved-page', ReservedPage);
