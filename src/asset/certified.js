import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardShop from "../asset/card-shop";

function Cert() {
  const [items, setItems] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_URL || "";

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/certifiedstores');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/shop/donate?donateCount=10`, {credentials: "include", });

        if (!response.ok) {throw new Error(`서버 오류: ${response.status}`);}

        const data = await response.json();

        setItems(data || []);
      } catch (error) {
        console.error("API 호출 실패", error);
        setItems([]); // 실패 시 빈 배열 처리
      }
    };

    fetchData();
  }, []);

  return (
    <div className="article">
      <div className="article-title">
          <h3>인증 배지 보유 매장</h3>
          <button onClick={handleClick}><h5>더보기</h5></button>
      </div>
      <div className="box-col gap10">
        {items.length > 0 ? (
          items.slice(0, 3).map((shop) => (
            <CardShop
              key={shop.shopId}
              shopId={shop.shopId}
              shopName={shop.shopName}
              shopCategory={shop.shopCategory}
              profileUrl = {shop.profileUrl}
              siDo={shop.siDo}
              siGunGu={shop.siGunGu}
              eupMyoenDong={shop.eupMyoenDong}
              ri={shop.ri}
              longitude = {shop.longitude}
              latitude = {shop.latitude}
              openTime={shop.openTime}
              closeTime={shop.closeTime}
              donateCount = {shop.donateCount}
            />
          ))
        ) : (
          <p>매장 검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Cert;