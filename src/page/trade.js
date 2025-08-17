import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Map from '../asset/map.js';
import { ReactComponent as Chevron } from '../asset/icon/icon-chevron.svg';

function Trade() {
  const apiUrl = process.env.REACT_APP_API_URL
  const [searchParams] = useSearchParams();
  const foodId = searchParams.get('id');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const foodTypeKorean = {
    KOREAN: "한식",
    CHINESE: "중식",
    JAPANESE: "일식",
    WESTERN: "양식",
    ASIAN: "아시안",
    SNACK:"분식",
    FAST_FOOD: "패스트푸드",
    DESSERT: "디저트",
    BEVERAGE: "음료",
    SIDE_DISH: "반찬",
    ETC: "기타"
    }

  useEffect(() => {
    if (!foodId) return;
    setLoading(true);
    setError(null);

    fetch(`${apiUrl}/api/item/${foodId}`, { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("서버 오류");
        return res.json();
      })
      .then(data => {setProduct(data);})
      .catch(err => {
        setError("상품 정보를 불러올 수 없습니다.");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [foodId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>상품이 없습니다.</div>;

  const formattedExpiredDate = product.expiredDate
    ? new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .format(new Date(product.expiredDate))
    : 'N/A';
  
  const remainDate = product.expiredDate
    ? Math.ceil((new Date(product.expiredDate) - new Date()) / (1000 * 60 * 60 * 24))
    : 'N/A';

  return (
    <div className="article">
      <div className='box-col gap30'>
        <img src={product.itemImageUrls && product.itemImageUrls[0]} className='img-product-large' alt={product.itemName}/>
        <div className='box-col gap10'>
          <button onClick={()=>navigate(`/shop?id=${product.shopId}`)} className="box-row group-align-left" style={{alignItems: 'center'}}>
            <h3>{product.shopName}</h3>
            <Chevron className="icon-large" style={{ transform: 'rotate(180deg)', width: 7, height: 14 }} />
          </button>
          <h1>{product.itemName}</h1>
          <div className="btn-catag-small">
            {foodTypeKorean[product.shopCategory] || product.shopCategory}
          </div>
        </div>
        <div className='box-col'>
          <h3>
            소비기한:<br/>
            {formattedExpiredDate.replace(' ', '') + ` (남은 기한: ${remainDate}일)`}<br/>
          </h3>
          <h4 style={{ color: 'var(--color-monotone-3)' }}>
            ※ 소비기한이 임박했으므로 빠른 수령이 필요합니다.
          </h4>
        </div>
        <div className='box-col gap5'>
          <h3>위치</h3>
          <Map latitude={product.latitude} longitude={product.longitude} />
          <p>
            {product.siDo} {product.siGunGu} {product.eupMyoenDong} {product.ri}
          </p>
        </div>
        <div className='box-col'>
          <h3>수령 가능 시간:</h3>
          <p>
            {product.pickupStartTime && `${new Date(product.pickupStartTime).toLocaleString("ko-KR")}`} ~{" "}
            {product.pickupEndTime && `${new Date(product.pickupEndTime).toLocaleString("ko-KR")}`}
          </p>
        </div>
      </div>
      <div>
        <ul id="gnb-mobile">
          <button className = 'btn-fill btn-primary' onClick={() => navigate(`/buy?id=${foodId}`)}>신청하기</button>
        </ul>
      </div>
    </div>
  );
}

export default Trade;