import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@pages/LandingPage";
import MainPage from "@pages/MainPage";
import MyPage from "@pages/MyPage";
import ErrorPage from "@pages/ErrorPage";
import KakaoPage from "@pages/KakaoPage";

function AppRouter(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/callback/kakao" element={<KakaoPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
