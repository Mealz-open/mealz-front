import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function PrivateRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true);  // 토큰 검사 중 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem('accessToken');

    if (localToken) {
      // localStorage에 이미 토큰 있으면 로그인 상태로 처리
      setIsLoggedIn(true);
      setIsChecking(false);
    } else {
      // localStorage에 없으면 쿠키에서 읽어오기
      const cookieToken = Cookies.get('accessToken');
      if (cookieToken) {
        // 쿠키에 있으면 localStorage에 저장
        localStorage.setItem('accessToken', cookieToken);
        setIsLoggedIn(true);
      } else {
        // 쿠키에도 없으면 로그인 안된 상태
        setIsLoggedIn(false);
      }
      setIsChecking(false);
    }
  }, []);

  if (isChecking) {
    // 토큰 검사 중일 때는 빈 화면 또는 로딩 UI를 보여주기
    return null;
  }

  // 로그인 상태라면 자식 컴포넌트(Private 영역) 렌더링, 아니면 /login 리다이렉트
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;