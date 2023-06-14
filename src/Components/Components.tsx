import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  padding: 70px;
  background-color: ${(props) => props.theme.black.veryDark};
  position: relative;
`;

export const List = styled(motion.div)`
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(3, 1fr);
  width: 720px;
  margin-top: 50px;
`;

export const Box = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Img = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 15px;
  height: 250px;
  width: 175px;
  cursor: pointer;
`;

export const Boxanimation = {
  start: {
    scale: 0.5,
  },
  end: {
    scale: 1,
  },
};

export const Title = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 1.5rem;
`;

export const ListVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.25,
    },
  }),
};

export const ImgVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -20,
    transition: { duration: 0.1 },
  },
};

export const BigMovie = styled(motion.div)`
  position: absolute;
  width: 640px;
  height: auto;
  margin: auto;
  background-color: rgb(20, 20, 20);
  border-radius: 15px;
  overflow: hidden;
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const XButton = styled.svg`
  cursor: pointer;
  scale: 0.05;
  position: absolute;
  top: -500px;
  right: -500px;
  opacity: 0.5;
  z-index: 1;
`;

export const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 600px;
`;

export const BigTitle = styled.div`
  width: 100%;
  font-size: 2.5rem;
  position: relative;
  top: -100px;
  padding: 20px;
`;

export const BigOverView = styled.div`
  margin-top: -100px;
  margin-left: 10px;
  padding: 10px;

  font-weight: lighter;
  color: ${(props) => props.theme.white.lighter};
`;

export const BigOthers = styled.div`
  position: relative;
  left: 0px;
  padding: 10px;
  font-weight: normal;
`;
