import { html, LitElement } from 'lit';
import { mapStyles } from './mapCss.js';
import commonStyle from '@/styles/common.js';
import pb from '@/api/pocketbase.js';

import '@/components/Place/place.js';
import '@/components/Feed/navBar.js';

class Map extends LitElement {
  static properties = {
    storeInfo: { type: Object },
    categories: { type: Array },
    currCategory: { type: Object },
    _isSearchDone: { type: Boolean },
  };

  constructor() {
    super();

    this.loading = true;
    this.currCategory = null; // 현재 선택된 카테고리
    this._map = null;
    this._markers = []; // 마커 목록(배열)
    this._places = {}; // 지도에 표시되는 장소들 정보(객체)
    this._center = { lat: 37.5709958592808, lng: 126.978914477333 }; // center 기본 값: 멋쟁이 사자처럼 본사
    this._userImageSrc = '/images/ico_lion.svg'; // 사용자 위치 icon
    this._isSearchDone = true; // 검색 완료 여부(검색 후 지도 영역 변경될 시 false로 바뀜)
  }

  static styles = [commonStyle, mapStyles];

  async connectedCallback() {
    super.connectedCallback();

    // 카카오 지도 로드
    this._loadKakaoMap();
  }

  // 카카오 지도 API 스크립트 로드
  _loadKakaoMap() {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_APP_KEY
    }&autoload=false&libraries=services,clusterer`;

    script.onload = async () => {
      // 지도 초기화
      await this._initMap();

      // 카테고리 정보 조회
      await this._fetchCategoryData();
    };
    document.head.appendChild(script);
  }

  // 카테고리 정보 조회
  async _fetchCategoryData() {
    try {
      const response = await pb.collection('store_categories').getFullList({
        sort: 'index',
        filter: 'is_active=true',
      });

      this.categories = response;
    } catch (error) {
      console.error('PocketBase 데이터 알 수 없음');
    } finally {
      this.loading = false;
    }
  }

  // 현재 위치 정보 가져오기
  async _getUserLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ lat: latitude, lng: longitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation을 지원하지 않습니다.'));
      }
    });
  }

  // 카카오 지도 초기화
  async _initMap() {
    if (window.kakao && window.kakao.maps) {
      const { kakao } = window;

      kakao.maps.load(async () => {
        const mapContainer = this.shadowRoot.getElementById('map');
        const mapOptions = {
          center: new kakao.maps.LatLng(this._center.lat, this._center.lng),
          level: 2,
        };

        // 지도 생성
        this._map = new kakao.maps.Map(mapContainer, mapOptions);
        this._ps = new kakao.maps.services.Places(this._map);

        // 사용자 위치 그리기
        this._renderUserLocation();

        // 지도 영역 변경 시 발생하는 이벤트 등록
        kakao.maps.event.addListener(this._map, 'bounds_changed', this._handleBoundChanged);
      });
    } else {
      console.error('카카오 지도 API 로드 실패');
      alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  }

  // 이동, 확대, 축소로 인해 지도 영역 변경 시 발생하는 이벤트
  _handleBoundChanged = () => {
    this._isSearchDone = false;
  };

  // 지도 중심 업데이트
  _updateMapCenter(moveLatLon) {
    if (this._map) {
      this._map.setCenter(moveLatLon);
    }
  }

  // 카테고리 검색
  _searchPlaces = () => {
    if (!this.currCategory) {
      return;
    }

    // 지도에 표시되고 있는 마커 제거
    this._removeMarker();

    // 장소 초기화
    this._places = {};

    // 카테고리에 해당하는 장소 검색
    this._ps.categorySearch(this.currCategory.code, this._placesSearchCB, { useMapBounds: true });
  };

  // 장소 검색 완료 시 호출되는 콜백함수
  _placesSearchCB = (data, status) => {
    const { kakao } = window;

    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면 지도에 표출
      this._displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      // 검색결과가 없는경우
    } else if (status === kakao.maps.services.Status.ERROR) {
      // 에러로 인해 검색결과가 나오지 않은 경우
    }

    this._isSearchDone = true;
  };

  // 지도에 마커 표출
  _displayPlaces = (places) => {
    const { kakao } = window;

    for (var i = 0; i < places.length; i++) {
      // 장소 데이터 저장
      this._places[places[i].id] = places[i];

      // 마커를 생성하고 지도에 표시합니다
      var iconSrc = `/images/places/categories/ico_${this.currCategory.icon}_marker.svg`;
      var marker = this._addMarker(
        new kakao.maps.LatLng(places[i].y, places[i].x),
        iconSrc,
        places[i].place_name
      );

      // 마커와 검색결과 항목을 클릭 했을 때
      // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
      ((marker, place) => {
        kakao.maps.event.addListener(marker, 'click', () => {
          this._displayPlaceInfo(place);
        });
      })(marker, places[i]);
    }
  };

  // 마커를 생성 후 지도 위에 표시
  _addMarker(position, markerImageSrc, title) {
    const { kakao } = window;

    let markerData = {
      position: position,
    };

    // 아이콘
    if (markerImageSrc) {
      markerData.image = new kakao.maps.MarkerImage(markerImageSrc, new kakao.maps.Size(30, 30));
    }

    // 타이틀
    if (title) {
      markerData.title = title;
    } else {
      // 타이틀이 없는 경우 클릭 못하도록 설정
      markerData.clickable = false;
    }

    // 마커 생성
    let marker = new kakao.maps.Marker(markerData);

    marker.setMap(this._map); // 지도 위에 마커 표출
    this._markers.push(marker); // 배열에 생성된 마커 추가

    return marker;
  }

  // 지도 위에 표시되고 있는 마커 제거
  // end가 0이면 사용자 위치 마커도 제거됨
  _removeMarker(end = 1) {
    for (var i = end; i < this._markers.length; i++) {
      this._markers[i].setMap(null);
    }

    this._markers = end > 0 ? this._markers.slice(0, end + 1) : [];
    this._places = {};
  }

  // 상세 화면 보이기
  _displayPlaceInfo(place) {
    this.storeInfo = place;
  }

  // 카테고리 클릭 이벤트
  _handleCategoryClick(e) {
    const index = e.currentTarget.dataset.index;
    this.currCategory = this.categories[index];
    this._searchPlaces();
  }

  // 현 지도에서 검색 이벤트
  _handleSearchClick() {
    this._searchPlaces();
  }

  // 접속위치 버튼 클릭 이벤트
  async _handleMyLocationClick() {
    await this._renderUserLocation();
    this.currCategory = null;
  }

  // 장소 상세 - 닫기 이벤트
  _handleCloseClick() {
    this.loading = false;
    this.storeInfo = null;
  }

  // 로딩바 그리기
  _renderLoading() {
    return html`
      <div class="loading">
        <img src="/images/loading_spinner.gif" alt="로딩중" />
      </div>
    `;
  }

  // 사용자 위치 그리기
  async _renderUserLocation(doRemoveMarker) {
    const { kakao } = window;

    try {
      // 사용자의 위치를 가져오기
      const userLocation = await this._getUserLocation();
      const kakaoUserLatLng = new kakao.maps.LatLng(userLocation.lat, userLocation.lng);

      // center 값 업데이트
      this._center = userLocation;

      this._removeMarker(0);
      this._addMarker(kakaoUserLatLng, this._userImageSrc);
      this._updateMapCenter(kakaoUserLatLng);
    } catch (error) {
      console.warn('현재 위치를 가져오는 데 실패했습니다.', error);
      alert('현재 위치를 가져오는 데 실패했습니다.');
    }
  }

  // 카테고리 그리기
  _renderCategories() {
    return html` <ul id="category" class="category-list">
      ${this.categories.map(
        (item, index) =>
          html` <li>
            <button
              class="category-btn btn rounded 
                ${this.currCategory && this.currCategory.id == item.id ? 'on' : ''}"
              data-index=${index}
              @click=${this._handleCategoryClick}
            >
              <img
                src="/images/places/categories/ico_${item.icon}.svg"
                role="presentation"
                alt=""
              />
              <span>${item.name}</span>
            </button>
          </li>`
      )}
    </ul>`;
  }

  // 장소 상세 그리기
  _renderPlaces() {
    this.loading = true;

    return html`<place-element
      .storeInfo=${this.storeInfo}
      .loading=${this.loading}
      @close-click=${this._handleCloseClick}
    ></place-element>`;
  }

  render() {
    return html`
      <section class="map-section">
        ${this.categories ? this._renderCategories() : ''}

        <div id="map" class="map-content"></div>

        ${!this._isSearchDone && !!this.currCategory
          ? html`<button class="search-btn btn rounded" @click=${this._handleSearchClick}>
              현 지도에서 검색
            </button>`
          : ''}

        <button class="my-location-btn btn rounded" @click=${this._handleMyLocationClick}>
          <img src="/images/ico_location.svg" alt="접속위치" />
        </button>
      </section>
      <nav-bar></nav-bar>
      ${this.storeInfo ? this._renderPlaces() : ''} ${this.loading ? this._renderLoading() : ''}
    `;
  }
}

customElements.define('map-element', Map);
