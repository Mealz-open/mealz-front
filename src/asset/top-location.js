import React, { useEffect, useState } from 'react';
import { ReactComponent as AlertIcon } from './icon/icon-alert.svg';

function TOPLocation() {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL

    const userTypeKorean = {
        BENEFICIARY: "수혜자",
        DONATOR: "기부자",
      }

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
    if (!member) return <div className="top"><h1>사용자 로그인이 필요합니다</h1></div>;

    return(
        <div className="top">
            <h1>서울시 종로구</h1>
            <div className="group-align-left hug">
                <AlertIcon className="icon-large" />
                <div className='btn-catag-small'>{userTypeKorean[member.memberType]}</div>
            </div>
        </div>
    )
}

export default TOPLocation;