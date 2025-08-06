import { useNavigate } from 'react-router-dom';

function NanumType() {
  const navigate = useNavigate();

  return (
      <div className="article">
        <div className="article-title"><h3>나눔식품</h3></div>
        <div className="btn-grid">
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=한식')}><h5>한식</h5></button>
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=중식')}><h5>중식</h5></button>
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=일식')}><h5>일식</h5></button>
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=양식')}><h5>양식</h5></button>
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=아시안')}><h5>아시안</h5></button>
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=분식')}><h5>분식</h5></button>
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=패스트푸드')}><h5>패스트푸드</h5></button>
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=디저트')}><h5>디저트</h5></button>
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=음료')}><h5>음료</h5></button>
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=반찬')}><h5>반찬</h5></button>
          <button className="btn-rtg btn-line" onClick={()=> navigate('/foodtype?type=기타')}><h5>기타</h5></button>
        </div>
      </div>
  );
}

export default NanumType;
