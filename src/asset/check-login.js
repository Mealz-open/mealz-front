import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute() {
  const apiUrl = process.env.REACT_APP_API_URL
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${apiUrl}/api/member`, {
          credentials: "include",
        });

        if (res.ok) {
          // 응답이 정상적이면 로그인 상태로 간주
          setIsLoggedIn(true);
        } else {
          // 401, 403 등 인증 실패 시
          setIsLoggedIn(false);
        }
      } catch (e) {
        // 네트워크 오류 등 예외 발생 시 로그인 상태 아님으로 처리
        setIsLoggedIn(false);
      }
      setChecking(false);
    }
    checkAuth();
  }, []);

  if (checking) {
    // 인증 검사 중 로딩 UI 또는 null 처리
    return null;
  }

  // 인증 여부에 따른 페이지 이동
  return isLoggedIn ? '' : (<Navigate to="/login" replace />);
}

export default PrivateRoute;