import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.div`
  margin-top: 2vw;
  font-size: 5rem;
`;

export const PlayPause = styled.div`
  width: 125px;
  height: 125px;
  margin-top: auto;
`;

export const Play = styled(motion.svg)`
  width: 125px;
  height: 125px;
  background-color: rgb(82, 75, 75, 0.5);
  border-radius: 72.5px;
`;

export const Pause = styled(motion.svg)`
  width: 125px;
  height: 125px;
  background-color: rgb(82, 75, 75, 0.5);
  border-radius: 72.5px;
`;

export const svg = {
  start: { scale: 0.5 },
  end: { scale: 0.7 },
};

export const BoxContainer = styled.div`
  margin-top: auto;
  display: flex;
`;

export const Box = styled(motion.div)`
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

export const boxVariant = {
  boxStart: { scale: 0.7, opacity: 0.3 },
  boxEnd: { scale: 1, opacity: 1 },
};

export const Dott = styled.span`
  font-size: 5.5rem;
  margin: auto;
  padding: 20px;
  color: rgb(224, 213, 213);
`;
