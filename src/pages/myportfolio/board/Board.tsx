import React from "react";
import P from "../style";
import MenuBar from "../MenuBar";
import BoardList from "./BoardList";
import BoardCont from "./BoardCont";

export const Board: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <BoardList />
    </P.MainContainer>
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
