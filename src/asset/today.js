import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CardToday from './card-today';

function Today() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/today');
  }

  const apiUrl = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // 추가: 로딩 상태
  const [error, setError] = useState(null); // 추가: 에러 메시지

  // KST 기준 오늘 날짜 (YYYY-MM-DD) 구하기 함수
  const getKSTDateString = () => {
    const now = new Date();
    // UTC 기준 밀리초 + 9시간 (한국 표준시)
    const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return koreaTime.toISOString().split('T')[0];
  };
  const today = getKSTDateString();

  useEffect(() => {
    let intervalId;

    async function fetchItems() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          date: today,
          pageNumber: 1,
          pageSize: 20,
          sortField: "PICKUP_TIME",
          sortDirection: "ASC",
        });

        const res = await fetch(`${apiUrl}/api/item/filter?${params}`, { credentials: "include" });
        if (!res.ok) throw new Error('서버 통신 오류');

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error("서버가 JSON이 아닌 응답을 반환했습니다: " + text);
        }

        const data = await res.json();
        setProducts(data.content || []);
      } catch (e) {
        setError(e?.message ?? "알 수 없는 에러");
        setProducts([]);
        clearInterval(intervalId); // 에러 시 인터벌 중지
      }

      setLoading(false);
    }

    fetchItems(); // 최초 호출
    intervalId = setInterval(fetchItems, 1000); // 1초마다 반복 호출

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  }, [today, apiUrl]); // today, apiUrl 변경 시 재실행

  return (
    <div className="article">
      <div className="article-title">
        <h3>오늘의 나눔</h3>
        <button onClick={handleClick}><h5>더보기</h5></button>
      </div>
      <div className="slide-container">
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p>해당 카테고리에 물품이 없습니다.</p>
        )}
        {products.map((product) => (
          <CardToday
            key={product.itemId}
            itemId={product.itemId}
            itemName={product.itemName}
            itemImageUrls={product.itemImageUrls && product.itemImageUrls[0]}
            quantity={product.quantity}
            shopName={product.shopName}
            pickupEndTime={product.pickupEndTime}
          />
        ))}
      </div>
    </div>
  );
}

export default Today;