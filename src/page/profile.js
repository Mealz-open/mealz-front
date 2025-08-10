import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Chevron } from '../asset/icon/icon-chevron.svg';

function Profile() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(() => {
    fetch(`${apiUrl}/api/member`, {
      credentials: 'include', // 쿠키 자동 전송
    })
      .then(res => {
        if (!res.ok) throw new Error('API 응답 오류');
        return res.json();
      })
      .then(data => {
        setMember(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (!member) return <div>사용자 정보를 불러올 수 없습니다.</div>;

  return (
    <>
      <div className="box-profile">
        <img className="img-profile" src={member.profileUrl || ''}/>
        <h2>{member.memberType}</h2>
        <h4>
          {member.nickname ? `${member.nickname} (${member.name})` : member.name}
        </h4>
        <div className="btn-group">
          <div className="btn-catag-small">도시락</div>
          <div className="btn-catag-small">한식</div>
          <div className="btn-catag-small">음료</div>
        </div>
      </div>
      <div className="article">
        <div className="box-row gap10">
          <button className="btn-fill btn-line">내 기부 내역</button>
          <button className="btn-fill btn-line">ESG 레포트</button>
          <button className="btn-fill btn-line">매장 프로필</button>
        </div>
      </div>
      <div className="article">
        <div className="box-col gap10">
          <button className="btn-fill btn-line group-align-std" onClick={()=>navigate(`/editname`)}>
            이름
            <Chevron className="icon-large" style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button className="btn-fill btn-line group-align-std">
            위치 수정
            <Chevron className="icon-large" style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button className="btn-fill btn-line group-align-std">
            관심 카테고리
            <Chevron className="icon-large" style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button className="btn-fill btn-line group-align-std">
            회원 유형 추가
            <Chevron className="icon-large" style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      </div>
      <div className="article">
        <div className="box-col">
          <button className="btn-fill group-align-std">계정 정보</button><hr />
          <button className="btn-fill group-align-std">서비스 이용약관</button><hr />
          <button className="btn-fill group-align-std">개인정보 처리 방침</button><hr />
          <button className="btn-fill group-align-std">로그아웃</button>
        </div>
      </div>
    </>
  );
}

export default Profile;