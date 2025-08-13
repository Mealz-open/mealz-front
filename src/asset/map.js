import { MapContainer, TileLayer } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
// 초기 중심 위치 설정
const position = [36.17, 127.83]
// 최대 경계 설정
const bounds = L.latLngBounds(
  [32.5, 123.5], // 남서 좌표 (제주 남서쪽)
  [39.0, 132.0] // 북동 좌표 (강원도 북동쪽)
)
function App() {
  return (
    <div>
      <MapContainer
        center={position} // 초기 중심 좌표
        zoom={8.0} // 초기 줌 레벨
        zoomSnap={0.5} // 줌 레벨 스냅
        maxBounds={bounds} // 최대 경계 설정
        maxBoundsViscosity={1.0} // 경계의 견고 정도 제어 (1.0일 경우 완전히 견고해져 경계 밖으로 드래그 불가)
        style={{ width: "353px", height: "160px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          maxZoom={20} // 최대 줌 레벨
          minZoom={8.0} // 최소 줌 레벨
        />
      </MapContainer>
    </div>
  )
}
export default App