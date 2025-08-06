import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardMenu from '../asset/card-menu.js';

function FoodType() {
  const [searchParams] = useSearchParams();
  const foodType = searchParams.get('type') || 'korean';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          shopCategory: foodType,
          pageNumber: 0,
          pageSize: 20,
          sortField: 'CREATED_DATE',
          sortDirection: 'DESC',
        });


        const res = await fetch(`http://13.209.241.224:8087/api/item?${params.toString()}`, { credentials: 'include' });
        if (!res.ok) throw new Error('서버 통신 오류');
        const data = await res.json();

        setProducts(data.content || []);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }

    fetchItems();
  }, [foodType]); // foodType이 바뀔 때마다 새로 요청

  if (loading) return <div style={{ padding: '32px' }}>로딩중...</div>;
  if (error) return <div style={{ padding: '32px', color: 'red' }}>에러: {error}</div>;

  return (
    <div className="article">
      <div className="box-col gap10">
        {products.length === 0 && <p>해당 카테고리에 물품이 없습니다.</p>}
        {products.map(product => (
          <CardMenu
            itemId={product.itemId}
            itemName={product.itemName}
            itemImageUrls={product.itemImageUrls && product.itemImageUrls[0]}
            quantity={product.quantity}
            expiredDate={product.expiredDate}
            pickupStartTime={product.pickupStartTime}
            pickupEndTime={product.pickupEndTime}
          />
        ))}
      </div>
    </div>
  );
}

export default FoodType;