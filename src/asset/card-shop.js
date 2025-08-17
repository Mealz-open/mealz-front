import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

import { ReactComponent as Gold } from '../asset/icon/icon-gold.svg';
import { ReactComponent as Silver } from '../asset/icon/icon-silver.svg';
import { ReactComponent as Bronze } from '../asset/icon/icon-bronze.svg';

function CardShop({ shopId, shopName, shopCategory, profileUrl, siDo, siGunGu, eupMyoenDong, ri, longitude, latitude, openTime, closeTime, donateCount }) {  
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_KAKAO_KEY;
    const [loading, error] = useKakaoLoader({appkey: apiUrl,});

    return(
        <button className="card-col" onClick={()=>navigate(`/shop?id=${shopId}&name=${shopName}`)}>
            {/*
            <Map center= {{ lat: {latitude}, lng: {longitude} }} level= {3} className="map-container">
                <MapMarker position={{ lat: {latitude}, lng: {longitude} }}><div>{shopName}</div></MapMarker>
            </Map>
            */}
            <div className='box-row gap10'>
                <div className="box-col group-align-std" style={{ width:'213px' , height: '100%' }}>
                    <div className='box-row'>
                        {donateCount >= 30 && <Gold style={{ width: '20px', height: '22px' }} />}
                        {donateCount >= 20 && donateCount < 30 && <Silver style={{ width: '20px', height: '22px' }} />}
                        {donateCount >= 10 && donateCount < 20 && <Bronze style={{ width: '20px', height: '22px' }} />}
                        <h3 style = {{overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left', flex: '0 1 auto'}}>{shopName}</h3>
                    </div>
                    <div className="btn-group"><div className="btn-catag-small">{shopCategory}</div></div>
                    <h5>{siDo} {siGunGu} {eupMyoenDong} {ri}</h5>
                    <h5>{openTime} ~ {closeTime}</h5>
                </div>
                <img src={profileUrl} className="img-product" />
            </div>
        </button>
    );
}

export default CardShop;

