import { styled } from "styled-components";
import DefaultButton from "../../../button/DefaultButton";


const S = {
    ProfileSetContainer: styled.div`
        width: 400px;
        height: 420px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `,
    ProfileHeader: styled.div`
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
    ProfileForm: styled.form`
        height: 75%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `,
    ProfileBody: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    ProfileImageContainer: styled.div`
        position: relative;
        aspect-ratio: 1/1;
        width: 140px;
        height: 140px;
        border: 1px solid gray;
        border-radius: 50%;
        box-sizing: border-box;
        margin-bottom: 18px;
    `,
    ProfileLabel: styled.label`
        display: inline;
        cursor: pointer;
    `,
    ProfileImage: styled.img`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    `,
    ImageUpload: styled.input`
        display: none;
    `,
    ImageUploadBtn: styled.div`
        all: unset;
        display: flex;
        width: 32px;
        height: 32px;
        right: 4px;
        bottom: 2px;
        position: absolute;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        border: 1px solid gray;
        background-color: white;
    `,
    UserName: styled.div`
        margin: 0;
        font-weight: bold;
        font-size: 24px;
    `,
    UserEmail: styled.div`
        margin: 0;
        color: #929294;
    `,
    ProfileFooter: styled.div`
        width: 100%;
        display: flex;
        justify-content: center;
    `,
    ProfileSubmitBtn: styled(DefaultButton)`
        font-size: 15px;
        width: 80%;
        height: 35px;
        margin-bottom: 20px;
    `,
};

export default S;