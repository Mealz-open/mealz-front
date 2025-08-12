import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardMenu from "../asset/card-menu";

function SearchResult() {
  // 활성 탭 상태
  const [activeTab, setActiveTab] = useState("list");

  // 환경변수 API URL
  const apiBaseUrl = process.env.REACT_APP_API_URL || "";

  // URL 파라미터에서 query 가져오기
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("query") || "";

  // 검색 결과 저장 (content 배열)
  const [items, setItems] = useState([]);

  // 페이지네이션 & 정렬 추가 (기본값)
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortField, setSortField] = useState("PICKUP_TIME"); // API 문서 기본값
  const [sortDirection, setSortDirection] = useState("ASC"); // API 문서 예시

  // API 호출 함수
  const fetchData = async () => {
    if (!keyword.trim()) {
      setItems([]);
      return;
    }

    try {
      // 문서 기준으로 item만 처리, 만약 shop Search가 필요하면 endpoint, body 변경 필요
      const endpoint = "/api/search/item";

      const body = {
        keyword,
        pageNumber,
        pageSize,
        sortField,
        sortDirection
      };

      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: "POST",
        credentials: "include", // 쿠키 포함
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();

      // 문서에 따라 content 배열만 세팅
      setItems(data.content || []);
    } catch (error) {
      console.error("API 호출 실패", error);
      setItems([]); // 실패시 빈 배열 처리
    }
  };

  // 의존성 배열에 page 파라미터, sort 등 포함
  useEffect(() => {
    fetchData();
  }, [activeTab, keyword, pageNumber, pageSize, sortField, sortDirection]);

  return (
    <div className="article">
      {/* 탭 버튼 */}
      <div
        className="btn-group group-align-left"
        style={{ margin: "0 0 10px 0" }}
      >
        <button
          className={`btn-simple ${activeTab === "list" ? "active" : ""}`}
          onClick={() => setActiveTab("list")}
        >
          <h4>메뉴 보기</h4>
        </button>
        <button
          className={`btn-simple ${activeTab === "map" ? "active" : ""}`}
          onClick={() => setActiveTab("map")}
        >
          <h4>가게 보기</h4>
        </button>
      </div>

      {/* 결과 표시 */}
      {activeTab === "list" ? (
        <div className="box-col gap10">
          {items.length > 0 ? (
            items.map((item, index) => (
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
      ) : (
        <div>
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={item.itemId || index} style={{ marginBottom: "10px" }}>
                <strong>{item.shopName || "상점명 없음"}</strong>
                <br />
                {item.siGunGu}, {item.eupMyeonDong}
              </div>
            ))
          ) : (
            <p>지도 결과가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResult;