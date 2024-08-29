import { countState } from "@recoil/atoms";
import React from "react";
import { useRecoilState } from "recoil";

function ExampleComp(): React.JSX.Element {
  // recoil 정상 작동 확인용 코드
  const [count, setCount] = useRecoilState(countState);

  const handleCount = () => {
    setCount((prev) => (prev += 1));
  };

  return (
    <div>
      <p>Example Component</p>
      <p>{count}</p>
      <button onClick={handleCount}>증가 버튼</button>
    </div>
  );
}

export default ExampleComp;
