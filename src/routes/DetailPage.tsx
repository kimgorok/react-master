import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { fetchDetail } from "./api";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  max-width: 450px;
  // 가운데로 두기 위해
  margin: 0 auto;
`;

const Header = styled.header`
  margin-top: 20%;
  margin-bottom: 5%;
  font-size: 1.5rem;
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
`;

const CharacterName = styled.h1`
  margin: 20px;
  color: ${(props) => props.theme.textColor};
  font-size: 1.5rem;
`;

const FilmContainer = styled.div`
  text-align: center;
`;

const Films = styled.li`
  margin: 5px;
  padding: 0px 5px;
  display: inline-block;
  background-color: white;
  color: ${(props) => props.theme.accentColor};
  border-radius: 5px;
  text-align: left;
  font-size: 1.1rem;
`;

interface ICharacterData {
  id: number;
  films: string[];
  name: string;
  imageUrl: string;
  sourceUrl: string;
}

function DetailPage() {
  const { id } = useParams();
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
