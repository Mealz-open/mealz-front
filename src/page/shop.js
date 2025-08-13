import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardMenu from "../asset/card-menu";
import Map from '../asset/map.js';

function Shop() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchParams] = useSearchParams();
  const shopId = searchParams.get("id");
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shopId) {
      setError("Shop ID is required");
      setLoading(false);
      return;
    }

    async function fetchShopAndItems() {
      try {
        setLoading(true);
        setError(null);

        // 매장 정보 조회
        const shopRes = await fetch(`${apiUrl}/api/shop/${shopId}`, { credentials: "include" });
        if (!shopRes.ok) throw new Error("Failed to fetch shop info");
        const shopData = await shopRes.json();
        setShop(shopData);

        // 해당 매장 아이템 조회
        const itemsRes = await fetch(`${apiUrl}/api/item?shopId=${shopId}`, { credentials: "include" });
        if (!itemsRes.ok) throw new Error("Failed to fetch items");
        const itemsData = await itemsRes.json();
        setItems(itemsData.content || []);

        setLoading(false);
      } catch (err) {
        setError(err.message || "Unknown error");
        setLoading(false);
      }
    }

    fetchShopAndItems();
  }, [shopId, apiUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!shop) return <div>No shop data found</div>;

  return (
    <div className="article">
      <div className="box-col gap30">
        <img src={shop.shopImageUrl} className="img-shop-large" alt={shop.shopName}/>
        <div>
          <h3 style={{color: 'var(--color-primary-1)'}}>지금까지 {shop.donateCount}번 나눔했어요!</h3>
          <h1>{shop.shopName}</h1>
          <h4>매장 소개 문구</h4>
        </div>
        <div className="box-col gap10">
          {items.length > 0 ? (
            items.map((item) => (
              <CardMenu
                key={item.itemId}
                itemId={item.itemId}
                itemName={item.itemName}
                itemImageUrls={item.itemImageUrls && item.itemImageUrls[0]}
                quantity={item.quantity}
                expiredDate={item.expiredDate}
                pickupStartTime={item.pickupStartTime}
                pickupEndTime={item.pickupEndTime}
              />
            ))
          ) : (
            <li>검색 결과가 없습니다.</li>
          )}
        </div>
        <div>
          <h2>가게 정보</h2>
          <h5>전화번호</h5>
          <p>{shop.shopPhoneNumber}</p>
          <h5>영업시간</h5>
          <p>{shop.openTime} ~ {shop.closeTime}</p>
          <Map latitude={shop.latitude} longitude={shop.longitude} />
          <h6>
            {shop.siDo} {shop.siGunGu} {shop.eupMyoenDong}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Shop;