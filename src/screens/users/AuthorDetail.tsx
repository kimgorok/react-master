import { Link, Outlet, useParams } from "react-router-dom";
import { hps } from "../bookdetail";
import { lotrs } from "../bookdetail";

function AuthorDetail() {
  // useParams()를 사용해서 내 링크의 name을 가져옴
  // 링크는 "author/:name"의 형태이므로 useParams()를 사용해서
  // name을 가져올 수 있음
  const { name } = useParams();

  // 조건을 통하여 화면의 어떤 작가를 render할지 선택 함
  // selectAuthor는 hps와 lotrs 두 값중 하나만 들어감
  let selectAuthor: typeof hps | typeof lotrs = [];
  name === "J.k.Rowling" ? (selectAuthor = hps) : (selectAuthor = lotrs);

  // h1으로 작가의 이름이 화면에 출력되고,
  // 선택된 selectAuthor에 map을 하여 그 작가의 책 이름으로 된
  // 두개의 배열 링크가 만들어짐.
  // 링크는 "/author/작가이름/책이름" 형태가 됨
  // Outlet으로 자식을 render함
  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {selectAuthor.map((book) => (
          <li key={book.id}>
            <Link to={`/author/${name}/${book.name}`}>{book.name}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

export default AuthorDetail;
