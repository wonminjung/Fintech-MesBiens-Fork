import styled from "styled-components";

const S = {
    LoginContainer: styled.div`
        display: flex;
        flex-direction: column;
        margin-top: 5%;
        max-width: 500px;
        width: 100%;
        height: 100%;
    `,
    LoginContainer_top: styled.div`
        text-align: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border-radius: var(--container-top-border-radius);
        .top {
            background: var(--gradient);
            align-items: center;
            color: white;
            padding: 20px;
            border-radius: var(--container-top-border-radius);
        }
    `,
    LoginContainer_bottom: styled.div`
        background-color: var(--bg-color);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border-radius: var(--container-bottom-border-radius);
        .bottom {
            background: var(--white);
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 40px;
            border-radius: var(--container-bottom-border-radius);
        }
    `,

    Checkbox: styled.div`
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        margin-left: 10%;
        color: var(--text-color-grey);
        .remember {
            display: flex;
            & p {
                margin-left: 10px;
            }
        }
    `
}

export default S;