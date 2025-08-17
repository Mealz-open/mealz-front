import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import CardMenu from "../asset/card-menu";
import TypeSlide from "../asset/type-slide";

function FoodType() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchParams] = useSearchParams();
  const foodType = searchParams.get("type");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부

  // 페이지 번호에 따라 데이터 불러오기 함수
  const fetchItems = useCallback(
    async (page) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          shopCategory: foodType || "",
          pageNumber: page,
          pageSize: 20,
          sortField: "CREATED_DATE",
          sortDirection: "DESC",
        });

        const res = await fetch(`${apiUrl}/api/item/filter?${params}`, {
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
          // 더 이상 데이터가 없으면
          setHasMore(false);
          if (page === 1) setProducts([]); // 첫 페이지 결과가 없으면 빈 배열로 초기화
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
    [apiUrl, foodType]
  );

  // foodType이 바뀌면 초기화 후 첫 페이지 불러오기
  useEffect(() => {
    setPageNumber(1);
    setHasMore(true);
    fetchItems(1);
  }, [foodType, fetchItems]);

  // pageNumber가 변경될 때마다 데이터를 추가로 불러옴 (1페이지는 위 useEffect에서 처리)
  useEffect(() => {
    if (pageNumber === 1) return; // 이미 첫 페이지는 로드됨
    fetchItems(pageNumber);
  }, [pageNumber, fetchItems]);

  // 스크롤 이벤트 핸들러: 스크롤이 거의 바닥에 도달하면 pageNumber 증가
  useEffect(() => {
    if (loading || !hasMore) return;

    function handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      // 바닥에서 100px 이내 도달 시 추가 데이터 로드
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setPageNumber((prevPage) => prevPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="article">
      <TypeSlide />
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
        {!loading && !error && products.length === 0 && <p>해당 카테고리에 물품이 없습니다.</p>}
        {!hasMore && products.length > 0 && <p>불러올 항목이 더 이상 없습니다.</p>}
      </div>
    </div>
  );
}

export default FoodType;