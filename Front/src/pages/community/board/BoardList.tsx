import React from "react";
import { useNavigate } from "react-router-dom";
import { BC } from "./style";

// 게시글 타입 정의
type Post = {
  postNo: number;
  memberNo: number;
  memberName: string;
  postTitle: string;
  postCont: string;
  postHit: number;
  commentTotalCount: number;
  postFile: number;
};

// ✅ props를 boards로 변경
interface BoardListProps {
  boards: Post[];
}



const BoardList: React.FC<BoardListProps> = ({ boards }) => {

  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 훅

  // 게시글 클릭 시 상세 페이지로 이동
  const handleContent = (postNo: number) => {
    // navigate(`/community/C_board/${postNo}/view`); // (조회수 상승)게시글 상세보기로 이동
    navigate(`/community/C_board/${postNo}`); // (조회수 상승)게시글 상세보기로 이동
  };





  return (
    <>
      {boards.length > 0 ? (
        boards.map((board) => (

          <BC.TRCont key={board.postNo} onClick={() => handleContent(board.postNo)}>
            <BC.TD>{board.postNo}</BC.TD>
            <BC.TDTitle>
              {board.postTitle}
              <BC.UploadFileValid>
                {board.postFile > 0 ? "📎" : ""} {/* 첨부파일 여부에 따른 이미지 표기 */}
              </BC.UploadFileValid>
              <BC.CommentCount>
                ({board.commentTotalCount}) {/* 댓글 개수 표기 */}
              </BC.CommentCount>
            </BC.TDTitle>
            <BC.TD>{board.memberName}</BC.TD>
            <BC.TD>{board.postHit}</BC.TD>
          </BC.TRCont>
        ))
      ) : (
        <BC.TR>
          <BC.TD colSpan={4} style={{ textAlign: "center" }}>
            게시글이 없습니다.
          </BC.TD>
        </BC.TR>
      )}
    </>
  );
};

export default BoardList;
