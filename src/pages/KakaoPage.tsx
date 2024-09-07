import LoadingComp from "@components/LoadingComp";
import { tokenState, userState } from "@recoil/atoms";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

function KakaoPage(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const handleLogin = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
      if (code) {
        try {
          const {
            message,
            nickname,
            accessToken,
            refreshToken,
          }: {
            message: string;
            nickname: string;
            accessToken: string;
            refreshToken: string;
          } = await axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/kakao/login`, {
              code: code,
            })
            .then((res) => res.data);
          console.log(`login message: ${message}`);
          setToken({ accessToken, refreshToken });
          setUser({ nickname });
          setIsLoading(false);
          navigate("/main");
        } catch (err) {
          console.error(`KakaoPage.tsx에서 에러 발생: ${err}`);
        }
      } else {
        console.error("authCode가 제대로 구해지지 않았습니다. null");
      }
    };

    if (!token.accessToken || !token.refreshToken) {
      handleLogin();
    } else {
      setIsLoading(false);
      navigate("/main");
    }
  }, []);

  return (
    <>
      <LoadingComp isLoading={isLoading} />
    </>
  );
}

export default KakaoPage;
