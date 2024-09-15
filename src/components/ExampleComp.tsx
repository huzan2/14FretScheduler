import { tokenState, userState } from "@recoil/atoms";
import React from "react";
import { useRecoilValue } from "recoil";

function ExampleComp(): React.JSX.Element {
  const user = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);

  return (
    <div>
      <p>ExampleComp</p>
      <p>user: {user.nickname}</p>
      <p>accessToken: {token.accessToken}</p>
      <p>refreshToken: {token.refreshToken}</p>
    </div>
  );
}

export default ExampleComp;
