import ExampleComp from "@components/ExampleComp";
import { tokenState } from "@recoil/atoms";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function MainPage(): React.JSX.Element {
  const token = useRecoilValue(tokenState);
  const navigator = useNavigate();

  useEffect(() => {
    if (!token.accessToken || !token.refreshToken) {
      navigator("/");
    }
  }, []);

  return (
    <div>
      <p className="text-3xl">Main Page</p>
      <ExampleComp />
    </div>
  );
}

export default MainPage;
