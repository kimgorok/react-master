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

// 필요한 스타일 컴포넌트들은 전부 import 하였음\
function ComingSoon() {
  // useScroll은  scrollY의 픽셀 단위를 넘겨줌
  const { scrollY } = useScroll();
  // useQuery로 data를 가져옴. data에는 getComingSoon함수가 반환하는 json데이터가 있음
  const { data } = useQuery<IAPIResponse>(
    ["movies", "ComingSoon"],
    getComingSoon
  );
  // 내 링크가 현재 coming-soon/:id에 있다면 true를 넘겨줌
  const moviePathMatch: PathMatch<string> | null = useMatch("/coming-soon/:id");
  const navigate = useNavigate();
  // navigate를 통해 onClickImage를 하면 coming-soon/${id}로 이동하게 함
  const onClickImage = (id: number) => {
    navigate(`/coming-soon/${id}`);
  };
  // 현재 URL의 경로에 추출한 id가 존재할 경우, results에서 가져온 movie.id와
  // 내 URL 경로의 id가 일치할 경우
  const clickedImg =
    moviePathMatch?.params.id &&
    data?.results.find((movie) => movie.id + "" === moviePathMatch.params.id);

  // 현재 URL의 id 매개변수를 추출하여 컴포넌트 내에서 사용할 수 있게 함
  const { id } = useParams<{ id: string }>();
  const movieId = id + "";

  const [movieDetail, setMovieDetail] = useState<IMovieDetail>();

  // movieId의 값(링크주소)이 바뀔 때 마다 작동
  // 새로운 movieId의 값을 movie에 저장하고
  // setMovieDetail을 통해 movieDetail에 movie를 저장함
  // 그리고 fetchMovieDetail을 실행
  useEffect(() => {
    const fetchMovieDetail = async () => {
      const movie = await getMovie(movieId);
      setMovieDetail(movie);
    };
    fetchMovieDetail();
  }, [movieId]);

  // XClick을 하면 /coming-soon으로 이동
  const XClick = () => navigate("/coming-soon");

  return (
    <Wrapper>
      <List variants={ListVariants}>
        {/* map을 통해 results를 mapping */}
        {data?.results.map((movie) => (
          <Box
            key={movie.id}
            variants={ListVariants}
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
        {/* moviePathMatch가 true일 때 화면에 출력하는 내용 */}
        {moviePathMatch ? (
          <>
            {/* overlay는 화면을 덮음 */}
            <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
            {/* scrolly.get()+100으로 항상 화면 위에서 100px만큼 스크롤 된 상태로 모달을 띄움 */}
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
                      {/* movieDetail이 존재하고 movieDetail budget이 존재할 경우 */}
                      {/* 소수점 아래 두 자리 표시 최소 두자리 최대 두자리 */}
                      {/* toLocaleString으로  천 단위마다 쉼표를 넣음 */}
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
                      {/* toFixed로 소수점 아래 1자리 까지 표시함 */}
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
