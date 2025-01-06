import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import FindIDPage from "../pages/findID/FindIDPage";
import MyPageContainer from "../pages/myPage/MyPageContainer";
import IntroPage from "../pages/main/IntroPageAfterLogin";
import News from "../pages/community/news/News";
import Recommend from "../pages/community/quiz/Quiz";
import {
  Board,
  BoardContent,
  BoardWrite,
} from "../pages/community/board/Board";
import Tile1 from "../pages/community/news/Tile1";
import StockTest from "../pages/community/quiz/StockTest";
import Transaction from "../pages/transaction/Transaction";
import Recent from "../pages/Recent/Recent";
import IntroPageBeforeLogin from "../pages/main/IntroPageBeforeLogin";
import MainPage from "../pages/main/MainPage";
import AssetsContainer from "../pages/Assets/AssetsContainer";
import Calculator from "../pages/community/calculator/Calculator";

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
        path: "/C_news",
        element: <News />,
      },
      {
        path: "/C_quiz",
        element: <Recommend />,
      },
      {
        path: "/C_calculator",
        element: <Calculator />,
      },
      {
        path: "C_board",
        element: <Board />,
      },
      {
        path: "C_boardWrite",
        element: <BoardWrite />,
      },
      {
        path: "C_board/:bno",
        element: <BoardContent />,
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
