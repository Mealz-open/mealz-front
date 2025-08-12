import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

function CardShop({ shopId, shopName, shopCategory, profileUrl, siDo, siGunGu, eupMyoenDong, ri, longitude, latitude, openTime, closeTime }) {  
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
                    <h3 style = {{overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left', flex: '0 1 auto'}}>{shopName}</h3>
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

