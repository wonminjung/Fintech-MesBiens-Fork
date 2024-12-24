import styled from "styled-components";

const S = {
    AssetsContainer: styled.div`
        width: 100%;
        margin: 18px 12px 18px 38px;
    `,
    AssetsWrapper: styled.div`
        padding-top: 18px;
        padding-right: 14px;
        height: calc(100% - 18px);
        overflow-y: scroll;
        overflow-x: hidden;

        /* 스크롤바 */
        &::-webkit-scrollbar {
            width: 7px;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--scrollbar-color);
            border-radius: 12px;
        }

        &::-webkit-scrollbar-thumb:active {
            background-color: darkgray;
        }

        &::-webkit-scrollbar-track {
            border-radius: 12px;
        }
    `,
}

export default S;
