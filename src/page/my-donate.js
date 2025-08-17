import React, { useState, useEffect, useCallback } from "react";
import CardMenu from "../asset/card-menu.js";

function MyDonate() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [donatorId, setDonatorId] = useState(null);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 로그인 사용자 정보 불러오기 (memberId = donatorId)
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await fetch(`${apiUrl}/api/member`, { credentials: "include" });
        if (!res.ok) throw new Error("로그인된 사용자 정보 조회 실패");
        const data = await res.json();
        setDonatorId(data.memberId);
      } catch (e) {
        setError(e?.message ?? "회원 정보 불러오기 실패");
      }
    }
    fetchUserInfo();
  }, [apiUrl]);

  // 거래 내역 불러오기
  const fetchTrades = useCallback(
    async (page) => {
      if (!donatorId) return;
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          donatorId: donatorId,
          pageNumber: page,
          pageSize: 20,
          sortField: "CREATED_DATE",
          sortDirection: "DESC",
        });

        const res = await fetch(`${apiUrl}/api/trade?${params}`, { credentials: "include" });
        if (!res.ok) throw new Error("서버 통신 오류");

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error("서버가 JSON이 아닌 응답을 반환했습니다: " + text);
        }

        const data = await res.json();
        if (data.content.length === 0) {
          setHasMore(false);
          if (page === 1) setTrades([]);
        } else {
          if (page === 1) {
            setTrades(data.content);
          } else {
            setTrades((prev) => [...prev, ...data.content]);
          }
        }
      } catch (e) {
        setError(e?.message ?? "알 수 없는 에러");
        if (page === 1) setTrades([]);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, donatorId]
  );

  // donatorId 준비된 뒤, 첫 페이지 로딩
  useEffect(() => {
    if (!donatorId) return;
    setPageNumber(1);
    setHasMore(true);
    fetchTrades(1);
  }, [donatorId, fetchTrades]);

  // 페이지 이동 시 추가 데이터
  useEffect(() => {
    if (pageNumber === 1 || !donatorId) return;
    fetchTrades(pageNumber);
  }, [pageNumber, fetchTrades, donatorId]);

  // 스크롤 하단에서 추가 로딩
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
        {trades.map((trade) => (
          <CardMenu
            key={trade.tradeId}
            itemId={trade.itemId}
            itemName={trade.itemName}
            itemImageUrls={trade.itemImageUrls && trade.itemImageUrls[0]} // 실제 응답 필드에 따라 수정
            quantity={trade.tradeQuantity}
            expiredDate={trade.expiredDate}
            pickupStartTime={trade.pickupStartTime}
            pickupEndTime={trade.pickupEndTime}
            tradeStatus={trade.tradeStatus}
          />
        ))}
        {loading && <p>로딩 중입니다...</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {!loading && !error && trades.length === 0 && (
          <p>거래 내역이 없습니다.</p>
        )}
        {!hasMore && trades.length > 0 && <p>불러올 항목이 더 이상 없습니다.</p>}
      </div>
    </div>
  );
}

export default MyDonate;