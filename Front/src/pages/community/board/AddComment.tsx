import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules/store/store";
import { BP } from "./style";

interface AddCommentProps {
  postNo: number; // 게시글 번호 전달받음
  onCommentAdded: () => void; // 댓글 추가 후 게시글 새로고침 콜백
}

const AddComment: React.FC<AddCommentProps> = ({ postNo, onCommentAdded }) => {
  const {member} = useSelector((state: RootState) => state.user);
  const [commentContent, setCommentContent] = useState("");
  const [commentPassword, setCommentPassword] = useState("");
  const [memberNo, setMemberNo] = useState("");

  const handleSubmit = async () => {
    if (!commentContent || !commentPassword) {
      alert("댓글 내용과 비밀번호를 입력하세요.");
      return;
    }

    const commentData = {
      member: { memberNo: (member?.memberNo) },
      postCommentContent: commentContent,
      postCommentPassword: commentPassword,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/community/C_board/${postNo}/postComment_Write`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      if (response.ok) {
        console.log("댓글 작성 성공");
        setMemberNo(""); // 입력 필드 초기화
        setCommentContent("");
        setCommentPassword("");
        onCommentAdded(); // 댓글 추가 후 새로고침
      } else {
        console.error("댓글 작성 실패");
      }
    } catch (error) {
      console.error("댓글 작성 중 에러 발생:", error);
    }
  };

  return (
    <BP.AddCommentContainer>
      {/* <BP.CommentInput
        type="number"
        placeholder="회원 번호"
        value={memberNo}
        onChange={(e) => setMemberNo(e.target.value)}
      /> */}
      <BP.CommentInput
        type="text"
        placeholder="댓글을 입력하세요"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <BP.CommentInputPwd
        type="password"
        placeholder="비밀번호"
        value={commentPassword}
        onChange={(e) => setCommentPassword(e.target.value)}
      />
      <BP.CommentBtn
        type="button" onClick={handleSubmit}>
        작성
      </BP.CommentBtn>
    </BP.AddCommentContainer>
  );
};

export default AddComment;
