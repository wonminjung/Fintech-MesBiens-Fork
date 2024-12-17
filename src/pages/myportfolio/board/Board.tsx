import React from "react";
import P from "../style";
import MenuBar from "../MenuBar";
import BoardContent from "./BoardContent";

const Board: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <BoardContent />
    </P.MainContainer>
  );
};

export default Board;
