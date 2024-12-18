import styled from "styled-components";
import DefaultButton from "../../../components/button/DefaultButton";
import DefaultInputField from "../../../components/inputfield/InputField";
import PlainButton from "../../../components/button/PlainButton";

export const BC = {
  Board: styled.div`
    display: flex;
    width: 100%;
    height: 85%;
  `,

  /* Board */
  BoardContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 100%;
    padding: var(--default-padding);
    border-radius: var(--container-border-radius);
    box-sizing: border-box; // 생성하는 박스는 margin을 포함하여 전체 사이즈를 지정 */
  `,
  HeaderContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Button: styled(DefaultButton)`
    /* height: 30px; */
  `,
  BoardTable: styled.table`
    width: 100%;
    border-collapse: collapse;
    flex-grow: 0;
    text-align: center;
    & th,
    td {
      padding: var(--default-padding);
      border-bottom: 1px solid var(--forth-color);
    }
  `,
  tr: styled.tr`
    background: var(--third-color);
    /* border-radius: 20px; */
  `,
  trcont: styled.tr`
    &:hover {
      background: var(--forth-color);
    }
  `,
  th: styled.th`
    width: 2em;
  `,
  td: styled.td`
    width: 2em;
  `,
  tdtitle: styled.td`
    width: 2em;
    /* text-align: center; */
    white-space: nowrap; // 텍스트가 한 줄에만 표시되도록
    overflow: hidden; // 박스를 넘는 부분 숨기기
    text-overflow: ellipsis; // 넘치는 부분을 ...으로 표시
    max-width: 100px;
    &:hover {
      cursor: pointer;
    }
  `,

  /* Pagination */
  PaginationWrapper: styled.div`
    margin-top: auto;
    text-align: center;
    padding-top: 15px;
  `,
  Pagination: styled.div`
    text-align: center;
    padding-bottom: 1em;
    & a {
      margin: 0 5px;
      text-decoration: none;
      color: var(--button-color);
      &:hover {
        color: var(--button-hover-color);
      }
    }
  `,

  /* Chat */
  ChatArea: styled.div`
    position: relative;
    width: 35%;
    height: 100%;
    padding: var(--default-padding);
    overflow-y: auto; // 채팅이 많아지면 스크롤바 생성
    border-radius: var(--container-border-radius);
    box-sizing: border-box; // 생성하는 박스는 margin을 포함하여 전체 사이즈를 지정 */
  `,
  ChatMessage: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    height: 2em;
  `,
  ChatAnonymous: styled.p`
    font-weight: bold;
    color: var(--button-color);
    margin-right: 10px;
    flex-shrink: 0; // 사용자 이름이 잘리는 것을 방지
    width: 90px; // 정렬을 위한 고정 너비
    text-align: left;
  `,
  ChatAnoymousMessage: styled.p`
    color: var(--text-color-grey);
    background: var(--container-color);
    padding: 5px 10px;
    border-radius: 4px;
    max-width: 70%;
    word-wrap: break-word; // 긴 단어 줄바꿈
  `,
  ChatWrapper: styled.div`
    position: absolute;
    bottom: 10px;
    left: 0%;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  `,
  /* 채팅 입력창과 전송 버튼 */
  Chat: styled.div`
    display: flex;
    margin-top: 10px;
    align-items: center;
  `,
  ChatInput: styled(DefaultInputField)`
    flex: 1;
    padding: 8px;
    border-bottom: 1px solid var(--border-color);
    /* border-radius: 4px; */
  `,
  ChatBtn: styled(PlainButton)`
    margin-left: 5px;
    &:hover {
      background-color: var(--button-hover-color);
      color: white;
    }
  `,
};

export const BP = {
  PostContainer: styled.div`
    height: 100%;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    overflow: hidden;
  `,
  PostHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border-bottom: 2px solid var(--grey); */
    padding-bottom: var(--padding-small-size);
    height: 3em;
    border-bottom: 2px solid #e0e0e0;
  `,
  h2: styled.h2`
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
    margin: 0;
    /* white-space: nowrap; */
  `,
  PostActions: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    /* position: relative; */
  `,
  pWriter: styled.p`
    font-weight: bold;
    color: #555;
  `,
  pWriterName: styled.p`
    white-space: nowrap;
    /* padding-left: 1em; */
    font-size: 1em;
  `,
  ThreeDotContainer: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    /* padding-left: 3em; */
    /* padding-bottom: 3em; */
    font-size: 1.5em;
    /* position: absolute; */
  `,
  ActionButtons: styled.div`
    display: flex;
    /* flex-direction: column; */
    margin-left: 10px;
    position: absolute;
    top: 270px;
    background-color: var(--white);
  `,
  button: styled(DefaultButton)`
    width: 3em;
    height: 2em;
    font-size: 15px;
    margin-right: 5px;
  `,
  PostDate: styled.div`
    margin-top: 15px;
    font-size: 0.9em;
    color: #888;
    & span {
      font-weight: bold;
      color: #333;
    }
  `,
  PostContent: styled.div`
    margin-top: 20px;
    font-size: 1em;
    line-height: 1.6;
    color: #444;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  `,
  CommentsSection: styled.div`
    margin-top: 30px;
    padding-top: 15px;
    border-top: 2px solid #e0e0e0;
  `,
  h3: styled.h3`
    font-size: 1.2em;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  `,
  Comment: styled.div`
    padding: 15px;
    margin-top: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    & p {
      margin: 5px 0;
    }
  `,
  CommentInfo: styled.div`
    font-weight: bold;
    color: #555;
    margin-bottom: 5px;
  `,
  CommentActions: styled.div`
    display: flex;
    /* gap: 2px; */
    justify-content: flex-end;
  `,
  CommentLike: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
  `,
  img: styled.img`
    width: 20px;
  `,
};
