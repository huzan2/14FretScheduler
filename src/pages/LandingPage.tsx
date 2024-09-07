import { tokenState } from "@recoil/atoms";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function LandingPage(): React.JSX.Element {
  const [kakaoUrl, setKakaoUrl] = useState<string | null>(null);
  const navigator = useNavigate();
  const token = useRecoilValue(tokenState);

  const fetchKakaoUrl = async () => {
    const { message, url }: { message: string; url: string } = await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/kakao/url`)
      .then((res) => res.data);
    console.log(`fetchKakaoURL: ${message}`);
    setKakaoUrl(url);
  };

  const goKakaoUrl = () => {
    if (kakaoUrl) {
      window.location.href = kakaoUrl;
    }
  };

  useEffect(() => {
    if (!token.accessToken || !token.refreshToken) {
      fetchKakaoUrl();
    } else {
      navigator("/main");
    }
  }, []);

  return (
    <div>
      <p>Landing Page</p>
      <button onClick={goKakaoUrl}>LogIn / SignUp</button>
    </div>
  );
}

export default LandingPage;
