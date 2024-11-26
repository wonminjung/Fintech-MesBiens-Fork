import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>
        금융 종함 <br />
        웹서비스 프로그램
      </h2>
      <nav>
        <ul>
          <li>
            <a href="/main" className="sidebar_pages">
              지출 캘린더
            </a>
          </li>
          <li>
            <a href="recent_transactions.html" className="sidebar_pages">
              최근 거래 내역
            </a>
          </li>
          <li>
            <a href="assets.html" className="sidebar_pages">
              자산 현황
            </a>
          </li>
          <li>
            <a href="transaction.html" className="sidebar_pages">
              송금
            </a>
          </li>
          <li>
            <a href="portfolio_page.html" className="sidebar_pages">
              나의 포트폴리오
            </a>
          </li>
        </ul>
      </nav>
      <iframe
        title="Musinsa"
        src="https://www.musinsa.com/main/"
        className="ppl"
      >
        무신사
      </iframe>
    </div>
  );
};

export default Sidebar;
