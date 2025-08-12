import React, { useState, useEffect } from "react";
import { useNavigate, useLocation as usePageLocation } from "react-router-dom";

function SaveEdit({ editNickname, editMembertype }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  // 사용자 정보 상태
  const [nickname, setNickname] = useState("말즈 이용자");
  const [memberType, setMemberType] = useState("BENEFICIARY");
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();
  const pageLocation = usePageLocation(); // 현재 페이지 경로

  // 현재 회원 정보 불러오기
  const fetchMemberData = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/member`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setNickname(data.nickname || "");
        setMemberType(data.memberType || "");
      }
    } catch (err) {
      console.error("회원 정보 로드 실패", err);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    const path = pageLocation.pathname;
    fetchMemberData().then(() => {
      if (path === "/editname") {
        setNickname(editNickname);
      } else if (path === "/editmembertype") {
        setMemberType(editMembertype);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageLocation.pathname]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("memberType", memberType);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await fetch(`${apiUrl}/api/member`, {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("저장 완료!");
        navigate("/profile");
      } else {
        alert("저장 실패!");
      }
    } catch (error) {
      alert("저장 중 오류가 발생했습니다!");
    }
  };

  return (
    <div>
      <div id="gnb-mobile">
        <button className="btn-fill btn-primary" onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
}

export default SaveEdit;