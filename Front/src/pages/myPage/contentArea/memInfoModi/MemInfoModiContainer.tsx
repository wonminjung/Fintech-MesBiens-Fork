import * as React from 'react';
import S from './style';
import { MenuList } from '../../types';
import MemInfoModiComponent from './MemInfoModiComponent';

type Props = {
  menuList: MenuList;
};

const MemInfoModiContainer: React.FunctionComponent<Props> = ({ menuList }): JSX.Element => {
  const { list } = menuList;

  return (
    <S.SelectedMenuHeaderContainer>
        <S.MenuTitle>{list}</S.MenuTitle>
        
        <MemInfoModiComponent />
    </S.SelectedMenuHeaderContainer>
  );
};

export default MemInfoModiContainer;
