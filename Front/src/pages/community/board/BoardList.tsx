import React, { useEffect, useState } from "react";
import { BC } from "./style";
import { useNavigate } from "react-router-dom";

type BoardInfo = {
  bno: number;
  bname: string;
  btitle: string;
  bcont: string;
  bhit: number;
};

const BoardList: React.FC = () => {
  const [boards, setBoards] = useState<BoardInfo[]>([]);
  const navigate = useNavigate();

  const handleContent = (bno: number) => {
    navigate(`/P_board/${bno}`); // URL을 동적으로 생성
  };

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await fetch(
          `${process.env.PUBLIC_URL}/dummyDatas/boardData.json`
        );
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    fetchBoardData();
  }, []);

  return (
    <>
      {/* 게시판 Area */}
      {boards.map((board) => (
        <BC.TRCont key={board.bno} onClick={() => handleContent(board.bno)}>
          <BC.TD>{board.bno}</BC.TD>
          <BC.TDTitle>{board.btitle}</BC.TDTitle>
          <BC.TD>{board.bname}</BC.TD>
          <BC.TD>{board.bhit}</BC.TD>
        </BC.TRCont>
      ))}
    </>
  );
};

export default BoardList;
