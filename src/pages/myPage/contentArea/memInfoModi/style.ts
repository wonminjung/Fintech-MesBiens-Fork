import styled from "styled-components";
import DefaultButton from "../../../../components/button/DefaultButton";

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
    FormField: styled.form`
    `,
    FieldWrapper: styled.div`
        margin-top: 48px;
        margin-left: 52px;
        display: flex;
        flex-direction: column;
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
    FieldTable: styled.table`
        width: 80%;
        /* border: 1px solid var(--grey); */
        border: none;
        border-collapse: collapse;
    `,
    EditBtnContainer: styled.div`
        width: 80%;
        display: flex;
        justify-content: end;
        margin-top: 32px;
    `,
    EditBtn: styled(DefaultButton)`
        font-size: 16px;
        border-radius: 8px;
        width: 12%;
        height: 42px;
        font-size: 14px;
    `,

    /* FormFiledComponent.tsx */
    FieldTr: styled.tr`
        border-top: 1px solid var(--divider-color);
        border-bottom: 1px solid var(--divider-color);

        & > td, th {
            padding: 16px 32px;
            height: 40px;
        }

        & > th {
            font-size: 15px;
            text-align: left;
            width: 20%;
        }

        & > td {
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            line-height: 40px;
        }
    `,
    FieldExistValue: styled.div`
        margin-left: 4px;
    `,
    FieldEditValue: styled.input`
        height: 32px;
    `,
    FieldEditButton: styled.button`
        width: 10%;
        background: inherit;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: #475067;

        /* &[data-editsuccess="true"] {
            color: #475067;
        } */
    `,
    
};

export default S;