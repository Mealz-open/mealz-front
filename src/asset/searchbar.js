import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as SearchIcon } from './icon/icon-search.svg';

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialKeyword = params.get("query") || "";

  const handleClick = () => {
    if (location.pathname !== '/search') {
      navigate('/search');
    }
  };

  const [keyword, setKeyword] = useState(initialKeyword);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
        navigate(`/searchresult?query=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div className="search-bar-container" onClick={handleClick}>
      <div className="search-bar">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="식품 및 가게 검색"
          readOnly={location.pathname !== '/search'}
          autoFocus={location.pathname === '/search'}
        />
        <SearchIcon className="icon-medium" />
      </div>
    </div>
  );
}

export default SearchBar;