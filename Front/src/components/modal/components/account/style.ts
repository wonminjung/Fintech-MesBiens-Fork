import { styled } from "styled-components";
import DefaultButton from "../../../button/DefaultButton";

const S = {
    AddAccountContainer: styled.div`
        width: 400px;
        height: 400px;
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
    FormBody: styled.form`
        padding-left: 52px;
        margin-bottom: 32px;
    `,
    FieldContainer: styled.div`
        margin-bottom: 22px;
    `,
    FieldLabel: styled.label`
        margin-right: 12px;
    `,
    FieldInput: styled.input`
        
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
};

export default S;