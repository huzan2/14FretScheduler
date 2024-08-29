import { useState } from "react";

function useExample(): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [count, setCount] = useState<number>(0);

  return [count, setCount];
}

export default useExample;
