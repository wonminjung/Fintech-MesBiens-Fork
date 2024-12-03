import React from "react";
import S from "./style";
import { MenuList } from "../types";

type Props = {
  menuList: MenuList[];
  selectedMenuIndex: number;
};

const ContentAreaContainer: React.FunctionComponent<Props> = ({
  menuList,
  selectedMenuIndex,
}): JSX.Element => {
  const tansferValue: { menuList: MenuList; selectedMenuIndex: number } = {
    menuList: menuList[selectedMenuIndex],
    selectedMenuIndex,
  };

  return (
    <S.ContentAreaContainer>
      <S.SelectedMenuContentContainer>
        {menuList[selectedMenuIndex].component(tansferValue)}
      </S.SelectedMenuContentContainer>
    </S.ContentAreaContainer>
  );
};

export default ContentAreaContainer;
