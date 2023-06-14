import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
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
  background-color: ${(props) => props.theme.black.veryDark};
  color: ${(props) => props.theme.white.lighter};
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
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;

function Header() {
  const location = useLocation();

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
