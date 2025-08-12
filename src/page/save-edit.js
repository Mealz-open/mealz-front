// save-edit.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation as usePageLocation } from "react-router-dom";
import EditName from "../asset/edit-name";
import EditMembertype from "../asset/edit-membertype";

function SaveEdit() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [nickname, setNickname] = useState("말즈 이용자");
  const [memberType, setMemberType] = useState("BENEFICIARY");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const pageLocation = usePageLocation();

  // 현재 회원 정보 불러오기
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/member`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setNickname(data.nickname || "말즈 이용자");
          setMemberType(data.memberType || "BENEFICIARY");
        }
      } catch (err) {
        console.error("회원 정보 로드 실패", err);
      }
    };
    fetchMemberData();
  }, [apiUrl]);

  // 저장 처리
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
    <>
      {/* 현재 페이지 주소에 따라 다른 편집폼 표시 */}
      {pageLocation.pathname === "/editname" && (
        <EditName editNickname={nickname} setNickname={setNickname} />
      )}
      {pageLocation.pathname === "/editmembertype" && (
        <EditMembertype editMembertype={memberType} setMembertype={setMemberType} />
      )}

      <div id="gnb-mobile">
        <button className="btn-fill btn-primary" onClick={handleSave}>
          저장
        </button>
      </div>
    </>
  );
}

export default SaveEdit;