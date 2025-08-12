import React, { useState, useEffect } from "react";

function Search() {
  // 활성 탭 상태 (popular: 인기 검색어, recent: 최근 검색어)
  const [activeTab, setActiveTab] = useState("popular");
  // 검색어 리스트 상태
  const [searchTerms, setSearchTerms] = useState([]);
  // 에러 처리 상태
  const [error, setError] = useState(null);

  // API 기본 URL (환경변수 사용)
  const apiBaseUrl = process.env.REACT_APP_API_URL || "";

  // 인기 검색어 API 호출
  const fetchPopular = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/search/popular/keyword`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
      const data = await response.json();
      setSearchTerms(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSearchTerms([]);
    }
  };

  // 최근 검색어 API 호출
  const fetchRecent = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/search/recent/keyword`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
      const data = await response.json();
      setSearchTerms(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSearchTerms([]);
    }
  };

  // 활성 탭 변경 시 해당 API 호출
  useEffect(() => {
    if (activeTab === "popular") {
      fetchPopular();
    } else {
      fetchRecent();
    }
  }, [activeTab]);

  return (
    <div className="article">
      <div className="btn-group group-align-left" style={{margin: '0 0 10px 0'}}>
        <button className={`btn-simple ${activeTab === "popular" ? "active" : ""}`} onClick={() => setActiveTab("popular")}>
          <h5>인기 검색어</h5>
        </button>
        <button className={`btn-simple ${activeTab === "recent" ? "active" : ""}`} onClick={() => setActiveTab("recent")}>
          <h5>최근 검색어</h5>
        </button>
      </div>

      {error && <p style={{ color: "red" }}>에러 발생: {error}</p>}

      <ul>
        {searchTerms.length > 0 ? (
          searchTerms.map((term, index) => 
            <li key={index}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
              <p style={{height: 50, lineHeight: '50px'}}>{index + 1}</p>
              <p style={{height: 50, lineHeight: '50px'}}>{term}</p>
              </div>
              <hr/>
              </li>)
        ) : (
          <li>검색 결과가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default Search;