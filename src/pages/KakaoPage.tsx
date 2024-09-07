import LoadingComp from "@components/LoadingComp";
import { tokenState, userState } from "@recoil/atoms";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

type LoginResponse = {
  message: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
};

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
          const response = await axios.post<LoginResponse>(
            `${import.meta.env.VITE_BACKEND_URL}/kakao/login`,
            {
              code: code,
            }
          );
          console.log(`login message: ${response.data.message}`);
          setToken({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          });
          setUser({ nickname: response.data.nickname });
          setIsLoading(false);
          navigate("/main");
        } catch (err) {
          if (isAxiosError(err)) {
            console.error(
              `KakaoPage.tsx에서 에러 발생, 상태코드: ${err.status}, 응답: ${err.response}`
            );
          }
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
