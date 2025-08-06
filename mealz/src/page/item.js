import { useSearchParams } from 'react-router-dom';

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
        expiredDate: "2025-08-12T15:30:00",
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
        expiredDate: "2025-08-10T15:30:00",
        pickupStartTime: "2025-08-05T16:00:00",
        pickupEndTime: "2025-08-05T18:00:00",
    },
];

function Item() {
    const [searchParams] = useSearchParams();
    const foodId = searchParams.get('id');
    const selected = products.filter((item) => item.itemId === foodId);

  return(
      <div class="article">
      {selected.map(product => {
        const formattedExpiredDate = product.expiredDate ? new Intl.DateTimeFormat('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(product.expiredDate)): 'N/A';
        const remainDate = Math.ceil((new Date(product.expiredDate) - new Date())/(1000*60*60*24));
        return (
            <div className='box-col gap30'>
            <img src={product.itemImageUrls} className='img-product-large' />
                <div className='box-col gap10'>
                    <h1>{product.itemName}</h1>
                    <div class="btn-catag-small">{product.shopCategory}</div>
                </div>
                <h3>
                    소비기한:<br/>
                    {formattedExpiredDate.replace(' ', '').replace(' ', '') + ` (남은 기한: ${remainDate}일)`}<br/>
                    ※ 소비기한이 임박했으므로 빠른 수령이 필요합니다.
                </h3>
                <div className='box-col'>
                    <h3>위치</h3>
                </div>
                <div className='box-col'>
                    <h3>수령 가능 시간:</h3>
                </div>
            </div>
        )
      })}
      </div>
  );
}

export default Item;