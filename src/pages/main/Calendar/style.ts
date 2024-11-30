import React from "react";
import styled from "styled-components";

const C = {
  Calendar: styled.div`
    display: inline-block;
    border-radius: var(--container-border-radius);
    padding: 1em;
    width: 60%;
    height: 90%;
    background-color: var(--container-color);
  `,
  Month: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Days: styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-bottom: 2px solid var(--light-grey);
    padding: 2px;
  `,
  Day: styled.div`
    padding: 5px;
    text-align: center;
    font-weight: bold;
  `,
  DateGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 2px;
  `,
};

export default C;
