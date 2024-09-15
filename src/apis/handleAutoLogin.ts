import axios, { isAxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { Resetter, SetterOrUpdater } from "recoil";

type Token = {
  accessToken: string | null;
  refreshToken: string | null;
};

type ValidateTokenRes = {
  ok: true;
  message: "accessToken이 만료되지 않았습니다";
};

type ValidateTokenErr = {
  ok: false;
  message: "accessToken이 만료되었습니다";
};

type RefreshTokenRes = {
  accessToken: string;
};

type RefreshTokenExpired = {
  ok: false;
  message: "Both tokens expired";
};

type RefreshTokenBadRequest = {
  ok: false;
  message: "No Authorized" | "Access token and refresh token not found";
};

type RefreshTokenErr = RefreshTokenExpired | RefreshTokenBadRequest;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

/**
 * @description accessToken의 유효성을 검증하고, 재발급 혹은 로그아웃을 수행하는 함수
 * @param token token atom - useRecoilState(tokenState)
 * @param setToken token atom의 setter - useRecoilState(tokenState)
 * @param resetToken token atom의 resetter - useResetRecoilState(tokenState)
 * @param navigator useNavigator 반환값 - navigator = useNavigate()
 */
export const handleAutoLogin = async (
  token: Token,
  setToken: SetterOrUpdater<Token>,
  resetToken: Resetter,
  navigator: NavigateFunction
) => {
  // 토큰 중 하나가 null일 때
  if (!token.accessToken || !token.refreshToken) {
    // 로그인 페이지로 이동
    navigator("/");
    return;
  }
  // 토큰은 전부 있는 경우
  try {
    // accessToken 유효성 검증 시작
    const validateResponse = await axios.get<ValidateTokenRes>(
      `${BACKEND_URL}/token/validate`,
      {
        headers: { Authorization: `Bearer ${token.accessToken}` },
      }
    );
    // accessToken이 유효하면 별 다른 액션 수행하지 않음
    console.log(
      `ok: ${JSON.stringify(validateResponse.data.ok)}, msg: ${
        validateResponse.data.message
      }`
    );
  } catch (validateErr) {
    // err -> AxiosError로 타입 내로잉
    if (isAxiosError<ValidateTokenErr>(validateErr)) {
      if (validateErr.status === 401) {
        // accessToken이 만료된 경우
        console.log(validateErr.response?.data.message);
        // refreshToken을 사용해 accessToken 재발급 시도
        try {
          const refreshResponse = await axios.get<RefreshTokenRes>(
            `${BACKEND_URL}/token/refresh`,
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
                refreshtoken: `${token.refreshToken}`,
              },
            }
          );
          console.log("새로운 accessToken 발급 완료");
          setToken({
            accessToken: refreshResponse.data.accessToken,
            refreshToken: token.refreshToken,
          });
        } catch (refreshErr) {
          if (isAxiosError<RefreshTokenErr>(refreshErr)) {
            if (refreshErr.status === 401) {
              // refreshToken도 만료된 경우 로그아웃 처리
              console.error(refreshErr.response?.data.message);
              resetToken();
              navigator("/");
            } else {
              // 그 외 다른 오류
              console.error(
                `autoLogin 과정에서 에러 발생, 상태코드: ${refreshErr.status}`
              );
              console.error(`메시지: ${refreshErr.response?.data.message}`);
            }
          }
        }
      }
    }
  }
};
