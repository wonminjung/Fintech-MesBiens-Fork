import React from "react";
// import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:7200/oauth2/authorization/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-gray-300 shadow-md"
    >
      {/* Google SVG 로고 (색상 변경 적용) */}
      <svg width="32" height="32" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M24 9.5c3.9 0 7.1 1.3 9.8 3.7l7.2-7.2C36.8 2 30.9 0 24 0 14.7 0 6.8 5.4 2.7 13.3l8.4 6.5C13.1 13.4 18 9.5 24 9.5z" />
        <path fill="#34A853" d="M46.5 24c0-1.5-.1-2.9-.4-4.2H24v8h12.7c-.6 3-2.4 5.6-5 7.3l8.2 6.4c4.8-4.4 7.6-10.8 7.6-17.5z" />
        <path fill="#FBBC05" d="M8.3 28.2c-1-2.9-1-6 0-8.8L.4 13c-2.8 5.5-2.8 12 0 17.5l7.9-6.3z" />
        <path fill="#EA4335" d="M24 48c6.5 0 12.1-2.1 16.2-5.6l-8.2-6.4c-2.3 1.6-5.2 2.5-8.1 2.5-6.1 0-11.3-4.1-13.1-9.7l-8.4 6.5C7.9 42.5 15.2 48 24 48z" />
      </svg>
    </button>
  );
};

export default GoogleLoginButton;