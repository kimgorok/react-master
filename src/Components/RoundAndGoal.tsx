import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { goalState, roundState } from "../atom";

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

function RoundAndGoal() {
  const round = useRecoilValue(roundState);
  const goal = useRecoilValue(goalState);
  return (
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
  );
}

export default RoundAndGoal;
