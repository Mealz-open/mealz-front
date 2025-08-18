import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as HomeIcon } from './icon/icon-home.svg';
import { ReactComponent as SearchIcon } from './icon/icon-search.svg';
import { ReactComponent as LikeIcon } from './icon/icon-like.svg';
import { ReactComponent as ProfileIcon } from './icon/icon-profile.svg';
import { ReactComponent as PencilIcon } from './icon/icon-pencil.svg';
import { ReactComponent as BookIcon } from './icon/icon-book.svg';

function GNB() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const pathname = location.pathname;
  const [memberType, setMemberType] = useState(null);

  useEffect(() => {
    async function fetchMemberType() {
      try {
        const response = await fetch(`${apiUrl}/api/member`, {credentials: "include"});
        const data = await response.json();
        setMemberType(data.memberType);
      } catch (error) {
        console.error('Failed to fetch memberType:', error);
      }
    }
    fetchMemberType();
  }, []);

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
          {memberType !== "DONATOR" && (
            <Link to="/search" className={`btn-gnb ${pathname === '/search' ? 'active' : ''}`} id="btn-search">
              <SearchIcon className="icon-gnb" />
              <h6>물품 검색</h6>
            </Link>
          )}
          {memberType === "DONATOR" && (
            <Link to="/register" className={`btn-gnb ${pathname === '/register' ? 'active' : ''}`} id="btn-register">
              <PencilIcon className="icon-gnb" />
              <h6>물품 등록</h6>
            </Link>
          )}
        </li>
        <li>
          {memberType !== "DONATOR" && (
            <Link to="/like" className={`btn-gnb ${pathname === '/like' ? 'active' : ''}`} id="btn-like">
              <LikeIcon className="icon-gnb" />
              <h6>찜</h6>
            </Link>
          )}
          {memberType === "DONATOR" && (
            <Link to="/mydonate" className={`btn-gnb ${pathname === '/pickup' ? 'active' : ''}`} id="btn-pickup">
              <BookIcon className="icon-gnb" />
              <h6>수령 조회</h6>
            </Link>
          )}
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
