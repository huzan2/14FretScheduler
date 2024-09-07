import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type TokenType = {
  accessToken: string | null;
  refreshToken: string | null;
};

type UserType = {
  nickname: string | null;
};

export const tokenState = atom<TokenType>({
  key: "tokenState",
  default: {
    accessToken: null,
    refreshToken: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom<UserType>({
  key: "userState",
  default: {
    nickname: null,
  },
});
