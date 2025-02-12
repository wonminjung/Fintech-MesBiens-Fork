import DefaultButton from "../../components/button/DefaultButton";
import "../../global/style.css";
import styled from "styled-components";

const S = {
    // MyPageContainer.tsx
    CertificationContainer: styled.div`
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 5em;
        overflow: hidden;
    `,
    CertificationWrapper: styled.div`
        width: 40%;
    `,
    HeaderWrapper: styled.div`
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #bfbfbf;
    `,
    Header: styled.h2`
        font-size: 24px;
    `,
    SubHeaderWrapper: styled.div`
        display: flex;
        justify-content: center;
        margin-top: 2.3em;
        margin-bottom: 1.7em;
    `,
    SubHeader: styled.p`
        font-size: 14px;
    `,
    InputPwdContainer: styled.div`
        width: 100%;
        height: 100px;
        border: 1px solid #e5e5e5;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    PwdLabel: styled.label`
        font-size: 15px;
        margin-right: 12px;
    `,
    InputPwdWrapper: styled.div`
        display: flex;
        align-items: center;
    `,
    InputPwd: styled.input`
        background-color: var(--forth-color);
        font-size: 18px;
        color: var(--first-color);
        border: none;
        border-radius: 8px;
        padding: 8px 12px;
        margin-right: 12px;
    `,
    ValidateBtn: styled(DefaultButton)`
        height: 37px;
    `,
};



export default S;