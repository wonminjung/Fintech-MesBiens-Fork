// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HorizontalDivider from "../../../components/divider/HorizontalDivider";
// import { H1, H2 } from "../../../components/htags/style";
// import BoardList from "./BoardList";
// import BoardPost from "./BoardPost";
// import BoardWriter from "./BoardWriter";
// import ChatContent from "./Chat";
// import { BC, C } from "./style";

// type Post = {
//   postNo: number;
//   memberNo: number;
//   memberName: string;
//   postTitle: string;
//   postCont: string;
//   postHit: number;
// };

// type ApiResponse = {
//   plist: Post[];
//   page: number;
//   totalCount: number;
//   startpage: number;
//   endpage: number;
//   maxpage: number;
// };

// export const Board: React.FC = () => {
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(5); // 총 페이지 수 (초기값 5, API 호출 후 업데이트 가능)

//   const handleWrite = () => {
//     navigate("C_boardWrite");
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   useEffect(() => {
//     // API 요청을 통해 총 페이지 수를 받아올 수 있습니다.
//     const fetchPaginationData = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_SERVER_URL}/community/C_board?page=${currentPage}`
//         );
//         const data = await response.json();
//         setTotalPages(data.maxpage || 5); // API에서 받아온 maxpage 값 사용
//       } catch (error) {
//         console.error("Error fetching pagination data:", error);
//       }
//     };

//     fetchPaginationData();
//   }, [currentPage]);

//   return (
//     <BC.Board>
//       <BC.BoardContainer>
//         <BC.TitleContainer>
//           <H1>자유게시판</H1>
//           <BC.Button onClick={handleWrite}>글쓰기</BC.Button>
//         </BC.TitleContainer>
//         <BC.HeaderContainer>
//           <BC.BoardTable>
//             <BC.TR>
//               <BC.TD>글번호</BC.TD>
//               <BC.TDTitle>게시글</BC.TDTitle>
//               <BC.TD>작성자</BC.TD>
//               <BC.TD>조회수</BC.TD>
//             </BC.TR>
//           </BC.BoardTable>
//         </BC.HeaderContainer>
//         <BC.BoardTable>
//           <BoardList />
//         </BC.BoardTable>

//         {/* Pagination */}
//         <BC.PaginationWrapper>
//           <BC.Pagination>
//             {/* <a href="#">&laquo;</a>
//             <a href="#">1</a>
//             <a href="#">2</a>
//             <a href="#">3</a>
//             <a href="#">4</a>
//             <a href="#">5</a>
//             <a href="#">&raquo;</a> */}
//             <a
//               href="#"
//               onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
//               style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
//             >
//               &laquo;
//             </a>

//             {/* 페이지 번호 생성 */}
//             {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//               <a
//                 key={page}
//                 href="#"
//                 onClick={() => handlePageChange(page)}
//                 style={{
//                   fontWeight: currentPage === page ? "bold" : "normal",
//                   textDecoration: currentPage === page ? "underline" : "none",
//                 }}
//               >
//                 {page}
//               </a>
//             ))}

//             <a
//               href="#"
//               onClick={() =>
//                 handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
//               }
//               style={{ pointerEvents: currentPage === totalPages ? "none" : "auto" }}
//             >
//               &raquo;
//             </a>

//           </BC.Pagination>
//         </BC.PaginationWrapper>
//       </BC.BoardContainer>
//       <ChatArea />
//     </BC.Board>
//   );
// };

// export const ChatArea: React.FC = () => {
//   return (
//     <>
//       {/* 채팅 Area */}
//       <BC.ChatArea>
//         <H2>채팅</H2>
//         <HorizontalDivider />
//         <C.ChatContainer>
//           <ChatContent />
//         </C.ChatContainer>
//         {/* 채팅 메시지 부분 */}
//         {/* 여기서 채팅 메시지를 동적으로 렌더링할 수 있습니다 */}
//         <BC.ChatWrapper>
//           <HorizontalDivider />
//           <BC.Chat>
//             <BC.ChatInput placeholder="입력하세요" />
//             <BC.ChatBtn>전송</BC.ChatBtn>
//           </BC.Chat>
//         </BC.ChatWrapper>
//       </BC.ChatArea>
//     </>
//   );
// };

// export const BoardContent: React.FC = () => {
//   return <BoardPost />;
// };

// export const BoardWrite: React.FC = () => {
//   return <BoardWriter />;
// };

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalDivider from "../../../components/divider/HorizontalDivider";
import { H1, H2 } from "../../../components/htags/style";
import BoardList from "./BoardList";
import BoardPost from "./BoardPost";
import BoardWriter from "./BoardWriter";
import ChatContent from "./Chat";
import { BC, C } from "./style";

// ✅ 게시글 타입 정의
type Post = {
  postNo: number;
  memberNo: number;
  memberName: string;
  postTitle: string;
  postCont: string;
  postHit: number;
};

// ✅ API 응답 타입 정의
type ApiResponse = {
  plist: Post[];
  currentPage: number;
  totalCount: number;
  startPage: number;
  endPage: number;
  maxPage: number;
};

export const Board: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleWrite = () => {
    navigate("C_boardWrite");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/community/C_board?page=${currentPage}`
        );
        const data: ApiResponse = await response.json();
        setPosts(data.plist);
        setTotalPages(data.maxPage || 1);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <BC.Board>
      <BC.BoardContainer>
        <BC.TitleContainer>
          <H1>자유게시판</H1>
          <BC.Button onClick={handleWrite}>글쓰기</BC.Button>
        </BC.TitleContainer>

        <BC.HeaderContainer>
          <BC.BoardTable>
            <BC.TR>
              <BC.TD>글번호</BC.TD>
              <BC.TDTitle>게시글</BC.TDTitle>
              <BC.TD>작성자</BC.TD>
              <BC.TD>조회수</BC.TD>
            </BC.TR>
          </BC.BoardTable>
        </BC.HeaderContainer>

        <BC.BoardTable>
          <BoardList boards={posts} />
        </BC.BoardTable>

        {/* ✅ Pagination */}
        <BC.PaginationWrapper>
          <BC.Pagination>
            <a
              href="#"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
              style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
            >
              &laquo;
            </a>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <a
                key={page}
                href="#"
                onClick={() => handlePageChange(page)}
                style={{
                  fontWeight: currentPage === page ? "bold" : "normal",
                  textDecoration: currentPage === page ? "underline" : "none",
                }}
              >
                {page}
              </a>
            ))}

            <a
              href="#"
              onClick={() =>
                handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
              }
              style={{ pointerEvents: currentPage === totalPages ? "none" : "auto" }}
            >
              &raquo;
            </a>
          </BC.Pagination>
        </BC.PaginationWrapper>
      </BC.BoardContainer>

      <ChatArea />
    </BC.Board>
  );
};

// ✅ ChatArea 컴포넌트
export const ChatArea: React.FC = () => {
  return (
    <BC.ChatArea>
      <H2>채팅</H2>
      <HorizontalDivider />
      <C.ChatContainer>
        <ChatContent />
      </C.ChatContainer>
      <BC.ChatWrapper>
        <HorizontalDivider />
        <BC.Chat>
          <BC.ChatInput placeholder="입력하세요" />
          <BC.ChatBtn>전송</BC.ChatBtn>
        </BC.Chat>
      </BC.ChatWrapper>
    </BC.ChatArea>
  );
};

// ✅ 게시글 상세보기 (BoardContent)
export const BoardContent: React.FC = () => {
  return <BoardPost />;
};

// ✅ 게시글 작성하기 (BoardWrite)
export const BoardWrite: React.FC = () => {
  return <BoardWriter />;
};
