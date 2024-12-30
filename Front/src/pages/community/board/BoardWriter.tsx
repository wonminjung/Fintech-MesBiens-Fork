import React, { useState } from "react";
import { BC, BP, BW } from "./style";
import { useNavigate } from "react-router-dom";

const BoardWriter: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const navigate = useNavigate();
  const [btitle, setBtitle] = useState(""); // 제목 상태
  const [bname, setBname] = useState(""); // 작성자 상태
  const [bcont, setBcont] = useState(""); // 게시글 나용 상태
  const handleSubmit = () => {
    const postData = {
      btitle,
      bname,
      bcont,
      date: new Date().toISOString(), // 현재 날짜 추가 (ISO 형식)
    };

    console.log("등록 완료");
    console.log("게시글 데이터:", JSON.stringify(postData, null, 2)); // JSON 형식으로 출력
    // 게시글 등록 로직 추가, ex) API 호출 등
    navigate("/P_Board");
  };

  return (
    <BW.WriteContainer>
      <BW.WriteHeader>
        <BW.TitleInput
          placeholder=" 제목"
          value={btitle}
          onChange={(e) => setBtitle(e.target.value)}
        />
      </BW.WriteHeader>
      <BW.TopContent>
        <BW.Input
          placeholder=" 작성자"
          value={bname}
          onChange={(e) => setBname(e.target.value)}
        />
      </BW.TopContent>
      <BW.WriteContent onClick={handleInputFocus}>
        <BW.ContentInput
          ref={inputRef}
          placeholder="게시글 입력"
          value={bcont}
          onChange={(e) => setBcont(e.target.value)}
        />
      </BW.WriteContent>
      <BW.ButtonContainer>
        <BP.Button type="submit" onClick={handleSubmit}>
          등록
        </BP.Button>
      </BW.ButtonContainer>
    </BW.WriteContainer>
  );
};

export default BoardWriter;
