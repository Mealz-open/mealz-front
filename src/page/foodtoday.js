import React, { useState, useEffect, useCallback } from "react";
import CardMenu from "../asset/card-menu";

function FoodToday() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 오늘 날짜 구하기 (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  const fetchItems = useCallback(
    async (page) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          date: today, // 오늘 날짜 필터 추가
          pageNumber: page,
          pageSize: 20,
          sortField: "PICKUP_TIME",
          sortDirection: "ASC",
        });

        const res = await fetch(`${apiUrl}/api/item?${params}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("서버 통신 오류");

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error("서버가 JSON이 아닌 응답을 반환했습니다: " + text);
        }

        const data = await res.json();

        if (data.content.length === 0) {
          setHasMore(false);
          if (page === 1) setProducts([]);
        } else {
          if (page === 1) {
            setProducts(data.content);
          } else {
            setProducts((prev) => [...prev, ...data.content]);
          }
        }
      } catch (e) {
        setError(e?.message ?? "알 수 없는 에러");
        if (page === 1) setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, today]
  );

  useEffect(() => {
    setPageNumber(1);
    setHasMore(true);
    fetchItems(1);
  }, [fetchItems]);

  useEffect(() => {
    if (pageNumber === 1) return;
    fetchItems(pageNumber);
  }, [pageNumber, fetchItems]);

  useEffect(() => {
    if (loading || !hasMore) return;

    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setPageNumber((prevPage) => prevPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="article">
      <div className="box-col gap10">
        {products.map((product) => (
          <CardMenu
            key={product.itemId}
            itemId={product.itemId}
            itemName={product.itemName}
            itemImageUrls={product.itemImageUrls && product.itemImageUrls[0]}
            quantity={product.quantity}
            expiredDate={product.expiredDate}
            pickupStartTime={product.pickupStartTime}
            pickupEndTime={product.pickupEndTime}
          />
        ))}

        {loading && <p>로딩 중입니다...</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {!loading && !error && products.length === 0 && <p>해당 카테고리에 오늘 날짜의 물품이 없습니다.</p>}
        {!hasMore && products.length > 0 && <p>불러올 항목이 더 이상 없습니다.</p>}
      </div>
    </div>
  );
}

export default FoodToday;