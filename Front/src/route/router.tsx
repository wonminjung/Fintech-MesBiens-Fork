import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import AssetsContainer from "../pages/assets/AssetsContainer";
import {
  Board,
  BoardWrite
} from "../pages/community/board/Board";
import BoardPost from "../pages/community/board/BoardPost";
import Calculator from "../pages/community/calculator/Calculator";
import InnerLayout from "../pages/community/InnerLayout";
import News from "../pages/community/news/News";
import Tile1 from "../pages/community/news/Tile1";
import Recommend from "../pages/community/quiz/Quiz";
import StockTest from "../pages/community/quiz/StockTest";
import FindIDPage from "../pages/findID/FindIDPage";
import Layout from "../pages/layout/Layout";
import LoginPage from "../pages/login/LoginPage";
import IntroPage from "../pages/main/IntroPageAfterLogin";
import IntroPageBeforeLogin from "../pages/main/IntroPageBeforeLogin";
import MainPage from "../pages/main/MainPage";
import CartPage from "../pages/mesbiensShop/CartPage";
import CategoryPage from "../pages/mesbiensShop/CategoryPage";
import MesBiensShop from "../pages/mesbiensShop/MesBiensShop";
import ProductPage from "../pages/mesbiensShop/ProductPage";
import PurchasePage from "../pages/mesbiensShop/PurchasePage";
import MyPageContainer from "../pages/myPage/MyPageContainer";
import Recent from "../pages/recent/Recent";
import SignupPage from "../pages/signup/SignupPage";
import Transaction from "../pages/transaction/Transaction";

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
        path: "main",
        element: <MainPage />,
      },
      {
        path: "myPage",
        element: <MyPageContainer />,
      },
      {
        path: "intro",
        element: <IntroPage />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
      {
        path: "community",
        element: <InnerLayout />,
        children: [
          {
            index: true, // path가 없으면 index route로 간주됨
            element: <Navigate to="/community/C_board" replace />,
          },
          {
            path: "C_news",
            element: <News />,
          },
          {
            path: "C_quiz",
            element: <Recommend />,
          },
          {
            path: "C_calculator",
            element: <Calculator />,
          },
          {
            path: "C_board",
            element: <Board />,
          },
          {
            path: "C_board/C_boardWrite",
            element: <BoardWrite />,
          },
          {
            path: "C_board/:postNo",
            element: <BoardPost />,
          },
        ],
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
  {
    path: "/MesBiensShop",
    element: <MesBiensShop />,
  },
  {
    path: "/shop/product/:productNo",
    element: <ProductPage />,
  },
  {
    path: "/shop/category/:category",
    element: <CategoryPage />,
  },
  {
    path: "/shop/Cart",
    element: <CartPage />,
  },
  {
    path: "/shop/Purchase",
    element: <PurchasePage />,
  },
  // {
  //   path: "/TestPage",
  //   element: <TestPage />,
  // },
  // 나머지 경로
  {
    path: "*",
    // element: <NotFoundContainer />,
  },
];

const router = createBrowserRouter(routes);

export default router;
