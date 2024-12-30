import React, { useState, useEffect } from "react";
import { BP } from "./style";

const BoardCont: React.FC = () => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [data, setData] = useState<any>(null); // Set to null initially to handle data loading state

  const handleThreeDots = () => {
    setButtonVisible(!buttonVisible);
  };

  useEffect(() => {
    // Fetch data from the public folder
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON data
      })
      .then((fetchedData) => {
        setData(fetchedData); // Set the data from the response
      })
      .catch((error) => {
        console.error("Fetch error: ", error); // Log errors if any occur
      });
  }, []); // Empty dependency array ensures this runs once on mount

  if (!data) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }
  console.log(data);

  return (
    <BP.PostContainer>
      {/* Title and Author Section */}
      <BP.PostHeader>
        <BP.h2>{data.title || "민지는 우리팀 기술이사"}</BP.h2>{" "}
        {/* Display fetched title if available */}
        <BP.PostActions>
          <BP.pWriter>작성자: </BP.pWriter>
          <BP.pWriterName>{data.author || "홍철"}</BP.pWriterName>{" "}
          {/* Display fetched author name */}
          <BP.ThreeDotContainer>
            <img
              src={`${process.env.PUBLIC_URL}/images/three-dots-vertical.svg`}
              onClick={handleThreeDots}
              alt="Options"
            />
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
        등록일: <span>{data.date || "2024-10-31 22:31:54"}</span>{" "}
        {/* Display fetched date */}
      </BP.PostDate>

      {/* Post Content */}
      <BP.PostContent>
        {data.content || "민지는 TB조의 기술이사 이자 실질적인 팀장이죠"}
      </BP.PostContent>

      {/* Comment Section */}
      <BP.CommentsSection>
        <BP.h3>댓글</BP.h3>
        {data.comments ? (
          data.comments.map((comment: any, index: number) => (
            <BP.Comment key={index}>
              <BP.CommentInfo>
                {comment.author} | {comment.date}
              </BP.CommentInfo>
              <p>{comment.text}</p>
              <BP.CommentActions>
                <BP.CommentLike>
                  <BP.img
                    src={`${process.env.PUBLIC_URL}/images/heart-fill.svg`}
                    alt="Like"
                  />
                </BP.CommentLike>
                <BP.button>수정</BP.button>
                <BP.button>삭제</BP.button>
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

export default BoardCont;
