import React, { useState } from "react";
import { BP } from "./style";

const BoardCont: React.FC = () => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const handleThreeDots = () => {
    setButtonVisible(!buttonVisible);
  };

  return (
    <BP.PostContainer>
      {/* Title and Auther Section */}
      <BP.PostHeader>
        <BP.h2>민지는 우리팀 기술이사</BP.h2>
        <BP.PostActions>
          <BP.pWriter>작성자 : </BP.pWriter>
          <BP.pWriterName>홍철</BP.pWriterName>
          <BP.ThreeDotContainer>
            <img
              src={`${process.env.PUBLIC_URL}/images/three-dots-vertical.svg`}
              onClick={handleThreeDots}
            />
            {/* 3dot vertical */}
          </BP.ThreeDotContainer>
          {buttonVisible && (
            <BP.ActionButtons>
              <BP.button>수정</BP.button>
              <BP.button>삭제</BP.button>
            </BP.ActionButtons>
          )}
        </BP.PostActions>
      </BP.PostHeader>
      {/* Post Date */}
      <BP.PostDate>
        등록일: <span>2024-10-31 22:31:54</span>
      </BP.PostDate>

      {/* Post Content */}
      <BP.PostContent>
        민지는 TB조의 기술이사 이자 실질적인 팀장이죠
      </BP.PostContent>

      {/* Comment Section */}
      <BP.CommentsSection>
        <BP.h3>댓글</BP.h3>
        <BP.Comment>
          <BP.CommentInfo>작성자명 | 작성일시</BP.CommentInfo>
          <p>댓글 내용</p>
          <BP.CommentActions>
            <BP.CommentLike>
              <BP.img src={`${process.env.PUBLIC_URL}/images/heart-fill.svg`} />
            </BP.CommentLike>
            <BP.button>수정</BP.button>
            <BP.button>삭제</BP.button>
          </BP.CommentActions>
        </BP.Comment>
      </BP.CommentsSection>
    </BP.PostContainer>
  );
};

export default BoardCont;
