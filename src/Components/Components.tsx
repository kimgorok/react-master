import { motion } from "framer-motion";
import styled from "styled-components";

// 최대 높이가 아닌 최소 높이를 100으로 해서 페이지 크기가 100vh가 넘어가도 스타일 적용
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  padding: 70px;
  background-color: ${(props) => props.theme.black.veryDark};
  position: relative;
`;

// grid로 한 줄에 3개씩 배치. gap은 50px.
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

// props로 bgphoto에 url을 전달
// 배경 이미지를 중앙에 두고 이미지가 작아도 꽉 차게 함
export const Img = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 15px;
  height: 250px;
  width: 175px;
  cursor: pointer;
`;

// 박스가 처음 등장 할 때의 애니메이션
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

// List 요소들이 0.25초 간격으로 하나씩 뿅 등장하게 하기 위해서
export const ListVariants = {
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.25,
    },
  }),
};

// 이미지에 마우스를 올리면 크기가 커지면서 0.1초만에 위로 올라감
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

// 이미지를 클릭하면 등장하는 모달
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
