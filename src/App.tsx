import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

import Board from "./Components/Board";
const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // source어디서 destination어디로 draggableID 어떤걸
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same 보드 무브
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        // 옮기려고 하는 to do object 전체를 가져다 줌
        const taskObj = boardCopy[source.index];
        // 1) Delete item on source.index
        console.log("Delete item on", source.index);
        console.log(boardCopy);
        boardCopy.splice(source.index, 1);
        console.log("Deleted item");
        console.log(boardCopy);
        // 2) Put back the item on the destination.index
        console.log("Put back", draggableId, "on ", destination.index);
        boardCopy.splice(destination?.index, 0, taskObj);
        console.log(boardCopy);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross 보드 무브
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        // 지우기 전에 taskObj에 잠깐 복사해 두는 것
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
