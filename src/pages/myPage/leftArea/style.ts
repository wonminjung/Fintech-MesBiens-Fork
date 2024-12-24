import "../../../global/style.css";
import styled from "styled-components";

const S = {
    /** LeftAreaContainer.tsx */
    LeftAreaContainer: styled.div`
        width: 25%;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 5px 1px 8px 0 rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: hidden;
    `,
    HeaderSection: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
    `,
    // 설정 버튼
    SettingBtnContainer: styled.div`
        height: 100%;
        position: relative;
        display: flex;
        justify-content: flex-end;
    `,
    SettingBtn: styled.button`
        all: unset;
        display: flex;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        margin: 8px 12px 0 0;
        box-sizing: border-box;
        color: gray;

        &:hover {
            background-color: lightgray;
            filter: brightness(1.1);
        }
        &:active {
            transform: scale(1.05);
        }

        & svg {
            width: 24px;
            height: 24px;
        }
    `,

    /** UserProfileComponent.tsx */
    // 프로필
    UserProfileContainer: styled.div`
        height: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    `,
    // 프로필 이미지
    ProfileImage: styled.div`
        position: relative;
        width: 140px;
        height: 140px;
        cursor: pointer;

        & > img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: auto;
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.3);
            object-fit: cover;
        };
    `,
    UserProfileInfo: styled.div`
        width: 100%;
        padding: 12px 0 30px 0;
        text-align: center;
    `,
    UserProfileId: styled.div`
        margin: 0;
        font-weight: bold;
        font-size: 24px;
    `,
    UserProfileEmail: styled.div`
        margin: 0;
        color: #929294;
    `,

    /** LeftMenuComponent.tsx */
    LeftMenuContainer: styled.div`
        height: 65%;
        padding: 30px 39px;
        /* padding: 3em; */
    `,
    // 왼쪽 메뉴
    LeftMenuWrapper: styled.ul`
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        & > li {
            height: calc(100% / 5 - 48px);
            margin-bottom: 30px;
            font-size: 19px;

            &:hover {
                cursor: pointer;
            }

            /* li가 클릭이 되었다면 */
            &[data-selectedmenu="true"] {
                cursor: default;

                & > span {
                    position: relative;
                    &::before {
                        content: "";
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        bottom: -7px;
                        left: 0;
                        background-color: black;
                        border-radius: 20px;
                    }
                }

            }

        };
    `,

};



export default S;