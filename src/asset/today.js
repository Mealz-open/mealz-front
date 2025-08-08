import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CardToday from './card-today'

function Today() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/foodtype?type=오늘의 나눔');
  }

  const apiUrl = process.env.REACT_APP_API_URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // 추가: 로딩 상태
  const [error, setError] = useState(null); // 추가: 에러 메시지

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          pageNumber: 1,
          pageSize: 20,
          sortField: "CREATED_DATE",
          sortDirection: "DESC",
          pickupToday: true,
        });

        const res = await fetch(`${apiUrl}/api/item?${params}`,{ credentials: "include" });
        if (!res.ok) throw new Error('서버 통신 오류');

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(
            "서버가 JSON이 아닌 응답을 반환했습니다: " +
              text
          );
        }

        const data = await res.json();
        setProducts(data.content || []);
      } catch (e) {
        setError(e?.message ?? "알 수 없는 에러");
        setProducts([]); // 에러가 발생하면 목록은 비우기
      }
      setLoading(false);
    }

    fetchItems();
  }, []);


  return (
      <div className="article">
        <div className="article-title">
            <h3>오늘의 나눔</h3>
            <button onClick={handleClick}><h5>더보기</h5></button>
        </div>
        <div className="slide-container">
          {loading && <p>로딩 중입니다...</p>}
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
