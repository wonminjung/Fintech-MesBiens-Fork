import React, { useEffect, useState } from "react";
import P from "../style";
import MenuBar from "../MenuBar";
import BoardList from "./BoardList";
import BoardPost from "./BoardPost";
import { BC, C } from "./style";
import HorizontalDivider from "../../../components/divider/HorizontalDivider";
import { useNavigate } from "react-router-dom";
import BoardWriter from "./BoardWriter";
import ChatContent from "./Chat";

export const Board: React.FC = () => {
  const navigate = useNavigate();
  const handleWrite = () => {
    navigate("/C_boardWrite");
  };

  return (
    <P.MainContainer>
      <MenuBar />
      <BC.Board>
        <BC.BoardContainer>
          <BC.TitleContainer>
            <BC.H2>자유게시판</BC.H2>
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
            <BoardList />
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
        <ChatArea />
      </BC.Board>
    </P.MainContainer>
  );
};

export const ChatArea: React.FC = () => {
  return (
    <>
      {/* 채팅 Area */}
      <BC.ChatArea>
        <h2>채팅</h2>
        <HorizontalDivider />
        <C.ChatContainer>
          <ChatContent />
        </C.ChatContainer>
        {/* 채팅 메시지 부분 */}
        {/* 여기서 채팅 메시지를 동적으로 렌더링할 수 있습니다 */}
        <BC.ChatWrapper>
          <HorizontalDivider />
          <BC.Chat>
            <BC.ChatInput placeholder="입력하세요" />
            <BC.ChatBtn>전송</BC.ChatBtn>
          </BC.Chat>
        </BC.ChatWrapper>
      </BC.ChatArea>
    </>
  );
};

export const BoardContent: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <BoardPost />
    </P.MainContainer>
  );
};

export const BoardWrite: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <BoardWriter />
    </P.MainContainer>
  );
};
