import React from "react";
import { BC } from "./style";
import { useNavigate } from "react-router-dom";

const BoardContent: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (e: React.MouseEvent<HTMLTableCellElement>) => {
    navigate("/boardCont");
  };
  const handleWrite = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/boardWrite");
  };

  return (
    <BC.BoardContent>
      <BC.HeaderContainer>
        <h2 style={{ marginLeft: "40px" }}>자유게시판</h2>
        <BC.Button onClick={handleWrite}>글쓰기</BC.Button>
      </BC.HeaderContainer>
      <BC.BoardTable>
        <thead>
          <BC.tr>
            <BC.th>글번호</BC.th>
            <BC.th style={{ width: "15em" }}>제목</BC.th>
            <BC.th>작성자</BC.th>
            <BC.th>조회수</BC.th>
          </BC.tr>
        </thead>
        <tbody>
          <BC.trcont>
            <BC.td>2</BC.td>
            <BC.tdtitle onClick={handleNavigate}>
              민지는 우리팀 기술이사 이다.
              {/* <a
                href="./board_post.html"
                className="board_post_go_first board_post_hyperlink"
              ></a> */}
            </BC.tdtitle>
            <BC.td>홍철</BC.td>
            <BC.td>300</BC.td>
          </BC.trcont>
          <BC.trcont>
            <BC.td>1</BC.td>
            <BC.tdtitle onClick={handleNavigate}>
              홍혁철은 TB조 바지팀장입니다 실질적 팀장은 민지 이다
              {/* <a
                href="./board_post.html"
                className="board_post_go_second board_post_hyperlink"
              ></a> */}
            </BC.tdtitle>
            <BC.td>따발총</BC.td>
            <BC.td>400</BC.td>
          </BC.trcont>
        </tbody>
      </BC.BoardTable>
    </BC.BoardContent>
  );
};

export default BoardContent;
