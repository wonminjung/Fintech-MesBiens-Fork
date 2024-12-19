import React from "react";
import { BC } from "./style";
import { useNavigate } from "react-router-dom";
import HorizontalDivider from "../../../components/divider/HorizontalDivider";

const BoardList: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (e: React.MouseEvent<HTMLTableCellElement>) => {
    navigate("/boardContent");
  };
  const handleWrite = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/boardWrite");
  };

  return (
    <BC.Board>
      {/* 게시판 Area */}
      <BC.BoardContainer>
        <BC.HeaderContainer>
          <BC.h2>자유게시판</BC.h2>
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
              <BC.tdtitle>
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

        {/* Pagination */}
        <BC.PaginationWrapper>
          <BC.Pagination>
            <a href="#">&laquo;</a>
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">&raquo;</a>
          </BC.Pagination>
        </BC.PaginationWrapper>
      </BC.BoardContainer>

      {/* 채팅 Area */}
      <BC.ChatArea>
        <h2>채팅</h2>
        <HorizontalDivider />
        <BC.ChatMessage>
          <BC.ChatAnonymous>익명29814 :</BC.ChatAnonymous>
          <BC.ChatAnoymousMessage>도가자~</BC.ChatAnoymousMessage>
        </BC.ChatMessage>
        <BC.ChatMessage>
          <BC.ChatAnonymous>익명5879 :</BC.ChatAnonymous>
          <BC.ChatAnoymousMessage>이건 사야해</BC.ChatAnoymousMessage>
        </BC.ChatMessage>
        <BC.ChatMessage>
          <BC.ChatAnonymous>익명10323 :</BC.ChatAnonymous>
          <BC.ChatAnoymousMessage>화성 갈꺼니까~</BC.ChatAnoymousMessage>
        </BC.ChatMessage>
        <BC.ChatMessage>
          <BC.ChatAnonymous>익명58488 :</BC.ChatAnonymous>
          <BC.ChatAnoymousMessage>10만전자 가즈아~</BC.ChatAnoymousMessage>
        </BC.ChatMessage>
        <BC.ChatMessage>
          <BC.ChatAnonymous>익명8947 :</BC.ChatAnonymous>
          <BC.ChatAnoymousMessage>민지</BC.ChatAnoymousMessage>
        </BC.ChatMessage>
        <BC.ChatWrapper>
          <HorizontalDivider />
          <BC.Chat>
            <BC.ChatInput placeholder="입력하세요" />
            <BC.ChatBtn>전송</BC.ChatBtn>
          </BC.Chat>
        </BC.ChatWrapper>
      </BC.ChatArea>
    </BC.Board>
  );
};

export default BoardList;
