import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

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

  font-size: 1.5rem;
  background-color: black;
  color: white;
  z-index: 1;
`;

const Items = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 720px;
`;

const Item = styled.li`
  color: white;
  position: relative;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;

function Header() {
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
