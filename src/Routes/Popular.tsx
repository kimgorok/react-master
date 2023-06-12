import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IAPIResponse, getPopular, makeBgPath, makeImagePath } from "../api";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: flex;
  justify-content: center; /* 가로상의 가운데 정렬 */
  height: 100vh;
  width: 100vw; /* 화면 전체 너비 */
  background-color: darkred;
`;

const PopularBox = styled(motion.div)``;

const PopularList = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(3, 1fr);
  width: 720px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
`;

const popularVariants = {};

function Popular() {
  const { data } = useQuery<IAPIResponse>(["movies", "popular"], getPopular);
  return (
    <Wrapper>
      <PopularBox>
        <PopularList variants={popularVariants}>
          {data?.results.map((movie) => (
            <Box key={movie.id} bgPhoto={makeImagePath(movie.backdrop_path)}>
              {movie.poster_path}
            </Box>
          ))}
        </PopularList>
      </PopularBox>
    </Wrapper>
  );
}

export default Popular;
