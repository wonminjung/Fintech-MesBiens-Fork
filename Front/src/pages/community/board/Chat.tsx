import React, { useEffect, useState } from "react";
import { BC, C } from "./style";
import { H2 } from "../../../components/htags/style";
import HorizontalDivider from "../../../components/divider/HorizontalDivider";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules/store/store";

type ChatInfo = {
  chatNo: number;
  memberNo: number;
  chatSessionId: string;
  chatContent: string;
  chatTime: string;
};

type ChatRequestDTO = {
  memberNo: number;
  chatSessionId: string;
  chatContent: string;
};

// ✅ ChatArea 컴포넌트
export const ChatContent: React.FC = () => {
  const [chats, setChats] = useState<ChatInfo[]>([]); // 여러 개의 채팅 정보를 위한 상태
  const [message, setMessage] = useState(""); // 사용자가 입력한 메시지
  const [chatSessionId, setChatSessionId] = useState(""); // 채팅 세션 아이디
  const memberNo = useSelector((state: RootState) => state.user.member.memberNo);

  console.log("memberNo" + memberNo);

  const fetchChatData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/community/chat/messages`, {
        method: "GET",
        credentials: "include",
      });

      const text = await response.text();  // 응답을 먼저 텍스트로 받아보기
      console.log("서버 응답:", text);  // 응답을 콘솔에 출력


      if (!response.ok) {
        throw new Error("네트워크 응답이 좋지 않습니다.");
      }

      const data = JSON.parse(text);  // JSON 변환 시도
      // const data = await response.json();

      if (data.error) {
        console.error("❌ 로그인 필요:", data.error);
        return;
      }

      setChats(data.chatMessages); // 🔹 채팅 메시지 목록 설정
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };


  // ✅ 메시지 전송 (POST 요청)
  const handleSendMessage = async () => {
    if (!message.trim()) return; // 빈 메시지 방지

    const chatData = {
      memberNo: Number(memberNo), // 현재 로그인된 유저 ID
      chatSessionId: chatSessionId, // 채팅 세션 ID
      chatContent: message,
    };

    // console.log("전송 데이터:", JSON.stringify(chatData));

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/community/chat/send`
        , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chatData),
          credentials: "include", // ✅ CORS에서 쿠키 전송 허용
          mode: "cors",
        });

      if (!response.ok) {
        throw new Error("메시지 전송 실패");
      }
      // console.log(chatData.chatContent);

      fetchChatData(); // ✅ 전송 후 채팅 목록 갱신
      setMessage(""); // 입력 필드 초기화
    } catch (error) {
      console.error("채팅 메시지 전송 오류:", error);
    }
  };

  useEffect(() => {
    fetchChatData(); // 처음 마운트 시 즉시 데이터 불러오기

    const interval = setInterval(() => {
      fetchChatData();
    }, 30000); // 30초마다 실행

    return () => clearInterval(interval); // 언마운트 시 인터벌 제거
  }, []);




  return (
    <BC.ChatArea>
      <H2>채팅</H2>
      <HorizontalDivider />
      <C.ChatContainer>
        <C.ChatUl>
          {chats.map((chat) => (
            <C.ChatLi key={chat.chatNo}>
              <C.Anonymous>익명{chat.chatSessionId}</C.Anonymous>: {chat.chatContent}
            </C.ChatLi>
          ))}
        </C.ChatUl>
      </C.ChatContainer>
      <BC.ChatWrapper>
        <HorizontalDivider />
        <BC.Chat>
          <BC.ChatInput
            placeholder="입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <BC.ChatBtn onClick={handleSendMessage}>전송</BC.ChatBtn>
        </BC.Chat>
      </BC.ChatWrapper>
    </BC.ChatArea>
  );
};



export default ChatContent;
