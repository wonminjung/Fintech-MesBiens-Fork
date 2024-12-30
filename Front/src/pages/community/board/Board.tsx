import React, { useEffect, useState } from "react";
import P from "../style";
import MenuBar from "../MenuBar";
import BoardList from "./BoardList";
import BoardCont from "./BoardCont";
import { BoardInfo, boardInfo } from "./BoardData";
import { BC } from "./style";
import HorizontalDivider from "../../../components/divider/HorizontalDivider";
import { useNavigate, useParams } from "react-router-dom";

export const Board: React.FC = () => {
  const { bno } = useParams<{ bno: string }>(); // URL에서 bno 가져오기
  const [currentBoard, setCurrentBoard] = useState<BoardInfo | null>(null);

  useEffect(() => {
    // bno에 맞는 게시글 찾기
    const foundBoard = boardInfo.find((board) => board.bno.toString() === bno);
    setCurrentBoard(foundBoard || null);
  }, [bno, boardInfo]);

  return (
    <P.MainContainer>
      <MenuBar />
      <BC.Board>
        <BC.BoardContainer>
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
            {boardInfo.map(
              (board: BoardInfo): JSX.Element => (
                <BoardList key={board.bno} board={board} />
              )
            )}
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
      <BoardCont />
    </P.MainContainer>
  );
};

export const BoardWrite: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      {/* <BoardWrite /> */}
    </P.MainContainer>
  );
};
