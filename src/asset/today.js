import { useNavigate } from 'react-router-dom';

function Today() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/foodtype?type=오늘의 나눔');
  }
  return (
      <div className="article">
        <div className="article-title">
            <h3>오늘의 나눔</h3>
            <button onClick={handleClick}><h5>더보기</h5></button>
        </div>
        <div className="slide-container">
          <div className="box-col">
            <img src="/"  className="slide-img"/>
            <div className="slide-time"></div>
            <div className="slide-info">
                <h6>최현찬 베이커리</h6>
                <h5>바게트 3개</h5>
            </div>
          </div>
          <div className="box-col">
            <img src="/"  className="slide-img"/>
            <div className="slide-time"></div>
            <div className="slide-info">
                <h6>최현찬 베이커리</h6>
                <h5>바게트 3개</h5>
            </div>
          </div>
          <div className="box-col">
            <img src="/"  className="slide-img"/>
            <div className="slide-time"></div>
            <div className="slide-info">
                <h6>최현찬 베이커리</h6>
                <h5>바게트 3개</h5>
            </div>
          </div>
          <div className="box-col">
            <img src="/"  className="slide-img"/>
            <div className="slide-time"></div>
            <div className="slide-info">
                <h6>최현찬 베이커리</h6>
                <h5>바게트 3개</h5>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Today;
