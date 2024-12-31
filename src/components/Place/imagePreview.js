import { LitElement, html, css } from 'lit';
import { getPbImageURL } from '@/api/getPbImageURL';
import commonStyles from '@/styles/common.js';
import { imagePreviewStyles } from './imagePreviewCss.js';

// TODO 삭제 /${item.collectionId}/${item.id}/${item[fileName]}
const data = [
  {
    category_id: '',
    collectionId: 'pbc_4273634722',
    collectionName: 'store_menus',
    created: '2024-12-30 19:37:43.746Z',
    description: '국내산 한돈입니다.',
    id: 'hw25m12j14y10r4',
    image: 'menu1_md8ql3737k.jpg',
    index: 1,
    is_present: true,
    name: '솥뚜껑삼겹살 1인분 (180g)',
    price: 13900,
    status: '',
    store_id: '815670814',
    updated: '2024-12-30 20:00:25.074Z',
  },
  {
    category_id: '',
    collectionId: 'pbc_4273634722',
    collectionName: 'store_menus',
    created: '2024-12-30 19:37:44.616Z',
    description: '국내산 한돈입니다.',
    id: 'cfv0571z045o026',
    image: 'menu2_c42d0lobgx.jpg',
    index: 2,
    is_present: false,
    name: '눈꽃목살 1인분 (180g)',
    price: 13900,
    status: '',
    store_id: '815670814',
    updated: '2024-12-30 20:34:31.335Z',
  },
  {
    category_id: '',
    collectionId: 'pbc_4273634722',
    collectionName: 'store_menus',
    created: '2024-12-30 19:37:45.422Z',
    description: '국내산 한돈입니다.',
    id: 'gzb2h15g8806w53',
    image: 'menu3_4r0ql2nsx1.jpg',
    index: 3,
    is_present: false,
    name: '꽃항정살 1인분 (180g)',
    price: 14900,
    status: '',
    store_id: '815670814',
    updated: '2024-12-30 20:34:34.744Z',
  },
  {
    category_id: '',
    collectionId: 'pbc_4273634722',
    collectionName: 'store_menus',
    created: '2024-12-30 19:37:46.303Z',
    description: '라면사리 + 공기밥 무한리필입니다.',
    id: '98nzba4z7dv20nd',
    image: 'menu4_3uqoqtih10.jpg',
    index: 4,
    is_present: false,
    name: '점심특선 [통돼지 김치찌개]',
    price: 9000,
    status: '',
    store_id: '815670814',
    updated: '2024-12-30 20:34:38.391Z',
  },
];

class ImagePreview extends LitElement {
  static styles = [commonStyles, imagePreviewStyles];

  static properties = {
    images: { type: Array },
  };

  constructor() {
    super();

    // TODO 삭제
    this.images = [...data];
  }

  render() {
    return html`
      <section class="image-preview">
        <h2>방문자 사진</h2>
        <ul class="list">
          ${this.images.map(
            (item) => html`
              <li class="image">
                ${item.image
                  ? html`<figure>
                      <img src="${getPbImageURL(item)}" alt="" />
                      <figcaption class="a11y-hidden">리뷰 사진</figcaption>
                    </figure>`
                  : ''}
              </li>
            `
          )}
        </ul>
        <button @click="${this._handleMoreClick}" class="more-button">방문자 사진 더보기</button>
      </section>
    `;
  }
}

customElements.define('image-preview', ImagePreview);
