import SearchBar from './asset/searchbar.js';
import Today from './asset/today.js';
import Map from './asset/map.js';
import Cert from './asset/certified.js';
import { ReactComponent as AlertIcon } from './asset/icon/icon-profile.svg';

function Contents() {
  return (
    <>
      <SearchBar />
      <div class="carousel">
        공지사항 / 이벤트
      </div>
      <div class="article">
        <div class="article-title"><h3>나눔식품</h3></div>
        <div class="btn-grid">
          <div class="btn-rtg btn-line"><h5>한식</h5></div>
          <div class="btn-rtg btn-line"><h5>중식</h5></div>
          <div class="btn-rtg btn-line"><h5>일식</h5></div>
          <div class="btn-rtg btn-line"><h5>양식</h5></div>
          <div class="btn-rtg btn-line"><h5>아시안</h5></div>
          <div class="btn-rtg btn-line"><h5>분식</h5></div>
          <div class="btn-rtg btn-line"><h5>패스트푸드</h5></div>
          <div class="btn-rtg btn-line"><h5>디저트</h5></div>
          <div class="btn-rtg btn-line"><h5>음료</h5></div>
          <div class="btn-rtg btn-line"><h5>반찬</h5></div>
          <div class="btn-rtg btn-line"><h5>기타</h5></div>
        </div>
      </div>
      <Today />
      <Map />
      <Cert />
    </>
  );
}

export default Contents;
