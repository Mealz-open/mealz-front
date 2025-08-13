import React from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

function KakaoMap() {
  const [loading, error] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_KEY });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Kakao SDK!</div>;

  // SDK가 반드시 먼저 로드되어, 이후 Map 컴포넌트 렌더링
  return (
    <Map center={{ lat: 37.5665, lng: 126.9780 }} level={3} style={{ width: 353, height: 160 }}>
      <MapMarker position={{ lat: 37.5665, lng: 126.9780 }}>서울</MapMarker>
    </Map>
  );
}