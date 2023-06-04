import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { fetchDetail } from "./api";
import styled from "styled-components";

// DetailPage를 담은 Container
// 전체적인 속성들을 적용
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  max-width: 450px;
  margin: 0 auto;
`;

// HomePage로 가는 화살표를 담은 Header
// margin의 top과 bottom으로 위 아래 간격을 적용
const Header = styled.header`
  margin-top: 20%;
  margin-bottom: 5%;
  font-size: 1.5rem;
`;

// image의 크기 설정과 원형으로 적용
const Img = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
`;

// 캐릭터의 이름의 크기와 색
// 색은 theme.ts에서 props로 가져옴
const CharacterName = styled.h1`
  margin: 20px;
  color: ${(props) => props.theme.textColor};
  font-size: 1.5rem;
`;

const FilmContainer = styled.div`
  text-align: center;
`;

// 영화 이름들의 속성 적용
const Films = styled.li`
  margin: 5px;
  padding: 0px 5px;
  display: inline-block;
  background-color: white;
  color: ${(props) => props.theme.accentColor};
  border-radius: 5px;
  text-align: left;
  font-size: 1.3rem;
`;

// 캐릭터의 data의 interface
// films는 string의 array이다.
interface ICharacterData {
  id: number;
  films: string[];
  name: string;
  imageUrl: string;
  sourceUrl: string;
}

function DetailPage() {
  // useParams를 사용해서 현재 URL의 id 매개변수를 추출해서
  // 현재 컴포넌트 내에서 사용할 수 있게 함
  const { id } = useParams();
  // useQuery를 사용해서 data를 사용
  // useQuery의 uniquKey와, fetcher함수(fetchDeatail)를 기입
  // data는 fetchHome의 fetch가 끝나면 이 함수의 데이터(json)을 data에 넣어줌
  // react-query가 query를 array로 보고 있으므로, key 값을 array로 해주고
  // 앞에 아이템 이름을 붙이면 고유한 id 값이 됨

  // api.ts에서 fetcher함수(fetchDetail)가 매개변수를 받을 때는
  // () => fn(id)로 매개변수를 전달
  const { data } = useQuery<ICharacterData>(["character", id], () =>
    fetchDetail(id)
  );

  return (
    <Container>
      <Header>
        <Link to={`/`}>&larr;</Link>
      </Header>
      <Img src={data?.imageUrl} />
      <CharacterName>{data?.name}'s Films'</CharacterName>
      <FilmContainer>
        {data?.films.map((film) => (
          <Films>{film}</Films>
        ))}
      </FilmContainer>
    </Container>
  );
}

export default DetailPage;
