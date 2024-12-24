import React from "react";
import P from "../style";
import MenuBar from "../MenuBar";

const Tile1: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <h1>Tile1</h1>
    </P.MainContainer>
  );
};

export default Tile1;
