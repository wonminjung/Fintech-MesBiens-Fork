import React, { useEffect, useState } from "react";
import { C } from "./style";

type ChatInfo = {
  anonymous: string;
  message: string;
};

const ChatContent: React.FC = () => {
  const [chats, setChats] = useState<ChatInfo[]>([]); // 여러 개의 채팅 정보를 위한 상태

  const fetchChatData = async () => {
    try {
      const response = await fetch(
        `${process.env.PUBLIC_URL}/dummyDatas/chatData.json`
      );
      if (!response.ok) {
        throw new Error("네트워크 응답이 좋지 않습니다.");
      }
      const data: ChatInfo[] = await response.json(); // 배열 형태로 데이터 가져오기
      setChats(data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchChatData();
  }, []);

  return (
    <C.ChatUl>
      {chats.map((chat, index) => (
        <C.ChatLi key={index}>
          <C.Anonymous>{chat.anonymous}</C.Anonymous>: {chat.message}
        </C.ChatLi>
      ))}
    </C.ChatUl>
  );
};

export default ChatContent;
