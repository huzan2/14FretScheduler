import axios from "axios";
import React, { useEffect, useState } from "react";

function LandingPage(): React.JSX.Element {
  const [kakaoUrl, setKakaoUrl] = useState<string | null>(null);

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
    fetchKakaoUrl();
  }, []);

  return (
    <div>
      <p>Landing Page</p>
      <button onClick={goKakaoUrl}>LogIn / SignUp</button>
    </div>
  );
}

export default LandingPage;
