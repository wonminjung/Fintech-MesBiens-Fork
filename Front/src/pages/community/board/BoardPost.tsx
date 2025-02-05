// import React, { useState, useEffect } from "react";
// import { BP } from "./style";
// import { useNavigate, useParams } from "react-router-dom";
// import { H1 } from "../../../components/htags/style";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

// type BoardInfo = {
//   bno: number;
//   bname: string;
//   btitle: string;
//   bcont: string;
//   bhit: number;
//   date?: string; // Optional date field
//   comments?: Array<{ author: string; date: string; text: string }>; // Optional comments field
// };

// const BoardPost: React.FC = () => {
//   const { bno } = useParams<{ bno: string }>(); // URL에서 bno 가져오기
//   const [buttonVisible, setButtonVisible] = useState(false);
//   const [board, setBoard] = useState<BoardInfo | null>(null);

//   const handleThreeDots = () => {
//     setButtonVisible(!buttonVisible);
//   };

//   const fetchBoardData = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.PUBLIC_URL}/dummyDatas/boardData.json`
//       );
//       const data: BoardInfo[] = await response.json();
//       const foundBoard = data.find((b) => b.bno.toString() === bno);
//       setBoard(foundBoard || null);
//     } catch (error) {
//       console.error("Error fetching board data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBoardData();
//   }, [bno]);

//   if (!board) {
//     return <p>Loading...</p>; // 데이터 로딩 중 표시할 내용
//   }

//   return (
//     <BP.PostContainer>
//       {/* Title and Author Section */}
//       <BP.PostHeader>
//         <H1>{board.btitle || "민지는 우리팀 기술이사"}</H1>
//         <BP.PostActions>
//           <BP.PWriter>작성자: </BP.PWriter>
//           <BP.PWriterName>{board.bname || "홍철"}</BP.PWriterName>
//           <BP.ThreeDotContainer>
//             <BP.ThreeDotBtn onClick={handleThreeDots}>
//               <FontAwesomeIcon icon={faEllipsisVertical} />
//             </BP.ThreeDotBtn>
//           </BP.ThreeDotContainer>
//           {buttonVisible && (
//             <BP.ActionButtons>
//               <BP.Button>수정</BP.Button>
//               <BP.Button>삭제</BP.Button>
//             </BP.ActionButtons>
//           )}
//         </BP.PostActions>
//       </BP.PostHeader>

//       {/* Post Date */}
//       <BP.PostDate>
//         등록일: <span>{board.date || "2024-10-31 22:31:54"}</span>
//       </BP.PostDate>

//       {/* Post Content */}
//       <BP.PostContent>
//         {board.bcont || "민지는 TB조의 기술이사 이자 실질적인 팀장이죠"}
//       </BP.PostContent>

//       {/* Comment Section */}
//       <BP.CommentsSection>
//         <BP.h3>댓글</BP.h3>
//         {board.comments && board.comments.length > 0 ? (
//           board.comments.map((comment, index) => (
//             <BP.Comment key={index}>
//               <BP.CommentInfo>
//                 {comment.author} | {comment.date}
//               </BP.CommentInfo>
//               <p>{comment.text}</p>
//               <BP.CommentActions>
//                 <BP.CommentLike>
//                   <BP.Img
//                     src={`${process.env.PUBLIC_URL}/images/heart-fill.svg`}
//                     alt="Like"
//                   />
//                 </BP.CommentLike>
//                 <BP.Button>수정</BP.Button>
//                 <BP.Button>삭제</BP.Button>
//               </BP.CommentActions>
//             </BP.Comment>
//           ))
//         ) : (
//           <p>No comments available.</p>
//         )}
//       </BP.CommentsSection>
//     </BP.PostContainer>
//   );
// };

// export default BoardPost;
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { H1 } from "../../../components/htags/style";
import AddComment from "./AddComment"; // 추가된 컴포넌트
import { BP } from "./style";

// 게시글 타입 정의
interface Member {
  memberNo: number;
  memberName: string;
}

interface PostComment {
  postCommentNo: number;
  postCommentContent: string;
  postCommentDate: string;
  member: Member;
}

interface Post {
  postNo: number;
  postTitle: string;
  postCont: string;
  postHit: number;
  postDate: string;
  member: Member;
  postFilePath?: string; // 첨부파일 경로 (선택적 속성)
  postFileName?: string; // 첨부파일 이름 (선택적 속성)
  postFileType?: string; // 첨부파일 타입 (선택적 속성)
}

interface ApiResponse {
  post: Post;
  postcomments: PostComment[];
}

