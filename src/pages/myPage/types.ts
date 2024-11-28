/** MyPageContainer.tsx */
export type MenuList = {
    list: string;
    component: JSX.Element;
}

// 컴포넌트 당 보낼 프롭스
export type ToLeftMenuComponentTypes = {
    menuList: MenuList[];
    selectedMenu: string | null;
    handleClickMenu: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}