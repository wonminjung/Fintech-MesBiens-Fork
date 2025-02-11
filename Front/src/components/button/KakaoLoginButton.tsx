import React from "react";

const KakaoLoginButton = () => {
  const KAKAO_AUTH_URL = "http://localhost:7200/oauth2/authorization/kakao"; // 백엔드 로그인 URL

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL; // 카카오 로그인 페이지로 이동
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-yellow-400 text-black font-bold py-2 px-4 rounded flex items-center justify-center"
    >
      <img
        src="https://developers.kakao.com/assets/img/about/logos/kakaologin/kr/kakao_account_login_btn_medium.png"
        alt="Kakao Login"
        className="w-6 h-6 mr-2"
      />
      카카오로 로그인
    </button>
  );
};

export default KakaoLoginButton;