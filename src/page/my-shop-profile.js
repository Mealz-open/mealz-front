import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CardShop from "../asset/card-shop";

function MyShopProfile() {
  const apiBaseUrl = process.env.REACT_APP_API_URL || "";
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 내 정보 + 내 매장 목록 조회
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. 내 정보 조회
      const meRes = await fetch(`${apiBaseUrl}/api/member`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      });
      if (!meRes.ok) {
        throw new Error(`회원 정보 조회 실패: ${meRes.status}`);
      }
      const meData = await meRes.json();
      const memberId = meData.memberId;
      console.log("로그인한 사용자 memberId:", memberId);
      if (!memberId) throw new Error("memberId를 찾을 수 없습니다.");

      // 2. 내 매장 목록 조회
      const shopRes = await fetch(`${apiBaseUrl}/api/shop/member/${memberId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      });
      if (!shopRes.ok) {
        throw new Error(`매장 목록 조회 실패: ${shopRes.status}`);
      }

      const shopData = await shopRes.json();
      setShops(shopData || []);
      setError(null);

    } catch (err) {
      console.error("API 호출 실패:", err);
      setError(err.message);
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="article gap10">
      {loading && <p>불러오는 중...</p>}
      {error && <p style={{ color: "red" }}>에러 발생: {error}</p>}

      <div className="box-col gap10">
        {!loading && shops.length > 0 ? (
          shops.map((shop) => (
            <CardShop
              key={shop.shopId}
              shopId={shop.shopId}
              shopName={shop.shopName}
              shopCategory={shop.shopCategory}
              profileUrl={shop.profileUrl}
              siDo={shop.siDo}
              siGunGu={shop.siGunGu}
              eupMyoenDong={shop.eupMyoenDong}
              ri={shop.ri}
              longitude={shop.longitude}
              latitude={shop.latitude}
              openTime={shop.openTime}
              closeTime={shop.closeTime}
            />
          ))
        ) : (
          !loading && <p></p>
        )}
      </div>
      <button className="btn-fill btn-primary" onClick={()=>navigate('/addmyshop')}>매장 추가하기</button>
    </div>
  );
}

export default MyShopProfile;