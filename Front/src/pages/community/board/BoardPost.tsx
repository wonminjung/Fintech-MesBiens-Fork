import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { H1 } from "../../../components/htags/style";
import { RootState } from "../../../modules/store/store";
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
  const {member} = useSelector((state: RootState) => state.user);
  const { postNo } = useParams<{ postNo: string }>();
  const navigate = useNavigate();
  const [buttonVisible, setButtonVisible] = useState(false);
  const [board, setBoard] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  // const [editMemberNo, setEditMemberNo] = useState(board?.member.memberNo || "");
  // const [editMemberName, setEditMemberName] = useState(board?.member.memberName || "");
  const [uploadFile, setUploadFile] = useState<File | null>(null); // 파일 상태
  const [editingCommentNo, setEditingCommentNo] = useState<number | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState(""); // 댓글수정정

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
        // console.log(data.post.postFileName);
        // console.log(data.post.postFilePath);
        // console.log(data.post.postFileType);
      } else {
        console.error("API 요청 실패:", response.status);
      }
    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };

  // 게시글 수정
  const handleEdit = () => {
    // console.log(board?.member.memberNo)
    if (!board) return;

    // 현재 로그인한 사용자의 memberNo와 게시글 작성자의 memberNo 비교
    if (member?.memberNo !== board.member.memberNo) {
      alert("작성자만 수정할 수 있습니다.");
      return;
    }

    setIsEditing(true);
    setEditTitle(board?.postTitle || "");
    setEditContent(board?.postCont || "");
    // setEditMemberNo(board?.member.memberNo);
    // setEditMemberName(board?.member.memberName);
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
    formData.append("memberNo", member?.memberNo.toString());
    formData.append("memberName", member?.memberName);
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
        console.error("게시글 수정 실패", errorData);
      }
    } catch (error) {
      console.error("게시글 수정 중 에러 발생:", error);
    }
  };

  // 게시글 삭제
  const handleDelete = async () => {
    if (!board) return;

    // 현재 로그인한 사용자의 memberNo와 게시글 작성자의 memberNo 비교
    if (member?.memberNo !== board.member.memberNo) {
      alert("작성자만 수정할 수 있습니다.");
      return;
    }
    
    const postPassword = prompt("게시글 비밀번호를 입력하세요:");
    // const memberNo = prompt("회원 번호를 입력하세요:");
    // console.log(board?.member.memberNo)



    

    if (!postPassword) {
      alert("비밀번호를 입력해야 합니다.");
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
            memberNo: member?.memberNo,
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

  // 댓글수정
  const handleEditComment = (commentNo: number, content: string) => {
    if (!comments) return;
  
    // 현재 로그인한 사용자의 memberNo와 댓글 작성자의 memberNo 비교
    const comment = comments.find(c => c.postCommentNo === commentNo);
    if (!comment || member?.memberNo !== comment.member.memberNo) {
      alert("작성자만 수정할 수 있습니다.");
      return;
    }
  
    // 기존 댓글 내용을 수정할 수 있도록 상태 업데이트
    setEditingCommentNo(commentNo); // 수정할 댓글 번호 설정
    setEditingCommentContent(content); // 기존 댓글 내용 입력창에 채워 넣기
  };
  
  // 댓글 수정후 저장
  const handleSaveCommentEdit = async (commentNo: number) => {
    const postCommentPassword = prompt("댓글 비밀번호를 입력하세요:");
    if (!postCommentPassword) {
      alert("비밀번호를 입력해야 합니다.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/community/C_board/${postNo}/${commentNo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postCommentContent: editingCommentContent,
          postCommentPassword: postCommentPassword, // 비밀번호 추가
        }),
      });
  
      if (response.ok) {
        alert("댓글이 수정되었습니다.");
        setEditingCommentNo(null); // 수정 모드 종료
        fetchBoardData(); // 댓글 목록 갱신
      } else if (response.status === 403) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        console.error("댓글 수정 실패:", await response.text());
      }
    } catch (error) {
      console.error("댓글 수정 중 에러 발생:", error);
    }
  };
  

  // 댓글 삭제
  const handleDeleteComment = async (commentNo: number) => {
    const postCommentPassword = prompt("댓글 비밀번호를 입력하세요:");
    if (!postCommentPassword) {
      alert("비밀번호를 입력해야 합니다.");
      return;
    }
  
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
  
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/community/C_board/${postNo}/${commentNo}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postCommentPassword: postCommentPassword, // 비밀번호 추가
        }),
      });
  
      if (response.ok) {
        alert("댓글이 삭제되었습니다.");
        fetchBoardData(); // 삭제 후 데이터 갱신
      } else if (response.status === 403) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        console.error("댓글 삭제 실패:", await response.text());
      }
    } catch (error) {
      console.error("댓글 삭제 중 에러 발생:", error);
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

      <BP.UploadFileSection>
        {/* 첨부파일이 있을 경우 표시 */}
        {board.postFilePath && board.postFileName && (
          <BP.FileSection>
            <BP.FileSelectionP>첨부파일:</BP.FileSelectionP>
            <BP.FileSelectionA
              // href={`${process.env.REACT_APP_SERVER_URL}/upload${board.postFilePath}`}
              href={`/${process.env.Spring_SERVER_URL}/src/main/webapp/upload/${board.postFilePath}`}
              // href="/{board.postFileName}"
              download={board.postFileName}
              target="_blank"
              rel="noopener noreferrer"
            >
              {board.postFileName}
            </BP.FileSelectionA>
          </BP.FileSection>
        )}
      </BP.UploadFileSection>

      <BP.PostContent>
        {isEditing ? (
          <>
            <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
            {/* <input
              type="text"
              placeholder="회원 번호"
              value={editMemberNo}
              onChange={(e) => setEditMemberNo(e.target.value)}
            /> */}
            <input type="file" onChange={handleFileChange} />
            <BP.Button onClick={handleSave}>저장</BP.Button>
          </>
        ) : (
          <>
            <p>{board.postCont}</p>

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
              <p>{comment.postCommentContent}</p> {/* 기본적으로 댓글이 보임 */}

              {/* 수정 버튼 클릭 시 아래에 입력창과 저장 버튼 표시 */}
              {editingCommentNo === comment.postCommentNo ? (
                <BP.EditCommentContainer>
                <textarea
                  value={editingCommentContent}
                  onChange={(e) => setEditingCommentContent(e.target.value)}
                />
                <BP.Button onClick={() => handleSaveCommentEdit(comment.postCommentNo)}>저장</BP.Button>
                {/* <BP.Button onClick={() => setEditingCommentNo(null)}>취소</BP.Button> */}
              </BP.EditCommentContainer>
            ) : (
              <BP.CommentActions>
                {member?.memberNo === comment.member.memberNo && (
                  <>
                    <BP.Button onClick={() => handleEditComment(comment.postCommentNo, comment.postCommentContent)}>
                      수정
                    </BP.Button>
                    <BP.Button onClick={() => handleDeleteComment(comment.postCommentNo)}>
                      삭제
                    </BP.Button>
                  </>
                )}
              </BP.CommentActions>
        )}
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