import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import markerIcon from "leaflet/dist/images/marker-icon.png"

// 최대 경계 설정
const bounds = L.latLngBounds(
  [32.5, 123.5], // 남서 좌표 (제주 남서쪽)
  [39.0, 132.0] // 북동 좌표 (강원도 북동쪽)
)

function Map({ latitude, longitude }) {
  const position = [latitude, longitude] // 전달받은 위도/경도

  return (
    <div style={{ zIndex: 1 }}>
      <MapContainer
        center={position} // 중심 좌표
        zoom={8.0}
        zoomSnap={0.5}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        style={{ width: "353px", height: "160px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          maxZoom={20}
          minZoom={8.0}
        />
        {/* 전달받은 좌표에만 마커 표시 */}
        <Marker
          position={position}
          icon={L.icon({ iconUrl: markerIcon })}
        />
      </MapContainer>
    </div>
  )
}

export default Map