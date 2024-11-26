import React from 'react';
import S from './style';
import LeftAreaContainer from './leftArea/LeftAreaContainer';
import ContentAreaContainer from './contentArea/ContentAreaContainer';

const MyPageContainer: React.FunctionComponent = (): JSX.Element => {
    
    return (
        <div>
            <div className="container_main">
                <div className="sidebar">
                    <h2>금융 종합 <br/>웹서비스 프로그램</h2>
                    <nav>
                        <ul>
                            <li><a href="#" className="sidebar_pages">지출 캘린더</a></li>
                            <li><a href="#" className="sidebar_pages">최근 거래 내역</a></li>
                            <li><a href="#" className="sidebar_pages">자산 현황</a></li>
                            <li><a href="#" className="sidebar_pages">송금</a></li>
                            <li><a href="#" className="sidebar_pages">나의 포트폴리오</a></li>
                        </ul>
                    </nav>
                    <iframe src="https://www.musinsa.com/main/" className="ppl">네이버</iframe>
                </div>
                <main className="main-content">
                    <div className="header">
                        <h2 className="welcome">###님 환영합니다.</h2>
                        <div className="search_bar">
                            <input type="text" className="search" placeholder="Search" />
                            <button type="button" className="search-btn">검색</button>
                        </div>
                        <div className="login_sign_up">
                            <a href="#" type="button" className="login-btn">로그인</a>
                            <a href="#" type="button" className="sign-up-btn">회원가입</a>
                        </div>
                    </div>

                    
                    <S.MyPageContainer>
                        <LeftAreaContainer />
                        <ContentAreaContainer />
                    </S.MyPageContainer>
                </main>
            </div>

        </div>
    );
};


export default MyPageContainer;