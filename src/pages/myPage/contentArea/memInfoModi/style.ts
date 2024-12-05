import styled from "styled-components";

const S = {
    SelectedMenuHeaderContainer: styled.div`
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
    `,
    MenuTitle: styled.div`
        font-size: 28px;
        font-weight: bold;
    `,


    /* MemInfoModiComponent.tsx */
    FormField: styled.form``,
    FieldWrapper: styled.div`
        margin-top: 48px;
        margin-left: 32px;
    `,
    FieldTitle: styled.h2`
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 12px;
        height: 24px;
        color: var(--text-color-black);
    `,

    
};

export default S;