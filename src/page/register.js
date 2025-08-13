import React, { useState, useEffect } from "react";
import CustomCallender from '../asset/callender.js';
import Timeselector from '../asset/timeselecor.js';
import { ReactComponent as PictureIcon } from "../asset/icon/icon-picture.svg";
import { ReactComponent as ChevronIcon } from "../asset/icon/icon-chevron.svg";

function Register() {
    const apiBaseUrl = process.env.REACT_APP_API_URL || "";

    // 매장 관련 상태
    const [shops, setShops] = useState([]);
    const [selectedShopId, setSelectedShopId] = useState("");

    // 물품 관련 상태
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [expiredDate, setExpiredDate] = useState();
    const [pickupDate, setPickupDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [images, setImages] = useState([]);

    // 매장 목록 불러오기
    useEffect(() => {
        const fetchShops = async () => {
            try {
                // 1. 내 정보 조회 → memberId 가져오기
                const meRes = await fetch(`${apiBaseUrl}/api/member`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    credentials: "include",
                });
                if (!meRes.ok) throw new Error("회원 정보 조회 실패");
                const meData = await meRes.json();
                if (!meData.memberId) throw new Error("memberId를 찾을 수 없습니다.");

                // 2. 내 매장 목록 조회
                const shopRes = await fetch(`${apiBaseUrl}/api/shop/member/${meData.memberId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    credentials: "include",
                });
                if (!shopRes.ok) throw new Error("매장 목록 조회 실패");

                const shopData = await shopRes.json();
                setShops(shopData || []);

                // 기본 선택값 첫 번째 매장
                if (shopData.length > 0) {
                    setSelectedShopId(shopData[0].shopId);
                }
            } catch (err) {
                console.error(err);
                alert(`매장 정보를 불러오지 못했습니다: ${err.message}`);
            }
        };

        fetchShops();
    }, [apiBaseUrl]);

    // 이미지 파일 선택
    const handleImageChange = (e) => {
        const files = e.target.files;
        if (!files) return;
        const fileArray = Array.from(files).map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages(prevImages => [...prevImages, ...fileArray]);
    };

    const triggerFileInput = () => {
        document.getElementById('imageInput').click();
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    const toLocalDateTimeString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
      };

    const combineDateAndTime = (date, time) => {
        if (!date || !time) return null;
      
        const { ampm, hour, minute } = time;
        const dateObj = new Date(date);
      
        // 12시간제를 24시간제로 변환
        let hour24 = hour % 12;
        if (ampm === '오후') hour24 += 12;
      
        dateObj.setHours(hour24);
        dateObj.setMinutes(minute);
        dateObj.setSeconds(0);
        dateObj.setMilliseconds(0);
      
        return toLocalDateTimeString(dateObj);
      };

    const handleSubmit = async () => {
        if (!selectedShopId || !itemName || quantity < 1 || !expiredDate || !pickupDate || !startTime || !endTime) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        const expiredDateISO = expiredDate;
        const pickupStartDateISO = combineDateAndTime(pickupDate, startTime);
        const pickupEndDateISO = combineDateAndTime(pickupDate, endTime);
        if (!pickupStartDateISO || !pickupEndDateISO) {
            alert('픽업 시작 및 종료 시간을 올바르게 선택해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('shopId', selectedShopId);
        formData.append('itemName', itemName);
        formData.append('quantity', quantity.toString());
        formData.append('expiredDate', expiredDateISO);
        formData.append('pickupStartDate', pickupStartDateISO);
        formData.append('pickupEndDate', pickupEndDateISO);

        images.forEach(imgObj => {
            formData.append('itemImages', imgObj.file);
        });

        try {
            const response = await fetch(`${apiBaseUrl}/api/item`, {
                method: 'POST',
                credentials: "include",
                body: formData,
            });

            if (response.ok) {
                alert('물품이 성공적으로 등록되었습니다.');
                // 폼 초기화
                setItemName('');
                setQuantity(1);
                setExpiredDate(null);
                setPickupDate(null);
                setStartTime(null);
                setEndTime(null);
                setImages([]);
            } else {
                const errorText = await response.text();
                alert(`등록 실패: ${errorText}`);
            }
        } catch (error) {
            alert(`오류 발생: ${error.message}`);
        }
    };

    return (
        <div className="article gap30">
            {/* 매장 선택 */}
            <div className="box-col gap5" style={{ position: 'relative' }}>
                <h3>매장 선택</h3>
                <select
                    className="input-box"
                    value={selectedShopId}
                    onChange={(e) => setSelectedShopId(e.target.value)}
                    style={{
                    appearance: 'none',         // hide default arrow
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    paddingRight: '30px',      // space for custom arrow
                    }}
                >
                    {shops.map((shop) => (
                    <option key={shop.shopId} value={shop.shopId}>
                        {shop.shopName}
                    </option>
                    ))}
                </select>

                <ChevronIcon
                    style={{
                    width: '16px',height: '16px',
                    position: 'absolute',right: '7px',top: '52px',transform: 'translateY(-50%) rotate(270deg)',
                    pointerEvents: 'none', // allows clicks through the icon
                    }}
                />
            </div>

            {/* 물품 이름 */}
            <div className="box-col gap5">
                <h3>물품 이름</h3>
                <input
                    className='input-under'
                    type='text'
                    placeholder="물품 이름을 입력해주세요"
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                />
            </div>

            {/* 수량 */}
            <div className="box-row group-align-std">
                <h3>수량</h3>
                <div className="box-row group-align-std" style={{ width: 120 }}>
                    <button className="btn-circle" onClick={decrementQuantity}>-</button>
                    <h3>{quantity}</h3>
                    <button className="btn-circle" onClick={incrementQuantity}>+</button>
                </div>
            </div>

            {/* 소비기한 */}
            <div className="box-col gap5">
                <h3>유통/소비기한</h3>
                <CustomCallender
                    placeholder="소비기한을 선택해주세요"
                    date={expiredDate}
                    setDate={setExpiredDate}
                />
            </div>

            {/* 픽업 시간 설정 */}
            <div className="box-col gap5">
                <h3>픽업 시간 설정</h3>
                <CustomCallender
                    placeholder="픽업 날짜를 선택해주세요"
                    date={pickupDate}
                    setDate={setPickupDate}
                />
                <div className="box-row gap5">
                    <Timeselector
                        index="시작 시간"
                        time={startTime}
                        setTime={setStartTime}
                    />
                    <Timeselector
                        index="종료 시간"
                        time={endTime}
                        setTime={setEndTime}
                    />
                </div>
            </div>

            {/* 이미지 첨부 */}
            <div className="box-row gap10" style={{ overflow: 'scroll' }}>
                <button
                    className='btn-sqr btn-dash'
                    style={{ width: 50, height: 50 }}
                    onClick={triggerFileInput}
                >
                    <PictureIcon style={{ width: 24, height: 24 }} />
                </button>

                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />

                <div className="image-preview-container" style={{ display: 'flex', gap: '10px' }}>
                    {images.map((imgObj, index) => (
                        <img
                            key={index}
                            src={imgObj.preview}
                            alt={`첨부사진${index + 1}`}
                            width={50}
                            height={50}
                            style={{ objectFit: 'cover', borderRadius: '5px', border: '1px solid var(--color-monotone-3)' }}
                        />
                    ))}
                </div>
            </div>

            {/* 등록 버튼 */}
            <button
                className='btn-fill btn-primary'
                onClick={handleSubmit}
                style={{ width: 353, position: 'absolute', bottom: 45 }}
            >
                등록하기
            </button>
        </div>
    );
}

export default Register;