const BoardPost: React.FC = () => {
  const { postNo } = useParams<{ postNo: string }>();
  const navigate = useNavigate();
  const [buttonVisible, setButtonVisible] = useState(false);
  const [board, setBoard] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editMemberNo, setEditMemberNo] = useState(board?.member.memberNo || "");
  const [editMemberName, setEditMemberName] = useState(board?.member.memberName || "");
  const [uploadFile, setUploadFile] = useState<File | null>(null); // 파일 상태

  const handleThreeDots = () => {
    setButtonVisible(!buttonVisible);
  };

  // 게시글 보기
  const handleGoBack = () => {
    navigate("/community/C_board"); // 목록으로 돌아가는 기능
  };

  const fetchBoardData = async () => {
    try {
      if (!postNo) {
        console.error("postNo가 없습니다.");
        return; // postNo가 없으면 API 호출하지 않음
      }

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/community/C_board/${postNo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("받은 데이터:", data);
        setBoard(data.post);
        setComments(data.postcomments);
      } else {
        console.error("API 요청 실패:", response.status);
      }
    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };

  // 게시글 수정
  const handleEdit = () => {

    if(!board) return;

    setIsEditing(true);
    setEditTitle(board?.postTitle || "");
    setEditContent(board?.postCont || "");
    setEditMemberNo(board?.member.memberNo);
    setEditMemberName(board?.member.memberName);
    setIsEditing(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  // 게시글 수정후 저장
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("postTitle", editTitle);
    formData.append("postCont", editContent);
    formData.append("memberNo", editMemberNo.toString());
    formData.append("memberName", editMemberName);
    if (uploadFile) {
      formData.append("uploadFile", uploadFile);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/community/C_board/${postNo}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("게시글 수정 성공");
        setIsEditing(false);
        fetchBoardData(); // 수정 후 데이터 새로고침
      } else {
        const errorData = await response.text();
        console.error("게시글 수정 실패");
      }
    } catch (error) {
      console.error("게시글 수정 중 에러 발생:", error);
    }
  };

  // 게시글 삭제제
  const handleDelete = async () => {
    const postPassword = prompt("게시글 비밀번호를 입력하세요:");
    const memberNo = prompt("회원 번호를 입력하세요:");
  
    if (!postPassword || !memberNo) {
      alert("비밀번호와 회원 번호를 입력해야 합니다.");
      return;
    }
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/community/C_board/${postNo}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postPassword: postPassword,
            memberNo: memberNo,
          }),
        }
      );
  
      if (response.ok) {
        alert("게시글이 성공적으로 삭제되었습니다.");
        navigate("/community/C_board"); // 삭제 후 목록으로 이동
      } else if (response.status === 403) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        const errorData = await response.text();
        console.error("게시글 삭제 실패:", errorData);
      }
    } catch (error) {
      console.error("게시글 삭제 중 에러 발생:", error);
    }
  };
  

  useEffect(() => {
    fetchBoardData();
  }, [postNo]);

  if (!board) {
    return <p>Loading...</p>;
  }

  return (
    <BP.PostContainer>
      <BP.PostHeader>
        <H1>{isEditing ? <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /> : board.postTitle}</H1>
        <BP.PostActions>
          <BP.Button onClick={handleGoBack}>목록</BP.Button>
          <BP.PWriter>작성자: </BP.PWriter>
          <BP.PWriterName>{board.member.memberName}</BP.PWriterName>
          <BP.ThreeDotContainer>
            <BP.ThreeDotBtn onClick={handleThreeDots}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </BP.ThreeDotBtn>
          </BP.ThreeDotContainer>
          {buttonVisible && (
            <BP.ActionButtons>
              <BP.Button onClick={handleEdit}>수정</BP.Button>
              <BP.Button onClick={handleDelete}>삭제</BP.Button>
            </BP.ActionButtons>
          )}
        </BP.PostActions>
      </BP.PostHeader>

      <BP.PostDate>
        등록일: <span>{new Date(board.postDate).toLocaleString()}</span>
      </BP.PostDate>

      <BP.PostContent>
        {isEditing ? (
          <>
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
            <input
              type="text"
              placeholder="회원 번호"
              value={editMemberNo}
              onChange={(e) => setEditMemberNo(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} />
            <BP.Button onClick={handleSave}>저장</BP.Button>
          </>
        ) : (
          <>
            <p>{board.postCont}</p>

            {/* 첨부파일이 있을 경우 표시 */}
            {board.postFilePath && board.postFileName && (
              <BP.FileSection>
                <p>첨부파일:</p>
                <a
                  href={`${process.env.REACT_APP_SERVER_URL}/upload${board.postFilePath}`}
                  // href={`${process.env.Spring_SERVER_URL}/upload${board.postFilePath}`}
                  download={board.postFileName}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {board.postFileName}
                </a>
              </BP.FileSection>
            )}
          </>
        )}
      </BP.PostContent>


      <BP.CommentsSection>
        <BP.h3>댓글</BP.h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <BP.Comment key={comment.postCommentNo}>
              <BP.CommentInfo>
                {comment.member.memberName} | {new Date(comment.postCommentDate).toLocaleString()}
              </BP.CommentInfo>
              <p>{comment.postCommentContent}</p>
              <BP.CommentActions>
                <BP.Button>수정</BP.Button>
                <BP.Button>삭제</BP.Button>
              </BP.CommentActions>
            </BP.Comment>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
        <BP.AddCommentContainer>
          {/* 댓글 작성 컴포넌트 추가 */}
          <AddComment
            postNo={parseInt(postNo!)}
            onCommentAdded={fetchBoardData} // 댓글 작성 후 새로고침
          />
        </BP.AddCommentContainer>
      </BP.CommentsSection>
    </BP.PostContainer>
  );
};

export default BoardPost;