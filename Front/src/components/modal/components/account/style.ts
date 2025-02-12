import { styled } from "styled-components";
import DefaultButton from "../../../button/DefaultButton";
import DefaultInputField from "../../../inputfield/InputField";

const S = {
    /** AddAccount.tsx */
    Container: styled.div`
        width: 450px;
        height: 450px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `,
    Header: styled.div`
        display: flex;
        justify-content: space-between;
    `,
    Title: styled.h2`
        margin-left: 16px;
    `,
    CloseBtn: styled.button`
        all: unset;
        display: flex;
        flex-direction: column;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        padding: 5px;
        margin: 8px;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
            background-color: lightgray;
            filter: brightness(1.1);
        }
        
        &:active {
            transform: scale(1.05);
        }
    `,
    Form: styled.form`
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `,
    FormBody: styled.div`
        display: flex;
        justify-content: center;
    `,
    FieldContainer: styled.tr`
        width: 300px;
        & > th {
            width: 40%;
            text-align: left;
        }

        & > th, td {
            padding: 10px 2px;
        }
    `,
    FieldLabel: styled.label`
        /* margin-right: 12px; */
    `,
    SelectBank: styled.select`
        padding: 12px 40px;
        border-radius: 8px;
    `,
    FieldInput: styled(DefaultInputField)`
        width: 100%;
        height: 42px;
        border: 1px solid black;
        border-radius: 8px;
        padding: 2px 18px;
        
    `,
    Footer: styled.div`
        display: flex;
        justify-content: center;
    `,
    SubmitBtn: styled(DefaultButton)`
      font-size: 15px;
      width: 80%;
      height: 35px;
      margin-bottom: 20px;
    `,

    /** ModiAccount.tsx */

};

export default S;