import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import styled from "styled-components";

const Content = styled.div`
  padding-top: 100px;
`;

export default function App() {
  return (
    <div>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
}
