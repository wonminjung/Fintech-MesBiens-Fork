import React from "react";

const KakaoLoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:7200/oauth2/authorization/kakao";
  };

  return (
    <button 
      onClick={handleLogin} 
      className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center border border-gray-300 shadow-md"
    >
      {/* Kakao SVG 로고 (크기 조정) */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="black">
        <path d="M12 2C6.48 2 2 5.94 2 10.63c0 3.06 2.08 5.76 5.2 7.3-.2.74-.74 2.7-.85 3.15-.13.5.18.5.38.36.16-.12 2.6-1.81 3.67-2.55.52.07 1.05.12 1.6.12 5.52 0 10-3.94 10-8.63S17.52 2 12 2z"/>
      </svg>
    </button>
  );
};

export default KakaoLoginButton;