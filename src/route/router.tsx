import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import FindIDPage from "../pages/findID/FindIDPage";
import MyPageContainer from "../pages/myPage/MyPageContainer";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/signup",
                element: <SignupPage />
            },
            {
                path: "/findId",
                element: <FindIDPage />
            },
            {
                path: "/myPage",
                element: <MyPageContainer />
            },
        ]
    },

    // 나머지 경로
    {
        path: "*",
        // element: <NotFoundContainer />
    }
];

const router = createBrowserRouter(routes);

export default router;
