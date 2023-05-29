import { useState } from "react";
import styled from "styled-components";

const Contianer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Contianer>
      <H1>protected</H1>
    </Contianer>
  );
}

export default App;
