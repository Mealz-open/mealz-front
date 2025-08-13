import React, { useState } from "react";
import CustomCallender from '../asset/callender.js';
import Timeselector from '../asset/timeselecor.js';
import { ReactComponent as PictureIcon } from "../asset/icon/icon-picture.svg";

function Register({ shopId }) {
    // 물품 이름 상태
    const [itemName, setItemName] = useState('');
    // 수량 상태 (기본값 1)
    const [quantity, setQuantity] = useState(1);
    // 소비기한 날짜 상태
    const [expiredDate, setExpiredDate] = useState();
    // 픽업 날짜 상태
    const [pickupDate, setPickupDate] = useState();
    // 픽업 시작 시간 상태
    const [startTime, setStartTime] = useState();
    // 픽업 종료 시간 상태
    const [endTime, setEndTime] = useState();
    // 첨부한 이미지 파일과 미리보기 URL을 저장하는 상태
    const [images, setImages] = useState([]);

    // 이미지 파일 선택 시 실행되는 함수
    const handleImageChange = (e) => {
        const files = e.target.files;
        if (!files) return;

        // 선택된 파일을 배열로 변환하며 미리보기 URL 생성
        const fileArray = Array.from(files).map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        // 기존 이미지 배열에 새 이미지 추가
        setImages(prevImages => [...prevImages, ...fileArray]);
    };

    // 숨겨진 파일 선택창을 클릭하도록 유도하는 함수
    const triggerFileInput = () => {
        document.getElementById('imageInput').click();
    };

    // 수량 증가
    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    // 수량 감소 (최소 1까지)
    const decrementQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    // 날짜와 시간을 합쳐서 ISO 형식(yyyy-MM-ddTHH:mm:ss)으로 변환하는 함수
    const combineDateAndTime = (date, time) => {
        if (!date || !time) return null;
        const dateObj = new Date(date);
        const [hours, minutes] = time.split(':').map(Number);
        dateObj.setHours(hours);
        dateObj.setMinutes(minutes);
        dateObj.setSeconds(0);
        dateObj.setMilliseconds(0);
        return dateObj.toISOString(); // ex) 2025-08-13T10:00:00.000Z
    };

    // 등록 버튼 클릭 시 실행되는 함수
    const handleSubmit = async () => {
        // 필수값 검증
        if (!itemName || quantity < 1 || !expiredDate || !pickupDate || !startTime || !endTime) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        // 날짜/시간을 ISO 형식 문자열로 변환
        const expiredDateISO = combineDateAndTime(expiredDate, "00:00") || new Date(expiredDate).toISOString();
        const pickupStartDateISO = combineDateAndTime(pickupDate, startTime);
        const pickupEndDateISO = combineDateAndTime(pickupDate, endTime);

        if (!pickupStartDateISO || !pickupEndDateISO) {
            alert('픽업 시작 및 종료 시간을 올바르게 선택해주세요.');
            return;
        }

        // FormData 생성 (multipart/form-data 전송용)
        const formData = new FormData();
        formData.append('shopId', shopId);                  // 매장 UUID
        formData.append('itemName', itemName);              // 물품 이름
        formData.append('quantity', quantity.toString());   // 수량
        formData.append('expiredDate', expiredDateISO);      // 소비기한
        formData.append('pickupStartDate', pickupStartDateISO); // 픽업 시작
        formData.append('pickupEndDate', pickupEndDateISO);     // 픽업 종료

        // 업로드할 이미지 파일 추가
        images.forEach(imgObj => {
            formData.append('itemImages', imgObj.file);
        });

        const apiBaseUrl = process.env.REACT_APP_API_URL || "";

        try {
            // API 요청
            const response = await fetch(`${apiBaseUrl}/api/item` , {
                method: 'POST',
                credentials: "include", // 쿠키 포함
                body: formData,
            });

            if (response.ok) {
                alert('물품이 성공적으로 등록되었습니다.');
                // 필요하다면 상태 초기화 가능
            } else {
                const errorText = await response.text();
                alert(`등록 실패: ${errorText}`);
            }
        } catch (error) {
            alert(`오류 발생: ${error.message}`);
        }
    };

    return (
        <div className="article gap50">
            {/* 물품 이름 입력 */}
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

            {/* 수량 조절 */}
            <div className="box-row group-align-std">
                <h3>수량</h3>
                <div className="box-row group-align-std" style={{ width: 120 }}>
                    <button className="btn-circle" onClick={decrementQuantity}>-</button>
                    <h3>{quantity}</h3>
                    <button className="btn-circle" onClick={incrementQuantity}>+</button>
                </div>
            </div>

            {/* 소비기한 선택 */}
            <div className="box-col gap5">
                <h3>유통/소비기한</h3>
                <CustomCallender
                    placeholder="소비기한을 선택해주세요"
                    date={expiredDate}
                    setDate={setExpiredDate}
                />
            </div>

            {/* 픽업 날짜 및 시간 설정 */}
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

            {/* 이미지 첨부 및 미리보기 */}
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

                <div
                    className="image-preview-container"
                    style={{ display: 'flex', gap: '10px' }}
                >
                    {images.map((imgObj, index) => (
                        <img
                            key={index}
                            src={imgObj.preview}
                            alt={`첨부사진${index + 1}`}
                            width={50}
                            height={50}
                            style={{ objectFit: 'cover', borderRadius: '5px' }}
                            border={'1px solid var(--color-monotone-3)'}
                        />
                    ))}
                </div>
            </div>

            {/* 등록 버튼 */}
            <button className='btn-fill btn-primary' onClick={handleSubmit} style={{ width: 353, position: 'absolute', bottom: 45 }}>
                등록하기
            </button>
        </div>
    );
}

export default Register;