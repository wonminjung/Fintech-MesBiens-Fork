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
    `,
    HeaderSection: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;     
    `,
    // 설정 버튼
    SettingBtnContainer: styled.div`
        position: relative;
        height: 44px;
    `,
    SettingBtn: styled.div`
        position: absolute;
        right: 12px;
        top: 8px;
        width: 34px;
        height: 34px;
        background-color: purple;
        border-radius: 50%;
        cursor: pointer;
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
    `,
    // 왼쪽 메뉴
    LeftMenuWrapper: styled.ul`
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: center;

        & > li {
            height: calc(100% / 5 - 48px);
            margin-bottom: 30px;
            font-size: 19px;

            & > a {
                position: relative;
                color: black;
                text-decoration: none;

                /* 선택된 메뉴 */
                &.selected {
                    cursor: default;
                };

                /* 메뉴에 마우스 올렸을 때, 선택됐을 때 밑줄 표시 */
                &:hover::before, &.selected::before {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    bottom: -7px;
                    background-color: black;
                    border-radius: 20px;
                };

            };
        };
    `,

};



export default S;