/** MyPageContainer.tsx */
export type MenuList = {
    list: string;
    isSearchable: boolean;
    component: (props: any) => JSX.Element;
}

// 컴포넌트에 전달할 props 타입
export type ToLeftMenuComponentTypes = {
    menuList: MenuList[];
    selectedMenuIndex: number;
    handleClickMenu: (index: number) => void
}