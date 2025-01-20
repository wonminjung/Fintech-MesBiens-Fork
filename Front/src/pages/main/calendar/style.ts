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
    overflow: auto;
    width: 30%;
    /* border: 1px solid #ddd; */
    padding: 20px;
    border-radius: 8px;
    /* 스크롤바 */
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--scrollbar-color);
      border-radius: 12px;
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: darkgray;
    }

    &::-webkit-scrollbar-track {
      border-radius: 12px;
    }
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
  Form: styled.form`
    display: flex;
    flex-direction: space-between;
    align-items: center;
    width: 100%;
  `,
  ScheduleDetails: styled.div`
    &:h3 {
      margin-bottom: 10px;
    }
  `,
  ScheduleDetailsCell: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 0;
    border-radius: 8px;
    background: var(--forth-color);
    width: 100%;
    margin: 10px 0;
  `,
  ImgContainer: styled.div`
    width: 30px;
    height: 30px;
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 50%;
    margin: 0 20px;
  `,
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
    /* 스크롤바 */
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--scrollbar-color);
      border-radius: 12px;
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: darkgray;
    }

    &::-webkit-scrollbar-track {
      border-radius: 12px;
    }
  `,
  CalendarHeader: styled.div`
    display: flex;
    justify-content: space-between;
    border-top-left-radius: 8px;
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
    border-radius: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover,
    &.selected {
      border-radius: 8px;
    }
  `,
  CalendarBall: styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--second-color);
    color: var(--second-color);
    font-size: 0;
    margin-top: 30px;
  `,
};
