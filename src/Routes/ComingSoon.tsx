import { useQuery } from "@tanstack/react-query";
import {
  IAPIResponse,
  IMovieDetail,
  getMovie,
  getComingSoon,
  makeBgPath,
  makeImagePath,
} from "../api";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { PathMatch, useMatch, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BigCover,
  BigMovie,
  BigOthers,
  BigOverView,
  BigTitle,
  Box,
  Boxanimation,
  Img,
  ImgVariants,
  List,
  ListVariants,
  Overlay,
  Title,
  Wrapper,
  XButton,
} from "../Components/Components";

function ComingSoon() {
  const { scrollY } = useScroll();

  const { data } = useQuery<IAPIResponse>(
    ["movies", "ComingSoon"],
    getComingSoon
  );
  const moviePathMatch: PathMatch<string> | null = useMatch("/coming-soon/:id");
  const navigate = useNavigate();

  const onClickImage = (id: number) => {
    navigate(`/coming-soon/${id}`);
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

  const XClick = () => navigate("/coming-soon");

  return (
    <Wrapper>
      <List variants={ListVariants}>
        {data?.results.map((movie, ComingS) => (
          <Box
            key={movie.id}
            variants={ListVariants}
            custom={ComingS}
            initial="hidden"
            animate="visible"
          >
            <motion.path
              variants={Boxanimation}
              initial="start"
              animate="end"
              transition={{
                type: "spring",
                stiffness: 10,
                damping: 0,
              }}
            ></motion.path>
            <Img
              layoutId={movie.id + ""}
              onClick={() => onClickImage(movie.id)}
              variants={ImgVariants}
              initial="normal"
              whileHover="hover"
              bgphoto={makeImagePath(movie.poster_path)}
            />
            <Title>{movie.title}</Title>
          </Box>
        ))}
      </List>
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

export default ComingSoon;
