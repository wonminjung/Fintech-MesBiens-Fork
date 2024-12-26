import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import FindIDPage from "../pages/findID/FindIDPage";
import MyPageContainer from "../pages/myPage/MyPageContainer";
import IntroPage from "../pages/main/IntroPageAfterLogin";
import Portfolio from "../pages/community/Portfolio/Portfolio";
import News from "../pages/community/News/News";
import Recommend from "../pages/community/Recommend/Recommend";
import Trading from "../pages/community/Trading/Trading";
import { Board, BoardContent } from "../pages/community/board/Board";
import Notification from "../pages/community/Notification";
import Tile1 from "../pages/community/News/Tile1";
import StockTest from "../pages/community/Recommend/StockTest";
import Transaction from "../pages/transaction/Transaction";
import Recent from "../pages/Recent/Recent";
import IntroPageBeforeLogin from "../pages/main/IntroPageBeforeLogin";
import MainPage from "../pages/main/MainPage";
import AssetsContainer from "../pages/Assets/AssetsContainer";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <IntroPageBeforeLogin />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/myPage",
        element: <MyPageContainer />,
      },
      {
        path: "/intro",
        element: <IntroPage />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/community",
        element: <Board />,
      },
      {
        path: "/P_portfolio",
        element: <Portfolio />,
      },
      {
        path: "/P_news",
        element: <News />,
      },
      {
        path: "/P_recommend",
        element: <Recommend />,
      },
      {
        path: "P_transaction",
        element: <Trading />,
      },
      {
        path: "P_board",
        element: <Board />,
      },
      {
        path: "P_notification",
        element: <Notification />,
      },
      {
        path: "N_tile1",
        element: <Tile1 />,
      },
      {
        path: "stocktest",
        element: <StockTest />,
      },
      {
        path: "recent",
        element: <Recent />,
      },
      {
        path: "assets",
        element: <AssetsContainer />,
      },
      // {
      //   path: "boardWrite",
      //   element: <BoardWrite />,
      // },
      {
        path: "boardContent",
        element: <BoardContent />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/findId",
    element: <FindIDPage />,
  },
  // 나머지 경로
  {
    path: "*",
    // element: <NotFoundContainer />,
  },
];

const router = createBrowserRouter(routes);

export default router;
