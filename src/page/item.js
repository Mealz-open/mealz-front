import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Item() {
  const apiUrl = process.env.REACT_APP_API_URL
  const [searchParams] = useSearchParams();
  const foodId = searchParams.get('id');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <img
          src={product.itemImageUrls && product.itemImageUrls[0]}
          className='img-product-large'
          alt={product.itemName}
        />
        <div className='box-col gap10'>
          <h1>{product.itemName}</h1>
          <div className="btn-catag-small">{product.shopCategory}</div>
        </div>
        <h3>
          소비기한:<br/>
          {formattedExpiredDate.replace(' ', '') + ` (남은 기한: ${remainDate}일)`}<br/>
          ※ 소비기한이 임박했으므로 빠른 수령이 필요합니다.
        </h3>
        <div className='box-col'>
          <h3>위치</h3>
          <p>
            {product.siDo} {product.siGunGu} {product.eupMyoenDong} {product.ri}
            <br />
            {product.shopName}
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
    </div>
  );
}

export default Item;