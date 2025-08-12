import React from 'react';
import { useNavigate } from 'react-router-dom';

function CardStore({ shopId, shopName, nickname, shopCategory, siDo, siGunGu, eupMyoenDong, ri, openTime, closeTime }) {  
    const navigate = useNavigate();

    return(
        <button className="card-col" onClick={()=>navigate(`/shop?id=${shopId}&name=${shopName}`)}>
            <img className="map-container"/>
            <div className='box-row'>
                <div className="box-col group-align-std" style={{ width:'203px' , height: '100%' }}>
                    <h3 style = {{overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left', flex: '0 1 auto'}}>{nickname}</h3>
                    <div className="btn-group"><div className="btn-catag-small">{shopCategory}</div></div>
                    <h5>{siDo} {siGunGu} {eupMyoenDong} {ri}</h5>
                    <h5>{openTime} ~ {closeTime}</h5>
                </div>
                <img className="img-product" />
            </div>
        </button>
    );
}

export default CardStore;

