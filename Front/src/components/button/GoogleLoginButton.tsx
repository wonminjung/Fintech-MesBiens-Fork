import React from "react";

const GoogleLoginButton: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:7200/oauth2/authorization/google"; //  백엔드 Google OAuth2 로그인 URL
  };

  return (
    <button onClick={handleGoogleLogin} style={{ background: "white", border: "none", cursor: "pointer" }}>
      <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" alt="Google Login" />
    </button>
  );
};

export default GoogleLoginButton;