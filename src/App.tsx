import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";
// before refactoring

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  margin-top: 2vw;
  font-size: 5rem;
`;

// ************************************************************
// ************************************************************
const BoxContainer = styled.div`
  margin-top: auto;
  display: flex;
`;

const Box = styled(motion.div)`
  height: 300px;
  width: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(255, 90, 90, 1);
  font-size: 6rem;
`;

const boxVariant = {
  boxStart: { scale: 0.7, opacity: 0.3 },
  boxEnd: { scale: 1, opacity: 1 },
};

const Dott = styled.span`
  font-size: 5.5rem;
  margin: auto;
  padding: 20px;
  color: rgb(224, 213, 213);
`;
// ************************************************************
// ************************************************************

// ************************************************************
// ************************************************************
const PlayPause = styled.div`
  width: 125px;
  height: 125px;
  margin-top: auto;
`;

const Play = styled(motion.svg)`
  width: 125px;
  height: 125px;
  background-color: rgb(82, 75, 75, 0.5);
  border-radius: 72.5px;
`;

const Pause = styled(motion.svg)`
  width: 125px;
  height: 125px;
  background-color: rgb(82, 75, 75, 0.5);
  border-radius: 72.5px;
`;

const svg = {
  start: { scale: 0.5 },
  end: { scale: 0.7 },
};
// ************************************************************
// ************************************************************

// ************************************************************
// ************************************************************
const RoundGoal = styled(motion.div)`
  padding: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
`;

const RoundWrapper = styled(motion.div)`
  position: relative;
  margin-right: 50px;
  font-size: 1.5rem;
`;

const Round = styled(motion.div)`
  font-size: 1.8rem;
  color: rgb(228, 220, 220, 0.7);
  margin-bottom: 15px;
`;

const GoalWrapper = styled(motion.div)`
  position: relative;
  margin-left: 50px;
  font-size: 1.5rem;
`;

const Goal = styled(motion.div)`
  font-size: 1.8rem;
  color: rgb(228, 220, 220, 0.7);
  margin-bottom: 15px;
`;
// ************************************************************
// ************************************************************

// ************************************************************
// ************************************************************
const secondState = atom({
  key: "second",
  default: 0,
});

const minuteState = atom({
  key: "minute",
  default: 25,
});

const roundState = atom({
  key: "round",
  default: 0,
});

const goalState = atom({
  key: "mygoal",
  default: 0,
});

// ************************************************************
// ************************************************************

function App() {
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

  // ************************************************************
  // ************************************************************
  return (
    <Wrapper>
      <Title>Pomodoro</Title>
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
      <RoundGoal>
        <RoundWrapper>
          <Round>{round}/4</Round>
          <span>ROUND</span>
        </RoundWrapper>
        <GoalWrapper>
          <Goal>{goal}/12</Goal>
          <span>GOAL</span>
        </GoalWrapper>
      </RoundGoal>
    </Wrapper>
  );
}

export default App;
