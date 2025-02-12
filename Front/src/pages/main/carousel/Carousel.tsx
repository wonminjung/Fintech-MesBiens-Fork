import React, { useEffect, useState } from "react";
import { C } from "./style";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // JSON 파일 로드
    fetch(`${process.env.PUBLIC_URL}/dummyDatas/carouselImages.json`)
      .then((response) => response.json())
      .then((data) => setImages(data.images));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 60000); // 60초마다 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <C.Carousel>
      {images.length > 0 && (
        <C.CarouselVideo src={images[currentIndex]} autoPlay loop />
      )}
      <C.Controls>
        <C.Buttons onClick={handlePrev}>
          <img
            src={`${process.env.PUBLIC_URL}/images/carouselImages/prev.svg`}
            alt="prevbtn"
          />
        </C.Buttons>
        <h3>메비앙 서비스를 소개합니다</h3>
        <C.Buttons onClick={handleNext}>
          <img
            src={`${process.env.PUBLIC_URL}/images/carouselImages/next.svg`}
            alt="nextbtn"
          />
        </C.Buttons>
      </C.Controls>
    </C.Carousel>
  );
};

export default Carousel;
