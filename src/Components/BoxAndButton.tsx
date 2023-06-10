import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { goalState, minuteState, roundState, secondState } from "../atom";
import {
  Box,
  BoxContainer,
  Dott,
  Play,
  boxVariant,
  Pause,
  PlayPause,
  svg,
} from "../StyleAndMotion";
import { AnimatePresence, motion } from "framer-motion";

function BoxAndButton() {
  // useRecoilState를 사용해서 각 State의 atom의 값을 다룸
  const [second, setSecond] = useRecoilState(secondState);
  const [minute, setMinute] = useRecoilState(minuteState);
  const [round, setRound] = useRecoilState(roundState);
  const [goal, setGoal] = useRecoilState(goalState);

  // useState를 사용해서 클릭의 여부를 다룸, 기본값은 false
  const [clicked, setClicked] = useState(false);

  // 사용자의 click에 따라 clicked의 값을 바꾸는 함수
  const toggleClicked = () => {
    setClicked((prev) => !prev);
  };

  // 시간을 두자리 수로 표시하기 위한 함수
  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  // useEffect를 사용해서 clicked가 true일 경우 1초당 second값을 1씩 줄임
  // prevCount가 0일 경우 59를 반환
  useEffect(() => {
    if (clicked) {
      const interval = setInterval(() => {
        setSecond((prevCount) => (prevCount === 0 ? 59 : prevCount - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [clicked, setSecond]);

  // second의값이 59이면 minute를 1 줄임
  useEffect(() => {
    second === 59 && setMinute((prevMinute) => prevMinute - 1);
  }, [second, setMinute]);

  // second가 0이면서 minute가 0일 경우 round를 1 늘림
  // clicked는 false가 되며, minute는 25가 됨
  useEffect(() => {
    minute === 0 &&
      second === 0 &&
      (() => {
        setRound((prevRound) => prevRound + 1);
        setClicked(false);
        setMinute(25);
      })();
  }, [minute, second, setMinute, setRound]);

  // round가 4일 경우 goal을 1 늘림
  useEffect(() => {
    round === 4 &&
      (() => {
        setRound(0);
        setGoal((prevGoal) => prevGoal + 1);
      })();
  }, [round, setRound, setGoal]);
  return (
    <>
      <BoxContainer>
        {/* 다른 동작이 모두 끝나면 Box의 애니메이션 실행 */}
        <AnimatePresence mode="wait">
          <Box
            onChange={() => setMinute(minute)}
            key={minute}
            variants={boxVariant}
            initial="boxStart"
            animate="boxEnd"
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            {formatTime(minute)}
          </Box>
        </AnimatePresence>
        <Dott>:</Dott>
        {/* second의 값이 변할 때 마다 애니메이션 실행 */}
        <Box
          onChange={() => setSecond(second)}
          key={second}
          variants={boxVariant}
          initial="boxStart"
          animate="boxEnd"
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 15,
          }}
        >
          {formatTime(second)}
        </Box>
      </BoxContainer>
      {/* clicked의 true/false에 따라 보여지는 버튼이 바뀌게 함 */}
      <PlayPause onClick={toggleClicked}>
        {!clicked ? (
          <Play
            whileHover={{ scale: 1.2 }}
            layoutId="playpause"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <motion.path
              variants={svg}
              initial="start"
              animate="end"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
            ></motion.path>
          </Play>
        ) : (
          <Pause
            whileHover={{ scale: 1.2 }}
            layoutId="playpause"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <motion.path
              variants={svg}
              initial="start"
              animate="end"
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z"
            ></motion.path>
          </Pause>
        )}
      </PlayPause>
    </>
  );
}

export default BoxAndButton;
