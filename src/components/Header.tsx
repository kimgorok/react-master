import { Link } from "react-router-dom";

// 헤더에는 메인 화면("/")으로 이동하는 Home과
// About페이지("/about")으로 이동하는 About 링크를 가지고 있다.

function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
