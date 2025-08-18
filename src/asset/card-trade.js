import React from 'react';
import { useNavigate } from 'react-router-dom';

function CardTrade({ tradeId, itemName, itemImageUrls, quantity, expiredDate, pickupStartTime, pickupEndTime, tradeStatus }) {
  const formattedExpiredDate = expiredDate ? new Date(expiredDate).toLocaleDateString() : 'N/A';
  const formattedPickupStartTime = pickupStartTime ? (() => {
    const date = new Date(pickupStartTime);
    const monthDay = new Intl.DateTimeFormat('ko-KR', { month: 'numeric', day: 'numeric' }).format(date);
    const time = new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
    return monthDay.replace('.', '월').replace('.', '일').trim() + ' ' + time;
  })() : 'N/A';
  const formattedPickupEndTime = pickupEndTime ? (() => {
    const date = new Date(pickupEndTime);
    const time = new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
    return time;
  })() : 'N/A';

  const navigate = useNavigate();

  // 스타일 조건부 적용
  const buttonStyle = tradeStatus === "PENDING"
    ? { border: "2px solid var(--color-primary-1)" }
    : {};

  return(
    <button
      className="card-row"
      style={buttonStyle}
      onClick={() => navigate(`/trade?id=${tradeId}&name=${itemName}`)}
    >
      <div className="box-col group-align-std" style={{ width: '203px', height: '100%' }}>
        <h3 style={{overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left', flex: '0 1 auto'}}>{itemName}</h3>
        <h5>수량: {quantity}</h5>
        <h5>소비기한: {formattedExpiredDate}</h5>
        <h5>수령가능시간: {formattedPickupStartTime} - {formattedPickupEndTime}</h5>
      </div>
      <img src={itemImageUrls} className="img-product"/>
    </button>
  );
}

export default CardTrade;