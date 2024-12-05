import * as React from 'react';
import S from './style';
import { MenuList } from '../../types';

type Props = {
  menuList: MenuList;
}

const SecondPassword: React.FunctionComponent<Props> = ({ menuList }) => {
  const { list } = menuList;

  return (
    <S.SelectedMenuHeaderContainer>
        <S.MenuTitle>{list}</S.MenuTitle>
        
    </S.SelectedMenuHeaderContainer>
  );
};

export default SecondPassword;
