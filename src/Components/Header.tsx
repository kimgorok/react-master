import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// 가운데에 두기 위해 left:0 right:0 margin:auto 사용
const Nav = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;

  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 30px;
  // props로 theme을 불러와서 미리 정해둔 black과 white를 불러옴
  font-size: 1.5rem;
  background-color: ${(props) => props.theme.black.veryDark};
  color: ${(props) => props.theme.white.lighter};
  // z-index: 1을 통해 Nav가 항상 화면의 위에 있도록 함
  z-index: 1;
`;

const Items = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 720px;
`;

const Item = styled.li`
  color: ${(props) => props.theme.white.lighter};
  position: relative;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  // width와 height의 절반으로 원을 만듬
  border-radius: 2.5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

function Header() {
  // useLocation으로 내 링크의 pathname을 가져옴
  const location = useLocation();

  // 가져온 pathname을 통해 해당 링크에 있느냐로 조건을 만듬
  // startWith를 통해 해당 링크로 시작하는지 확인
  return (
    <>
      <Nav>
        <Items>
          <Item>
            <Link to="/">
              POPULAR
              {(location.pathname === "/" ||
                location.pathname.startsWith("/popular")) && (
                <Circle layoutId="circle" />
              )}
            </Link>
          </Item>
          <Item>
            <Link to="coming-soon/">
              COMING SOON
              {location.pathname.startsWith("/coming-soon") && (
                <Circle layoutId="circle" />
              )}
            </Link>
          </Item>
          <Item>
            <Link to="now-playing/">
              NOW PLAYING
              {location.pathname.startsWith("/now-playing") && (
                <Circle layoutId="circle" />
              )}
            </Link>
          </Item>
        </Items>
      </Nav>
    </>
  );
}

export default Header;
