import { Title, Wrapper } from "./StyleAndMotion";
import BoxAndButton from "./Components/BoxAndButton";
import RoundAndGoal from "./Components/RoundAndGoal";

function App() {
  return (
    <Wrapper>
      <Title>Pomodoro</Title>
      <BoxAndButton />
      <RoundAndGoal />
    </Wrapper>
  );
}

export default App;
