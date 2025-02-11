import React from "react";

const NaverLoginButton = () => {
    const handleLogin = () => {
      window.location.href = "http://localhost:7200/oauth2/authorization/naver";
    };
  
    return (
      <button onClick={handleLogin} style={buttonStyle}>
        네이버 로그인
      </button>
    );
  };
  
  // 스타일 추가
  const buttonStyle = {
    backgroundColor: "#03C75A",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
  };
  
  export default NaverLoginButton;