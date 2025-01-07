import styled from "styled-components";

const S = {
    /** SecurityContainer.tsx */
    SelectedMenuHeaderContainer: styled.div`
        display: flex;
        flex-direction: column;
        height: 100%;
    `,
    MenuTitle: styled.div`
        font-size: 28px;
        font-weight: bold;
    `,

    /** ChangePwdComponent.tsx */
    ChangePwdWrapper: styled.div`
        width: 500px;
        margin: 48px 0 0 52px;
    `,

    /** AuthenticationComponent.tsx */
    AuthContainer: styled.div`
        height: 100%;
        margin-top: 48px;
        margin-left: 52px;
        background: gray;
    `,
    FieldTitle: styled.h2`
        font-size: 16px;
        line-height: 1.5;
        margin-top: 0;
        margin-bottom: 12px;
        height: 24px;
        font-weight: 400;
        color: var(--text-color-black);
    `,
};

export default S;