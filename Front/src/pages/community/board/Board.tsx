import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { H1 } from "../../../components/htags/style";
import BoardList from "./BoardList";
import BoardPost from "./BoardPost";
import BoardWriter from "./BoardWriter";
import { BC } from "./style";
import { ChatContent } from "./Chat";

// ✅ 게시글 타입 정의
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

// ✅ API 응답 타입 정의
type ApiResponse = {
  plist: Post[];
  currentPage: number;
  totalCount: number;
  startPage: number;
  endPage: number;
  maxPage: number;
  commentTotalCount: number;
  postFile: number;
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
        // console.log("API 데이터:", data)
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
            <BC.TBODY>
              <BC.TR>
                <BC.TD>글번호</BC.TD>
                <BC.TDTitle>게시글</BC.TDTitle>
                <BC.TD>작성자</BC.TD>
                <BC.TD>조회수</BC.TD>
              </BC.TR>
            </BC.TBODY>
          </BC.BoardTable>
        </BC.HeaderContainer>

        <BC.BoardTable>
          <BC.TBODY>
            <BoardList boards={posts} />
          </BC.TBODY>
        </BC.BoardTable>

        {/* ✅ Pagination */}
        <BC.PaginationWrapper>
          <BC.Pagination>
            <BC.PagenationA
              href="#"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
              style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
            >
              &laquo;
            </BC.PagenationA>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <BC.PagenationA
                key={page}
                href="#"
                onClick={() => handlePageChange(page)}
                style={{
                  fontWeight: currentPage === page ? "bold" : "normal",
                  textDecoration: currentPage === page ? "underline" : "none",
                }}
              >
                {page}
              </BC.PagenationA>
            ))}

            <BC.PagenationA
              href="#"
              onClick={() =>
                handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
              }
              style={{ pointerEvents: currentPage === totalPages ? "none" : "auto" }}
            >
              &raquo;
            </BC.PagenationA>
          </BC.Pagination>
        </BC.PaginationWrapper>
      </BC.BoardContainer>

      <ChatContent />
    </BC.Board>
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
