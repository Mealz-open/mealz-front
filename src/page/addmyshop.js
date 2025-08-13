import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CustomCallender from '../asset/callender.js';
import Timeselector from '../asset/timeselecor.js';
import { ReactComponent as PictureIcon } from "../asset/icon/icon-picture.svg";

const shopCategories = [
  { value: "WESTERN", label: "양식" },
  { value: "KOREAN", label: "한식" },
  { value: "CHINESE", label: "중식" },
  { value: "JAPANESE", label: "일식" },
  { value: "ASIAN", label: "아시안" },
  { value: "SNACK", label: "분식" },
  { value: "FAST_FOOD", label: "패스트푸드" },
  { value: "DESSERT", label: "디저트" },
  { value: "BEVERAGE", label: "음료" },
  { value: "SIDE_DISH", label: "반찬" },
  { value: "ETC", label: "기타" }
];

function AddShop() {
  const [shopName, setShopName] = useState('');
  const [shopCategory, setShopCategory] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopPhoneNumber, setShopPhoneNumber] = useState('');
  const [openTime, setOpenTime] = useState('00:00');
  const [closeTime, setCloseTime] = useState('00:00');
  const [shopImage, setShopImage] = useState(null);

  // 위치 정보, 예시 - 실제 좌표 기입 및 입력 UI 필요
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [siDo, setSiDo] = useState('');
  const [siGunGu, setSiGunGu] = useState('');
  const [eupMyoenDong, setEupMyoenDong] = useState('');
  const [ri, setRi] = useState('');

  // 이미지 업로드 핸들러
  const handleImageChange = (e) => {
    setShopImage(e.target.files[0]);
  };

  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_URL || "";

  // 예시: Timeselector가 { hour: '14', minute: '30' }를 반환한다면
  const formatTime = (timeObj) => {
    if (typeof timeObj === "string") return timeObj;
    if (!timeObj || !timeObj.hour || !timeObj.minute) return "";
    return `${String(timeObj.hour).padStart(2, '0')}:${String(timeObj.minute).padStart(2, '0')}`;
  };

  // 등록 버튼 핸들러 (fetch 사용)
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('shopName', shopName);
    formData.append('shopCategory', shopCategory);
    formData.append('shopDescription', shopDescription);
    formData.append('shopPhoneNumber', shopPhoneNumber);
    if (shopImage) {formData.append('shopImage', shopImage);}
    // latitude, longitude는 숫자 스트링이어야 함
    formData.append('latitude', latitude ? latitude.toString() : 38.9);
    formData.append('longitude', longitude ? longitude.toString() : 124.5);
    formData.append('siDo', siDo);
    formData.append('siGunGu', siGunGu);
    formData.append('eupMyoenDong', eupMyoenDong);
    formData.append('ri', ri);
    // openTime, closeTime을 string 포맷으로 변환
    formData.append('openTime', typeof openTime === "string" ? openTime : formatTime(openTime));
    formData.append('closeTime', typeof closeTime === "string" ? closeTime : formatTime(closeTime));


    try {
      const response = await fetch(`${apiBaseUrl}/api/shop`, {
        method: 'POST',
        body: formData,
        credentials: 'include', // 여기 추가!
        // 헤더는 FormData일 때 Content-Type 자동 지정됨
      });

      if (response.ok) {
        alert('매장 등록 완료!');
        navigate('/myshopprofile'); // ← 여기가 리다이렉트!
      } else {
        const errorText = await response.text();
        alert('매장 등록 실패: ' + errorText);
      }
    } catch (error) {
      alert('매장 등록 실패: ' + error.message);
    }
  };

  return (
    <div className="article gap20">
      <div className="box-col gap5">
        <h3>매장 이름</h3>
        <input
          className='input-under'
          type='text'
          placeholder="매장 이름"
          value={shopName}
          onChange={e => setShopName(e.target.value)}
        />
      </div>
      <div className="box-col gap5">
        <h3>매장 소개</h3>
        <input
          className='input-under'
          type='text'
          placeholder="매장 소개를 입력해주세요"
          value={shopDescription}
          onChange={e => setShopDescription(e.target.value)}
        />
      </div>
      <div className="box-col gap5">
        <h3>매장 카테고리</h3>
        <select className="btn-fill btn-line" value={shopCategory} onChange={e => setShopCategory(e.target.value)}>
          <option value="">선택하세요</option>
          {shopCategories.map(c =>
            <option value={c.value} key={c.value}>{c.label}</option>
          )}
        </select>
      </div>
      <div className="box-col gap5">
          <h3>매장 위치</h3>
          <div className="box-row gap5">
            <input
                className="input-box"
                type='text'
                calue={siDo}
                onChange={e => setSiDo(e.target.value)}
                placeholder="시/도"
            />
            <input
                className="input-box"
                type='text'
                calue={siGunGu}
                onChange={e => setSiGunGu(e.target.value)}
                placeholder="시/군/구"
            />
          </div>
          <div className="box-row gap5">
            <input
                className="input-box"
                type='text'
                calue={eupMyoenDong}
                onChange={e => setEupMyoenDong(e.target.value)}
                placeholder="읍/면/동"
            />
            <input
                className="input-box"
                type='text'
                calue={ri}
                onChange={e => setRi(e.target.value)}
                placeholder="상세주소"
            />
          </div>
      </div>
      <div className="box-col gap5">
        <h3>전화번호</h3>
        <input
          className='input-under'
          type='text'
          placeholder="전화번호 입력"
          value={shopPhoneNumber}
          onChange={e => setShopPhoneNumber(e.target.value)}
        />
      </div>
      <div className="box-col gap10">
        <h3>영업시간</h3>
        <div className="box-row gap5">
            <Timeselector
                index="오픈 시간"
                time={openTime}
                setTime={setOpenTime}
            />
            <Timeselector
                index="마감 시간"
                time={closeTime}
                setTime={setCloseTime}
            />
        </div>
      </div>
      <div className="box-row gap10" style={{ overflow: 'scroll', alignItems: 'center' }}>
        <button
            className='btn-sqr btn-dash'
            style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={() => document.getElementById('shop-image').click()}
            type="button"
        >
            <PictureIcon style={{ width: 24, height: 24 }} />
        </button>
        <input
            id="shop-image"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
        />

        {shopImage && (
            <img
            src={URL.createObjectURL(shopImage)}
            alt="사진 미리보기"
            width={50}
            height={50}
            style={{
                objectFit: 'cover',
                borderRadius: '5px',
                border: '1px solid var(--color-monotone-3)'
            }}
            />
        )}
      </div>
      <button className="btn-fill btn-primary" onClick={handleSubmit}>등록하기</button>
    </div>
  );
}

export default AddShop;