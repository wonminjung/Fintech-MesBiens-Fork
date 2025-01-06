import React, { useState, useEffect } from "react";
import { BP } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { H1 } from "../../../components/htags/style";

type BoardInfo = {
  bno: number;
  bname: string;
  btitle: string;
  bcont: string;
  bhit: number;
  date?: string; // Optional date field
  comments?: Array<{ author: string; date: string; text: string }>; // Optional comments field
};

const BoardPost: React.FC = () => {
  const { bno } = useParams<{ bno: string }>(); // URL에서 bno 가져오기
  const [buttonVisible, setButtonVisible] = useState(false);
  const [board, setBoard] = useState<BoardInfo | null>(null);

  const handleThreeDots = () => {
    setButtonVisible(!buttonVisible);
  };

  const fetchBoardData = async () => {
    try {
      const response = await fetch(
        `${process.env.PUBLIC_URL}/dummyDatas/boardData.json`
      );
      const data: BoardInfo[] = await response.json();
      const foundBoard = data.find((b) => b.bno.toString() === bno);
      setBoard(foundBoard || null);
    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, [bno]);

  if (!board) {
    return <p>Loading...</p>; // 데이터 로딩 중 표시할 내용
  }

  return (
    <BP.PostContainer>
      {/* Title and Author Section */}
      <BP.PostHeader>
        <H1>{board.btitle || "민지는 우리팀 기술이사"}</H1>
        <BP.PostActions>
          <BP.pWriter>작성자: </BP.pWriter>
          <BP.pWriterName>{board.bname || "홍철"}</BP.pWriterName>
          <BP.ThreeDotContainer>
            <img
              src={`${process.env.PUBLIC_URL}/images/three-dots-vertical.svg`}
              onClick={handleThreeDots}
              alt="Options"
            />
          </BP.ThreeDotContainer>
          {buttonVisible && (
            <BP.ActionButtons>
              <BP.Button>수정</BP.Button>
              <BP.Button>삭제</BP.Button>
            </BP.ActionButtons>
          )}
        </BP.PostActions>
      </BP.PostHeader>

      {/* Post Date */}
      <BP.PostDate>
        등록일: <span>{board.date || "2024-10-31 22:31:54"}</span>
      </BP.PostDate>

      {/* Post Content */}
      <BP.PostContent>
        {board.bcont || "민지는 TB조의 기술이사 이자 실질적인 팀장이죠"}
      </BP.PostContent>

      {/* Comment Section */}
      <BP.CommentsSection>
        <BP.h3>댓글</BP.h3>
        {board.comments && board.comments.length > 0 ? (
          board.comments.map((comment, index) => (
            <BP.Comment key={index}>
              <BP.CommentInfo>
                {comment.author} | {comment.date}
              </BP.CommentInfo>
              <p>{comment.text}</p>
              <BP.CommentActions>
                <BP.CommentLike>
                  <BP.Img
                    src={`${process.env.PUBLIC_URL}/images/heart-fill.svg`}
                    alt="Like"
                  />
                </BP.CommentLike>
                <BP.Button>수정</BP.Button>
                <BP.Button>삭제</BP.Button>
              </BP.CommentActions>
            </BP.Comment>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </BP.CommentsSection>
    </BP.PostContainer>
  );
};

export default BoardPost;
