import { atom } from "recoil";

// recoil 정상 작동 확인용 코드
type countType = number;

export const countState = atom<countType>({
  key: "countState",
  default: 0,
});
