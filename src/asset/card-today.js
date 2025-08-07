import React from 'react';
import { useNavigate } from 'react-router-dom';

function CardToday({ itemId, itemName, itemImageUrls, quantity, shopName }) {
    const remainTime = Math.ceil(new Date(product.pickupEndTime) - new Date());
    const formattedRemainTime = remainTime ? new Intl.DateTimeFormat('ko-KR', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(remainTime)): 'N/A';
    

    const navigate = useNavigate();

    return(
        <div className="box-col" onClick={()=>navigate(`/item?id=${itemId}&name=${itemName}`)}>
          <img src={itemImageUrls}  className="slide-img"/>
          <div className="slide-time">{formattedRemainTime}</div>
          <div className="slide-info">
              <h6>{shopName}</h6>
              <h5>{itemName} {quantity}개</h5>
          </div>
        </div>
    );
}

export default CardToday;

