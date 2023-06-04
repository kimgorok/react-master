import { useQuery } from "react-query";
import { fetchHome } from "./api";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 화면의 모든 요소에 padding과 margin적용
// margin: 10 auto;로 가운데로 정렬시킴
const Container = styled.div`
  padding: 10px 60px;
  margin: 10 auto;
`;

// loading할 때 잠깐 보이는 폰트의 style
const Loader = styled.span`
  text-align: left;
  display: block;
  font-size: 30px;
`;

// 제목을 담고있는 Header부분의 style.
// 높이는 화면의 13%만큼 차지
const Header = styled.header`
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 제목의 style. 컬러는 theme.ts에서 정의한 색을
// props로 받아와서 적용
const Title = styled.h1`
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
`;

// grid를 사용해서 화면의 요소를 정렬
const CharacterList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

// 캐릭터 리스트에 여러 속성들을 적용.
// 내부에 캐릭터 내부의 span들에만 적용되는 속성과
// 마우스를 올렸을 때 적용되는 속성들을 저런식으로 적음
const Character = styled.li`
  color: ${(props) => props.theme.textColor};
  padding: 10px;
  border-radius: 10px;
  margin: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  span {
    display: flex;
    margin-top: 20px;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    transition: background-color 0.1s ease-in;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.accentColor};
  }
`;

// 이미지의 크기 설정과, 이미지를 원형으로 표시
const Img = styled.img`
  display: block;
  margin: 0 auto;
  width: 155px;
  height: 155px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

// HomePage에 사용되는 data들의 interface
interface IHome {
  id: number;
  imageUrl: string;
  name: string;
}

function HomePage() {
  // useQuery를 사용해서 isLoading과 data를 사용
  // useQuery의 uniquKey와, fetcher함수(fetchHome)를 기입
  // fetchHome이 로딩중이면 isLoading이 true가 됨
  // data는 fetchHome의 fetch가 끝나면 이 함수의 데이터(json)을 data에 넣어줌
  const { isLoading, data } = useQuery<IHome[]>("characters", fetchHome);
  return (
    <Container>
      <Header>
        <Title>Disney Characters</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CharacterList>
          {data?.map((character) => (
            <Character key={character.id}>
              <Link to={{ pathname: `/character/${character.id}` }}>
                <Img src={character.imageUrl} />
                <span>{character.name}</span>
              </Link>
            </Character>
          ))}
        </CharacterList>
      )}
    </Container>
  );
}

export default HomePage;
