import { handleAutoLogin } from "@apis/handleAutoLogin";
import ExampleComp from "@components/ExampleComp";
import { tokenState } from "@recoil/atoms";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

function MyPage(): React.JSX.Element {
  const [token, setToken] = useRecoilState(tokenState);
  const resetToken = useResetRecoilState(tokenState);
  const navigator = useNavigate();

  useEffect(() => {
    handleAutoLogin(token, setToken, resetToken, navigator);
  }, []);

  return (
    <div>
      <p>My Page</p>
      <ExampleComp />
    </div>
  );
}

export default MyPage;
