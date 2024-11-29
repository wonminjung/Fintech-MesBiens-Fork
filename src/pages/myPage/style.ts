import "../../global/style.css";
import styled from "styled-components";

const S = {
    // MyPageContainer 는 styled.div 속성인 것을 명시 (Layout으로 옮겨짐)
    // MyPageContainer: styled.div`
    //     display: flex;
    //     height: calc(100vh - 130px);
    //     border: 2px solid black;
    //     border-radius: 20px;
    //     background: var(--container-color);
    //     box-sizing: border-box;
    // `
    ContentAreaContainer: styled.div`
    width: 85%;
    margin: 18px 12px 18px 38px;
    `,
    SelectedMenuContentContainer: styled.div`
        padding-top: 18px;
        padding-right: 14px;
        height: calc(100% - 18px);
        overflow-y: scroll;

        /* 스크롤바 */
        &::-webkit-scrollbar {
            width: 7px;
        }
        
        &::-webkit-scrollbar-thumb {
            background: lightgray;
            border-radius: 12px;

        }

        &::-webkit-scrollbar-thumb:active {
            background-color: darkgray;
        }
        
        &::-webkit-scrollbar-track {
            border-radius: 12px;
        }
    `,
    SelectedMenuHeaderContainer: styled.div`
        display: flex;
        justify-content: space-between;
    `,
    // 선택 메뉴 제목
    MenuTitle: styled.div`
        font-size: 32px;
        font-weight: bold;
    `,
    // 검색 및 정렬
    SearchAndSortWrapper: styled.div`
        display: flex;
        justify-content: center;
        width: 40%;
        height: 70%;
    `,
    AccountSearch: styled.div`
        display: flex;
        width: 60%;
        align-items: center;
    `,
    AccountSort: styled.div`
        display: flex;
        width: 40%;
        align-items: center;
        justify-content: center;
        background-color: lightgray;
        width: 100px;
        margin-left: 12px;
        font-size: 14px;
    `,
};



export default S;