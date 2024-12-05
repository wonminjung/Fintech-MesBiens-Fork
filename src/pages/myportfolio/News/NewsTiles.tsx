import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PlainButton from "../../../components/button/PlainButton";
import N from "./style";

const NewsTiles: React.FC = () => {
  const navigate = useNavigate();
  const Tile1 = () => {
    navigate("/N_tile1");
  };
  return (
    <N.TilesContainer>
      <N.Tile onClick={Tile1}>
        <p>메뉴 1</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 2</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 3</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 4</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 4</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 4</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 4</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 4</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 4</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 4</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 4</p>
      </N.Tile>
      <N.Tile>
        <p>메뉴 4</p>
      </N.Tile>
    </N.TilesContainer>
  );
};

export default NewsTiles;
