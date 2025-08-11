import React, { useState } from "react";

function SaveEdit({ editNickname }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [memberType, setMemberType] = useState("BENEFICIARY");
  const [profileImage, setProfileImage] = useState(null);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("nickname", editNickname);
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