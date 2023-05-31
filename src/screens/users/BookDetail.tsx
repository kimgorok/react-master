import { Link, Outlet, useParams } from "react-router-dom";

// AuthorDetail에서 Outlet으로 render된 BookDetail,
// useParams()를 이용하여 내 링크의 book을 가져옴
// 링크는 "/author/:name/:book"의 형태로 book을 가져올 수 있음
// h1에 book이 나오고 아레에 두 링크가 나오며
// Outlet으로 자식을 render함

function BookDetail() {
  const { book } = useParams();
  return (
    <div>
      <h1>{book}</h1>
      <Link to="chapters">Chapters</Link>
      <br />
      <Link to="characters">Characters</Link>
      <Outlet />
    </div>
  );
}

export default BookDetail;
