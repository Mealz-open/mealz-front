import { useSearchParams } from 'react-router-dom';

import CardMenu from '../asset/card-menu.js';

const products = [
    {
        itemId: "1", 
        itemName: "비빔밥",
        itemImageUrls: "",
        shopCategory: "한식",
        shopName: "String",
        latitude: 37.123456,
        longitude: 127.123456,
        siDo: "String",
        siGunGu: "String",
        eupMyoenDong: "String",
        ri: "String",
        quantity: 1,
        expiredDate: "2025-08-05T15:30:00",
        pickupStartTime: "2025-08-05T16:00:00",
        pickupEndTime: "2025-08-05T18:00:00",
    },
    {
        itemId: "2",
        itemName: "바게트",
        itemImageUrls: "",
        shopCategory: "양식",
        shopName: "String",
        latitude: 37.123456,
        longitude: 127.123456,
        siDo: "String",
        siGunGu: "String",
        eupMyoenDong: "String",
        ri: "String",
        quantity: 1,
        expiredDate: "2025-08-05T15:30:00",
        pickupStartTime: "2025-08-05T16:00:00",
        pickupEndTime: "2025-08-05T18:00:00",
    },
];

function FoodType() {
  const [searchParams] = useSearchParams();
  const foodType = searchParams.get('type') || '한식';
  const filtered = products.filter((item) => item.shopCategory === foodType);

  return(
      <div class="article">
          <div class="box-col gap10">
            {filtered.map(product => (
            <CardMenu
                itemId={product.itemId}
                image={product.image}
                itemName={product.itemName}
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