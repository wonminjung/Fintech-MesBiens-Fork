import styled from "styled-components";

const L = {
    Body: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    LoginContainer: styled.div`
        display: flex;
        flex-direction: column;
        margin-top: 60px;
        max-width: 500px;
        width: 450px;
        height: 100%;
    `,
    LoginContainer_top: styled.div`
        text-align: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border-radius: var(--container-top-border-radius);
        background: var(--gradient);
        align-items: center;
        color: var(--white);
        padding: 20px;
    `,
    LoginContainer_bottom: styled.div`
        background-color: var(--bg-color);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border-radius: var(--container-bottom-border-radius);
        background: var(--white);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 40px 40px 40px;
    `,
    RememberMe: styled.div`
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        margin-left: 10%;
        color: var(--text-color-grey);
    `,
    Checkbox: styled.input`
        display: none; /* 기본 체크박스 숨기기 */
        & + label {
            position: relative;
            padding-left: 25px; /* 체크박스 공간 */
            cursor: pointer;
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 20px; /* 체크박스 크기 */
                height: 20px; /* 체크박스 크기 */
                border: 2px solid var(--third-color); /* 테두리 색 */
                border-radius: 8px; /* 모서리 둥글게 */
                background-color: white; /* 배경색 */
                transition: background-color 0.3s, border-color 0.3s; /* 애니메이션 효과 */
            }
    `,
    SignUp: styled.div`
        display: flex;
        flex-direction: column; /* 세로 방향으로 나열 */
        justify-content: space-between;
        text-align: left;
        width: 80%;
        & a {
            text-align: right;
            text-decoration: none;
            color: var(--text-color-dark);
            &:hover {
                text-decoration: underline;
            }
        }
    `,
    IntroPage: styled.div`
        display: flex;
        justify-content: right;
        width: 90%;
        & a {
            text-decoration: none;
            color: var(--text-color-dark);
            &:hover {
                text-decoration: underline;
            }
        }
    `,
    P_tag: styled.p`
        //margin-bottom: 20px;
        font-size: 1em;
        color: var(--text-color-grey);
    `,
}

export default L;