import { useQuery } from "react-query";
import { fetchHome } from "./api";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 10px 60px;
  margin: 10 auto;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Header = styled.header`
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
`;

const CharacterList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

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

const Img = styled.img`
  display: block;
  margin: 0 auto;
  width: 155px;
  height: 155px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

interface IHome {
  id: number;
  imageUrl: string;
  name: string;
}

function HomePage() {
  const { isLoading, data } = useQuery<IHome[]>("characters", fetchHome);
  return (
    <Container>
      <Header>
        <Title>Disney Characters</Title>
      </Header>
      {isLoading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <CharacterList>
          {data?.map((character) => (
            <Character key={character.id}>
              <Link
                to={{ pathname: `/character/${character.id}` }}
                state={{ name: character.name }}
              >
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
