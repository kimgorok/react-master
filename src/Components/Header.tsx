import { motion, useAnimation } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;

  display: flex;
  justify-content: center;

  width: 100%;
  font-size: 28px;
  padding: 20px 60px;
  color: white;
`;

const Items = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 720px;
`;

const Item = styled.li`
  color: white;
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;

function Header() {
  // const navAnimation = useAnimation();
  const popularMatch = useMatch("/");
  const comingSoonMatch = useMatch("coming-soon");
  const nowPlayingMatch = useMatch("now-playing");

  return (
    <>
      <Nav>
        <Items>
          <Item>
            <Link to="/">
              POPULAR {popularMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="coming-soon">
              COMING SOON {comingSoonMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="now-playing">
              NOW PLAYING {nowPlayingMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Nav>
    </>
  );
}

export default Header;
