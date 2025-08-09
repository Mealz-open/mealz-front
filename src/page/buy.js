import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ReactComponent as Chevron } from "../asset/icon/icon-chevron.svg";

function BUY() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchParams] = useSearchParams();
  const foodId = searchParams.get("id");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 수량 상태 관리
  const [buyQuantity, setBuyQuantity] = useState(1);

  const foodTypeKorean = {
    KOREAN: "한식",
    CHINESE: "중식",
    JAPANESE: "일식",
    WESTERN: "양식",
    ASIAN: "아시안",
    SNACK: "분식",
    FAST_FOOD: "패스트푸드",
    DESSERT: "디저트",
    BEVERAGE: "음료",
    SIDE_DISH: "반찬",
    ETC: "기타",
  };

  useEffect(() => {
    if (!foodId) return;
    setLoading(true);
    setError(null);

    fetch(`${apiUrl}/api/item/${foodId}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("서버 오류");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        // 재고보다 수량이 많아지는 경우 방지
        if (data?.quantity && buyQuantity > data.quantity) {
          setBuyQuantity(data.quantity);
        }
      })
      .catch(() => {
        setError("상품 정보를 불러올 수 없습니다.");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [foodId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>상품이 없습니다.</div>;

  const formattedExpiredDate = product.expiredDate
    ? new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(product.expiredDate))
    : "N/A";

  const remainDate = product.expiredDate
    ? Math.ceil(
        (new Date(product.expiredDate) - new Date()) /
          (1000 * 60 * 60 * 24)
      )
    : "N/A";

  const formattedPickupStartTime = product.pickupStartTime
    ? (() => {
        const date = new Date(product.pickupStartTime);
        const monthDay = new Intl.DateTimeFormat("ko-KR", {
          month: "numeric",
          day: "numeric",
        }).format(date);
        const time = new Intl.DateTimeFormat("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(date);
        return (
          monthDay.replace(".", "월").replace(".", "일").trim() + " " + time
        );
      })()
    : "N/A";

  const formattedPickupEndTime = product.pickupEndTime
    ? (() => {
        const date = new Date(product.pickupEndTime);
        const time = new Intl.DateTimeFormat("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(date);
        return time;
      })()
    : "N/A";

  return (
    <div className="article">
      <div className="box-col gap30">
        <div className="box-col gap10">
          <Link to="/store" className="box-row group-align-left" style={{ alignItems: "center" }}>
            <h3>{product.shopName}</h3>
            <Chevron className="icon-large" style={{ transform: "rotate(180deg)", width: 7, height: 14, }} />
          </Link>
          <div className="card-row">
            <div className="box-col group-align-std" style={{ width: "203px", height: "100%" }}>
              <h3 style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "left", flex: "0 1 auto", }}>{product.itemName}</h3>
              <h5>수량: {product.quantity}</h5>
              <h5>소비기한: {formattedExpiredDate}</h5>
              <h5>수령가능시간: {formattedPickupStartTime} -{" "}{formattedPickupEndTime}</h5>
            </div>

            {/* 수량 변경 버튼 */}
            <div className="box-row group-align-std">
              <button className="btn-circle" onClick={() => setBuyQuantity((q) => Math.max(1, q - 1))} disabled={buyQuantity <= 1}>-</button>
              <h3>{buyQuantity}</h3>
              <button className="btn-circle" onClick={() => setBuyQuantity((q) => Math.min(product.quantity, q + 1))} disabled={buyQuantity >= product.quantity}>+</button>
            </div>
          </div>
        </div>

        <div className="box-col">
          <h3>
            소비기한:
            <br />
            {formattedExpiredDate.replace(" ", "") + ` (남은 기한: ${remainDate}일)`}
            <br />
          </h3>
          <h4 style={{ color: "var(--color-monotone-3)" }}>
            ※ 소비기한이 임박했으므로 빠른 수령이 필요합니다.
          </h4>
        </div>

        <div className="box-col">
          <h3>위치</h3>
          <p>
            {product.siDo} {product.siGunGu} {product.eupMyoenDong}{" "}
            {product.ri}
          </p>
        </div>

        <div className="box-col">
          <h3>수령 가능 시간:</h3>
          <p>
            {product.pickupStartTime &&
              `${new Date(
                product.pickupStartTime
              ).toLocaleString("ko-KR")}`}{" "}
            ~{" "}
            {product.pickupEndTime &&
              `${new Date(
                product.pickupEndTime
              ).toLocaleString("ko-KR")}`}
          </p>
        </div>

        <div className="box-col">
          <h3>수령 방식:</h3>
          <p>
            현장 수령(선착순)<br/>
            예약 수령 가능<br/>
            수령 시 신분 확인 필요
          </p>
        </div>
      </div>
    </div>
  );
}

export default BUY;