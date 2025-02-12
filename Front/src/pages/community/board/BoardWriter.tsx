import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../modules/store/store";
import { BP, BW } from "./style";

const BoardWriter: React.FC = () => {
  const {member} = useSelector((state: RootState) => state.user);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (member) {
      setMemberName(member.memberName || ""); 
      setMemberNo(member.memberNo || 1);
    }
  }, [member]); // member 값이 바뀌면 업데이트



  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [memberName, setMemberName] = useState(member?.memberName || ""); 
  const [memberNo, setMemberNo] = useState(member?.memberNo || "");
  const [postPassword, setPostPassword] = useState("");
  const [postCont, setPostCont] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleGoBack = () => {
    navigate("/community/C_board"); // 목록으로 돌아가는 기능
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("postTitle", postTitle);
    formData.append("memberName", memberName);
    formData.append("memberNo", String(memberNo)); // memberNo 추가
    formData.append("postPassword", postPassword);
    formData.append("postCont", postCont);
    if (file) {
      formData.append("uploadFile", file);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/community/C_board/C_boardWrite_ok`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("게시글 등록 성공");
        navigate("/community/C_board");
      } else {
        console.error("게시글 등록 실패");
      }
    } catch (error) {
      console.error("게시글 등록 중 에러 발생:", error);
    }
  };

  return (
    <BW.WriteContainer>
      <BW.WriteHeader>
        <BW.TitleInput
          placeholder=" 제목"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
      </BW.WriteHeader>

      <BW.MiddleContent>
        <BW.UploadLabel>첨부파일</BW.UploadLabel>
        <BW.UploadInput type="file" onChange={handleFileChange} />
      </BW.MiddleContent>

      <BW.TopContent>
        <BW.BoardWriter>
          작성자 : {memberName}
        </BW.BoardWriter>

        {/* <BW.Input
          placeholder=" 회원번호"
          type="number"
          value={memberNo}
          onChange={(e) => setMemberNo(Number(e.target.value))}
        /> */}
        <BW.PassWordInput
          placeholder=" 비밀번호"
          type="password"
          value={postPassword}
          onChange={(e) => setPostPassword(e.target.value)}
        />
      </BW.TopContent>


      <BW.WriteContent onClick={handleInputFocus}>
        <BW.ContentInput
          ref={inputRef}
          placeholder="게시글 입력"
          value={postCont}
          onChange={(e) => setPostCont(e.target.value)}
        />
      </BW.WriteContent>

      <BW.ButtonContainer>
        <BP.Button type="submit" onClick={handleGoBack}>
          목록
        </BP.Button>
        <BP.Button type="submit" onClick={handleSubmit}>
          등록
        </BP.Button>
      </BW.ButtonContainer>
    </BW.WriteContainer>
  );
};

export default BoardWriter;
