import {Link, useLocation} from 'react-router-dom';

import { ReactComponent as HomeIcon } from './icon/icon-home.svg';
import { ReactComponent as SearchIcon } from './icon/icon-search.svg';
import { ReactComponent as LikeIcon } from './icon/icon-like.svg';
import { ReactComponent as ProfileIcon } from './icon/icon-profile.svg';

function GNB() {
  const location =useLocation();
  const pathname = location.pathname;

  return (
    <div>
      <ul id="gnb-mobile">
        <li>
          <Link to="/" className={`btn-gnb ${pathname === '/' ? 'active' : ''}`} id="btn-home">
            <HomeIcon className="icon-gnb" />
            <h6>홈</h6>
          </Link>
        </li>
        <li>
          <Link to="/search" className={`btn-gnb ${pathname === '/search' ? 'active' : ''}`} id="btn-search">
            <SearchIcon className="icon-gnb" />
            <h6>물품 검색</h6>
          </Link>
        </li>
        <li>
          <Link to="/like" className={`btn-gnb ${pathname === '/like' ? 'active' : ''}`} id="btn-like">
            <LikeIcon className="icon-gnb" />
            <h6>찜</h6>
          </Link>
        </li>
        <li>
          <Link to="/profile" className={`btn-gnb ${pathname === '/profile' ? 'active' : ''}`} id="btn-profile">
            <ProfileIcon className="icon-gnb" />
            <h6>마이페이지</h6>
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default GNB;