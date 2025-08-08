import React from 'react';
import { useNavigate } from 'react-router-dom';

function msToHMS(ms) {
  if (ms < 0) return "마감";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function CardToday({ itemId, itemName, itemImageUrls, quantity, shopName, pickupEndTime }) {
  const navigate = useNavigate();
  const remainTime = new Date(pickupEndTime) - new Date();
  const formattedRemainTime = msToHMS(remainTime);

  return (
    <div className="box-col" onClick={() => navigate(`/item?id=${itemId}&name=${itemName}`)}>
      <img src={itemImageUrls} className="slide-img" alt={itemName}/>
      <div className="slide-time">남은 시간: {formattedRemainTime}</div>
      <div className="slide-info">
        <h6>{shopName}</h6>
        <h5>{itemName} {quantity}개</h5>
      </div>
    </div>
  );
}

export default CardToday;