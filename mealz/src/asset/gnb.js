import { ReactComponent as HomeIcon } from './icon/icon-home.svg';
import { ReactComponent as SearchIcon } from './icon/icon-search.svg';
import { ReactComponent as LikeIcon } from './icon/icon-like.svg';
import { ReactComponent as ProfileIcon } from './icon/icon-profile.svg';

function GNB() {
  return (
    <div>
      <ul id="gnb-mobile">
        <li>
          <button className="btn-gnb" id="btn-home">
            <HomeIcon className="icon-gnb" />
            <h6>홈</h6>
          </button>
        </li>
        <li>
          <button className="btn-gnb" id="btn-search">
            <SearchIcon className="icon-gnb" />
            <h6>물품 검색</h6>
          </button>
        </li>
        <li>
          <button className="btn-gnb" id="btn-like">
            <LikeIcon className="icon-gnb" />
            <h6>찜v</h6>
          </button>
        </li>
        <li>
          <button className="btn-gnb" id="btn-profile">
            <ProfileIcon className="icon-gnb" />
            <h6>마이페이지</h6>
          </button>
        </li>
      </ul>
    </div>
  );
}
export default GNB;