import { Link } from "react-router-dom";
import { authors } from "./db";

// Home에 와서도 Header가 계속 보임. Header 아래로 Outlet을 통해 render하였기 때문.
// 기본 화면에 h1이 보이고, ./db에서 가져온 배열 값인 authors를 map함수를 사용하여
// 리스트를 만들고. 그 리스트는 작가의 이름을 한 2개의 링크가 됨.
// 2개의 링크는 /auter/작가이름 의 링크를 가짐

function Home() {
  return (
    <div>
      <h1>Best Seller Authors</h1>

      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <Link to={`/author/${author.name}`}>{author.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
