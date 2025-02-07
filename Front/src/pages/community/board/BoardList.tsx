// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BC } from "./style"; // 스타일 컴포넌트

// // 게시글 타입 정의
// type Post = {
//   postNo: number;
//   memberNo: number;
//   postTitle: string;
//   postCont: string;
//   postHit: number;
// };

// // API 응답 타입 정의
// type ApiResponse = {
//   plist: Post[];
//   page: number;
//   totalCount: number;
//   startpage: number;
//   endpage: number;
//   maxpage: number;
// };

// type BoardListProps = {
//   currentPage: number;
// };

// const BoardList: React.FC = () => {
//   const [boards, setBoards] = useState<Post[]>([]);
//   const [pagination, setPagination] = useState<{ totalCount: number; page: number }>({ totalCount: 0, page: 1 });

//   const navigate = useNavigate();

//   const handleContent = (postNo: number) => {
//     navigate(`/community/C_board/${postNo}`);  // 게시글 상세보기로 이동
//   };

//   useEffect(() => {
//     const fetchBoardData = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/community/C_board`);
//         const data: ApiResponse = await response.json();

//         if (response.ok) {
//           console.log(data);  // 데이터 확인
//           setBoards(data.plist); // 게시글 목록 설정
//           setPagination({ totalCount: data.totalCount, page: data.page }); // 페이징 정보 설정
//         } else {
//           console.error("Failed to fetch board data:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching board data:", error);
//       }
//     };

//     fetchBoardData();
//   }, []);

//   return (
//     <>
//       {/* 게시글 목록 */}
//       {boards.length > 0 ? (
//         boards.map((board) => (
//           <BC.TRCont key={board.postNo} onClick={() => handleContent(board.postNo)}>
//             <BC.TD>{board.postNo}</BC.TD>
//             <BC.TDTitle>{board.postTitle}</BC.TDTitle>
//             <BC.TD>{board.memberNo}</BC.TD>
//             <BC.TD>{board.postHit}</BC.TD>
//           </BC.TRCont>

//         ))
//       ) : (
//         <BC.NoDataMessage>게시글이 없습니다.</BC.NoDataMessage>
//       )}

//       {/* 페이징 정보 */}
//       {/* <BC.PaginationWrapper>
//         <BC.PaginationInfo>
//           총 게시글 수: {pagination.totalCount}
//         </BC.PaginationInfo>
//       </BC.PaginationWrapper> */}
//     </>
//   );
// };

// export default BoardList;

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
