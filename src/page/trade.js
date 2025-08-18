import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Map from "../asset/map.js";
import CardMenu from "../asset/card-menu.js";
import { ReactComponent as Chevron } from "../asset/icon/icon-chevron.svg";

function Trade() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchParams] = useSearchParams();
  const tradeId = searchParams.get("id");
  const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [member, setMember] = useState(null);
  const [memberLoading, setMemberLoading] = useState(true);

  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

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
    ETC: "기타"
  };

  // 거래 정보 불러오기
  useEffect(() => {
    if (!tradeId) return;
    setLoading(true);
    setError(null);

    fetch(`${apiUrl}/api/trade/${tradeId}`, { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("서버 오류");
        return res.json();
      })
      .then(data => setTrade(data))
      .catch(() => {
        setError("상품 정보를 불러올 수 없습니다.");
        setTrade(null);
      })
      .finally(() => setLoading(false));
  }, [tradeId, apiUrl]);

  // 회원 정보 불러오기
  useEffect(() => {
    setMemberLoading(true);
    fetch(`${apiUrl}/api/member`, { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("회원정보 로드 실패");
        return res.json();
      })
      .then(data => setMember(data))
      .catch(() => setMember(null))
      .finally(() => setMemberLoading(false));
  }, [apiUrl]);

  // 수령 완료 처리
  const handlePickupComplete = async () => {
    setProcessing(true);
    setSuccessMsg("");
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/api/trade/succeed`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tradeId)
      });
      if (!res.ok) throw new Error("수령 완료 처리에 실패했습니다.");
      setSuccessMsg("수령 완료 처리되었습니다!");
    } catch (err) {
      setError(err.message || "처리 중 오류가 발생했습니다.");
    } finally {
      setProcessing(false);
    }
  };

  // 날짜 및 시간 포맷
  const formattedPickupDate = trade?.pickupStartTime
    ? new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
        .format(new Date(trade.pickupStartTime))
    : "N/A";

  const formattedPickupStartTime = trade?.pickupStartTime
    ? new Intl.DateTimeFormat("ko-KR", { hour: "numeric", minute: "2-digit" })
        .format(new Date(trade.pickupStartTime))
    : "N/A";

  const formattedPickupEndTime = trade?.pickupEndTime
    ? new Intl.DateTimeFormat("ko-KR", { hour: "numeric", minute: "2-digit" })
        .format(new Date(trade.pickupEndTime))
    : "N/A";

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!trade) return <div>상품이 없습니다.</div>;

  return (
    <div className="article">
      <div className="box-col gap30">
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
        <div className="box-col">
          <h5 style={{ color: "var(--color-primary-1)" }}>수령 예정 시간</h5>
          <h3>
            {formattedPickupDate} {formattedPickupStartTime} ~ {formattedPickupEndTime}
          </h3>
        </div>
        <div className="box-col">
          <h5 style={{ color: "var(--color-primary-1)" }}>매장으로 찾아와주세요</h5>
          <Map latitude={trade.latitude} longitude={trade.longitude} />
        </div>
        <div className="box-col">
          <h5 style={{ color: "var(--color-primary-1)" }}>수혜자 정보</h5>
          <h3>{trade.beneficiaryNickname} ({trade.beneficiaryId})</h3>
        </div>
      </div>
      <div>
      <ul id="gnb-mobile">
        {memberLoading ? null : (
          member && member.memberType === "DONATOR" ? (
            trade.tradeStatus !== "SUCCEED" ? (
              !successMsg ? (
                <button
                  className="btn-fill btn-primary"
                  onClick={handlePickupComplete}
                  disabled={processing}
                >
                  {processing ? "처리 중..." : "수령 완료"}
                </button>
              ) : (
                <div style={{ color: "var(--color-primary-1)" }}>{successMsg}</div>
              )
            ) : (
              <div style={{ color: "var(--color-primary-1)" }}>이미 수령이 완료된 거래입니다.</div>
            )
          ) : (
            trade.tradeStatus !== "SUCCEED" ? (
                <button
                  className="btn-fill btn-primary"
                >
                  문의하기
                </button>
            ) : (
              <div style={{ color: "var(--color-primary-1)" }}>이미 수령이 완료된 거래입니다.</div>
            )
          )
        )}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </ul>
      </div>
    </div>
  );
}

export default Trade;
