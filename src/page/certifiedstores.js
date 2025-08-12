import React, { useState, useEffect } from "react";
import CardShop from "../asset/card-shop";

function CertifiedStores() {
  const [items, setItems] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/shop/donate`, {credentials: "include", });

        if (!response.ok) {throw new Error(`서버 오류: ${response.status}`);}

        const data = await response.json();

        // API에서 최대 30개의 업체를 반환
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
      <div className="box-col gap10">
        {items.length > 0 ? (
          items.map((shop) => (
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
            />
          ))
        ) : (
          <p>매장 검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default CertifiedStores;