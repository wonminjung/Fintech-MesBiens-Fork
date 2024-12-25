import React from "react";
import P from "../style";
import MenuBar from "../MenuBar";
import NewsTiles from "./NewsTiles";

const News: React.FC = () => {
  return (
    <P.MainContainer>
      <MenuBar />
      <NewsTiles />
    </P.MainContainer>
  );
};

export default News;
