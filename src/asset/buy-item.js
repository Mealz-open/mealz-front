import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

function BuyItem() {
    const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const foodId = searchParams.get("id");


  return (
    <div>
      <ul id="gnb-mobile">
        <button className = 'btn-fill btn-primary' onClick={() => navigate(`/buy?id=${foodId}`)}>신청하기</button>
      </ul>
    </div>
  );
}
export default BuyItem;