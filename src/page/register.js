import React, { useState } from "react";
import CustomCallender from '../asset/callender.js';
import Timeselector from '../asset/timeselecor.js';

function Register() {
    const [expiredDate, setExpiredDate] = useState();
    const [pickupDate, setPickupDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    return(
        <div className="article gap20">
            <div className="box-col gap5">
                <h3>물품 이름</h3>
                <input className='input-under' type='text' placeholder="물품 이름을 입력해주세요"/>
            </div>
            <div className="box-row group-align-std">
                <h3>수량</h3>
                <div className="box-row group-align-std" style={{width:120}}>
                    <button className="btn-circle">-</button>
                    <h3>1</h3>
                    <button className="btn-circle">+</button>
                </div>
            </div>
            <div className="box-col gap5">
                <h3>유통/소비기한</h3>
                <CustomCallender 
                    placeholder="소비기한을 선택해주세요"
                    date={expiredDate}
                    setDate={setExpiredDate}
                />
            </div>
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
                    time = {startTime}
                    setTime = {setStartTime}
                />
                <Timeselector
                    index="종료 시간"
                    time = {endTime}
                    setTime = {setEndTime}
                />
                </div>
            </div>
            <div className="box-row gap10">
            </div>
        </div>
    )
}

export default Register;