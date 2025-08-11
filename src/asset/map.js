import React, { useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

function KakaoMap() {
  const apiUrl = process.env.REACT_APP_KAKAO_KEY;
  const [loading, error] = useKakaoLoader({appkey: apiUrl,});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
      <div className="article">
        <div className="article-title">
            <h3>주변 나눔 매장</h3>
            <button><h5>더보기</h5></button>
        </div>
        <Map center= {{ lat: 37.5665, lng: 126.9780 }} level= {3} className="map-container">
          <MapMarker position={{ lat: 37.5665, lng: 126.9780 }}><div>서울</div></MapMarker>
        </Map>
      </div>
  );
}

export default KakaoMap;
