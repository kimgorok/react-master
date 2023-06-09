import { atom } from "recoil";

export const secondState = atom({
  key: "second",
  default: 0,
});

export const minuteState = atom({
  key: "minute",
  default: 25,
});

export const roundState = atom({
  key: "round",
  default: 0,
});

export const goalState = atom({
  key: "mygoal",
  default: 0,
});
