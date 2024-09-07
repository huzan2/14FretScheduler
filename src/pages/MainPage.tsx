import { handleAutoLogin } from "@apis/handleAutoLogin";
import ExampleComp from "@components/ExampleComp";
import { tokenState } from "@recoil/atoms";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

function MainPage(): React.JSX.Element {
  const [token, setToken] = useRecoilState(tokenState);
  const resetToken = useResetRecoilState(tokenState);
  const navigator = useNavigate();

  const handleLogout = () => {
    resetToken();
    navigator("/");
  };

  useEffect(() => {
    handleAutoLogin(token, setToken, resetToken, navigator);
  }, []);

  return (
    <div>
      <p className="text-3xl">Main Page</p>
      <ExampleComp />
      <button onClick={handleLogout}>로그아웃 버튼</button>
    </div>
  );
}

export default MainPage;
