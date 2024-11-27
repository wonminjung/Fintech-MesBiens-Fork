import React from "react";
import Elements_source from "./Elements_source";
import styled from "styled-components";

const Elements: React.FC = () => {
    return (
        <>
            <div>라이브러리</div>
            <Elements_source.DefaultButton>버튼</Elements_source.DefaultButton>
        </>
    )
}

export default Elements;