import Calendar from "react-calendar";
import styled from "styled-components";
import DefaultButton from "../../../components/button/DefaultButton";
import { InputField } from "../../../components/inputfield/style";

export const SM = {
  ScheduleManager: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  `,
  ScheduleContainer: styled.div`
    width: 30%;
    /* border: 1px solid #ddd; */
    padding: 20px;
    border-radius: 8px;
  `,
  Button: styled(DefaultButton)`
    font-size: 15px;
    width: 60px;
    height: 35px;
  `,
  TextInput: styled(InputField)`
    width: 80%;
    margin-right: 20px;
  `,
  // ScheduleDetails: styled.div`
  //   &:h3 {
  //     margin-bottom: 10px;
  //   }
  //   &:form {
  //     display: flex;
  //     gap: 10px;
  //     margin-bottom: 20px;
  //     & input {
  //       flex: 1;
  //       padding: 8px;
  //       border: 1px solid #ddd;
  //       border-radius: 4px;
  //     }
  //     & button {
  //       padding: 8px 12px;
  //       background-color: #007bff;
  //       color: white;
  //       border: none;
  //       border-radius: 4px;
  //       cursor: pointer;
  //     }
  //     & ul {
  //       list-style: none;
  //       padding: 0;
  //       & li {
  //         padding: 5px 0;
  //       }
  //     }
  //     & p {
  //       color: #888;
  //     }
  //   }
  // `,
};

export const C = {
  Calendar: styled.div`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: var(--container-color);
    /* box-sizing: border-box; */
  `,
  CalendarHeader: styled.div`
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    align-items: center;
    padding: 10px 20px;
    background-color: #f7f7f7;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
  `,

  CalendarHeaderButton: styled.button`
    background: none;
    border: none;
    font-size: 1.5em;
    color: #333;
    cursor: pointer;
    outline: none;
    &:hover {
      color: var(--third-color);
    }
  `,
  CalendarDayCellButton: styled.div`
    height: 4.3em;
    border: none;
    border-radius: 8px;
  `,
};
