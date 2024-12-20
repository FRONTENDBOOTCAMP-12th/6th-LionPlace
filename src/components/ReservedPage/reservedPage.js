import { html, LitElement } from 'lit';

import '@/components/Time/time';
import '@/components/ProfileAll/profileAll';
import '@/components/Navigation/navigation';
import '@/components/Tab/tab';
import '@/components/Category/category';
import '@/components/Feed/navBar';
import '@/layout/Footer/footer';

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
