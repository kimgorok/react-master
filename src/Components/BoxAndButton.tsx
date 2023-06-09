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
  const [second, setSecond] = useRecoilState(secondState);
  const [minute, setMinute] = useRecoilState(minuteState);
  const [round, setRound] = useRecoilState(roundState);
  const [goal, setGoal] = useRecoilState(goalState);

  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked((prev) => !prev);
  };

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  useEffect(() => {
    if (clicked) {
      const interval = setInterval(() => {
        setSecond((prevCount) => (prevCount === 0 ? 59 : prevCount - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [clicked, setSecond]);

  useEffect(() => {
    second === 59 && setMinute((prevMinute) => prevMinute - 1);
  }, [second, setMinute]);

  useEffect(() => {
    minute === 0 &&
      second === 0 &&
      (() => {
        setRound((prevRound) => prevRound + 1);
        setClicked(false);
        setMinute(25);
      })();
  }, [minute, second, setMinute, setRound]);

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
