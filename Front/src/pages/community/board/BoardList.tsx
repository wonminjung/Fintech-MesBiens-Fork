import React from "react";
import { BC } from "./style";
import { BoardInfo } from "./BoardData";

type Props = {
  board: BoardInfo; // 배열로 받아옴
};

const BoardList: React.FC<Props> = ({ board }) => {
  return (
    <>
      {/* 게시판 Area */}
      <BC.TRCont key={board.bno}>
        <BC.TD>{board.bno}</BC.TD>
        <BC.TDTitle>{board.btitle}</BC.TDTitle>
        <BC.TD>{board.bname}</BC.TD>
        <BC.TD>{board.bhit}</BC.TD>
      </BC.TRCont>
    </>
  );
};

export default BoardList;
