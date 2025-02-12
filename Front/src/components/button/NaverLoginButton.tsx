import React from "react";

const NaverLoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:7200/oauth2/authorization/naver";
  };

  return (
    <button 
      onClick={handleLogin} 
      className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center border border-gray-300 shadow-md"
    >
      {/* Naver SVG 로고 (크기 조정, 흰색 유지) */}
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path fill="white" d="M3 3h6l6 9V3h6v18h-6l-6-9v9H3z"/>
      </svg>
    </button>
  );
};

export default NaverLoginButton;
