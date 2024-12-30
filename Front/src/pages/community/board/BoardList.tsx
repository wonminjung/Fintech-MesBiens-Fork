import React from "react";
import { BC } from "./style";
import { BoardInfo } from "./BoardData";
import { useNavigate } from "react-router-dom";

type Props = {
  board: BoardInfo; // 단일 객체로 받아옴
};

const BoardList: React.FC<Props> = ({ board }) => {
  const navigate = useNavigate();

  const handleContent = (bno: number) => {
    navigate(`/P_board/${bno}`); // URL을 동적으로 생성
  };

  return (
    <>
      {/* 게시판 Area */}
      <BC.TRCont key={board.bno} onClick={() => handleContent(board.bno)}>
        <BC.TD>{board.bno}</BC.TD>
        <BC.TDTitle>{board.btitle}</BC.TDTitle>
        <BC.TD>{board.bname}</BC.TD>
        <BC.TD>{board.bhit}</BC.TD>
      </BC.TRCont>
    </>
  );
};

export default BoardList;
