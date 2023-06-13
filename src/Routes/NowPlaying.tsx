import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {
  IAPIResponse,
  IMovieDetail,
  getMovie,
  getNowPlaying,
  makeBgPath,
  makeImagePath,
} from "../api";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { PathMatch, useMatch, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  padding: 70px;

  position: relative;
`;

const NowPlayingList = styled(motion.div)`
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(3, 1fr);
  width: 720px;
  margin-top: 50px;
`;

const NowPlayingBox = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Img = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 15px;
  height: 250px;
  width: 150px;
  cursor: pointer;
`;

const Title = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 1.5rem;
`;

const NowPlayingVariants = {
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

const ImgVariants = {
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const XButton = styled.svg`
  cursor: pointer;
  transform: scale(0.05);
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0.5;
  z-index: 1;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 600px;
`;

const BigTitle = styled.div`
  width: 100%;
  font-size: 2.5rem;
  position: relative;
  top: -100px;
  padding: 20px;
`;

const BigOverView = styled.div`
  margin-top: -100px;
  margin-left: 10px;
  padding: 10px;

  font-weight: lighter;
  color: ${(props) => props.theme.white.lighter};
`;

const BigOthers = styled.div`
  position: relative;
  left: 0px;
  padding: 10px;
  font-weight: normal;
`;

function NowPlaying() {
  const { scrollY } = useScroll();

  const { data } = useQuery<IAPIResponse>(
    ["movies", "NowPlaying"],
    getNowPlaying
  );
  const moviePathMatch: PathMatch<string> | null = useMatch("/now-playing/:id");
  const navigate = useNavigate();

  const onClickImage = (id: number) => {
    navigate(`/now-playing/${id}`);
  };

  const clickedImg =
    moviePathMatch?.params.id &&
    data?.results.find((movie) => movie.id + "" === moviePathMatch.params.id);

  const [movieDetail, setMovieDetail] = useState<IMovieDetail>();

  const { id } = useParams<{ id: string }>();
  const movieId = id + "";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movie = await getMovie(movieId);
        setMovieDetail(movie);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  const XClick = () => navigate("/now-playing");

  return (
    <Wrapper>
      <NowPlayingList variants={NowPlayingVariants}>
        {data?.results.map((movie, NowPlay) => (
          <NowPlayingBox
            key={movie.id}
            variants={NowPlayingVariants}
            custom={NowPlay}
            initial="hidden"
            animate="visible"
          >
            <Img
              layoutId={movie.id + ""}
              onClick={() => onClickImage(movie.id)}
              variants={ImgVariants}
              initial="normal"
              whileHover="hover"
              bgPhoto={makeImagePath(movie.poster_path)}
            />
            <Title>{movie.title}</Title>
          </NowPlayingBox>
        ))}
      </NowPlayingList>
      <AnimatePresence>
        {moviePathMatch ? (
          <>
            <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
            <BigMovie
              style={{ top: scrollY.get() + 100 }}
              layoutId={moviePathMatch.params.id}
            >
              {clickedImg && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, rgb(20, 20, 20), transparent), url(${makeBgPath(
                        clickedImg.backdrop_path
                      )})`,
                    }}
                  >
                    <XButton
                      onClick={XClick}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <motion.path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      />
                    </XButton>
                  </BigCover>

                  <BigTitle>{clickedImg.title}</BigTitle>
                  <BigOverView>{clickedImg.overview}</BigOverView>
                  <BigOthers>
                    <BigOthers>
                      Budget: $
                      {movieDetail && movieDetail.budget
                        ? movieDetail.budget.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ""}
                      <br />
                      Revenue: $
                      {movieDetail && movieDetail.revenue
                        ? movieDetail.revenue.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ""}
                      <br />
                      Runtime: {movieDetail?.runtime} minutes
                      <br />
                      Rating:
                      {movieDetail && movieDetail.vote_average
                        ? movieDetail.vote_average.toFixed(1)
                        : ""}
                      <br />
                      Homepage: {movieDetail?.homepage}
                    </BigOthers>
                  </BigOthers>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default NowPlaying;
