import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  toGo: string;
}

interface IToGo {
  text: string;
  id: number;
}

// atom은 key값과 default값(기본값)을 가지고 있음
const toGoState = atom<IToGo[]>({
  key: "toGo",
  default: [],
});

const VisitedState = atom<IToGo[]>({
  key: "visiteds",
  default: [],
});

const loveState = atom<IToGo[]>({
  key: "love",
  default: [],
});

function ToDoList() {
  // useRecoilState(atom), 이는 useState처럼 atom의 값을 바꿈
  const [toGos, setToGos] = useRecoilState(toGoState);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IForm>();

  // ************************************************************
  // handleSubmit은 유저가 submit을 하면 다른 일을 모두 마친 후, handleValid를 호출
  // 폼에 입력을 하는 함수. handleSubmit함수 안에 들어감
  const handleValid = ({ toGo }: IForm) => {
    // 유저가 toGo를 적지 않았을 때 오류 표시
    // 에러 발생 시 메시지와, shouldFocus를 통해 커서를 toGo로 이동시킴
    if (toGo === "") {
      setError("toGo", { message: "required!" }, { shouldFocus: true });
    }

    // 유저가  입력한 값을 {text, id}의 형태로 newToGo에 저장
    const newToGo: IToGo = { text: toGo, id: Date.now() };
    // ToDos를 하나씩 추가, setToGos함수를 통해 toGos 값에 새로운 배열을 저장
    // 여기선 새로 입력한 값이 기존의 값 뒤로 들어가도록 함
    setToGos((oldToGos) => [newToGo, ...oldToGos]);
    // submit 이후에 toGo를 빈칸으로 함
    setValue("toGo", "");

    // localStorage에 데이터 저장
    // localStarage에는 키값이 savelist라는 저장소를 만듬
    const updatedList = [...toGos, newToGo];
    localStorage.setItem("savelist", JSON.stringify(updatedList));
    // 상태 업데이트 후 텍스트 보이도록 다시 설정
    setToGos(updatedList);
  };
  // ********** 여기까지 handleValid **********

  // useEffect를 사용하여 localStorage에 저장된 값을 가져와 savedList에 저장
  useEffect(() => {
    const savedList = localStorage.getItem("savelist");
    // savedList 값이 존재한다면 savedList를 객체형태로 바꾸고 setToGos를 업데이트
    if (savedList) {
      setToGos(JSON.parse(savedList));
    }
  }, [setToGos]);

  // li를 삭제하는 버튼 함수
  const handleDelete = (id: number) => {
    // filter를 통해 선택한 id와 다른 id를 가진 요소로 새로운 배열을 만듬
    const updatedListAfterDelete = toGos.filter((toGo) => toGo.id !== id);
    setToGos(updatedListAfterDelete);
    localStorage.setItem("savelist", JSON.stringify(updatedListAfterDelete));
  };
  // ************************************************************

  // ************************************************************
  // 두 번째 리스트
  const [visiteds, setVisited] = useRecoilState(VisitedState);
  // 내가 가본 나라들에 li 추가
  const visitedList = (id: number) => {
    // toGo의 id와 선택된 id가 일치하면 selectedToGo에 값을 저장
    const selectedToGo = toGos.find((toGo) => toGo.id === id);

    // selectedToGo값이 존재할 경우
    if (selectedToGo) {
      // filter를 통해 선택한 id와 다른 id를 가진 요소로 새로운 배열을 만듬
      setToGos((oldToGos) => oldToGos.filter((toGo) => toGo.id !== id));
      // 그리고 기존의 값과 selectedToGo를 추가한 새로운 배열을 setVisited에 전달
      setVisited((oldVisited) => [...oldVisited, selectedToGo]);
    }
  };

  // 가본 나라들 취소
  const SecondCancle = (id: number) => {
    // filter를 통해 선택한 id와 같은 id를 가진 요소로 새로운 배열을 만듬
    const selectedVisited = visiteds.find((Visited) => Visited.id === id);
    // selectedVisited값이 존재할 경우
    if (selectedVisited) {
      // filter를 통해 선택한 id와 다른 id를 가진 요소로 새로운 배열을 만듬
      setVisited((oldVisited) =>
        oldVisited.filter((visited) => visited.id !== id)
      );
      /* 그리고 기존의 값과 selectedVisited의 값을 추가한 새로운 배열을 
          setToGos에 전달하여 다시 첫 번째 리스트로 보냄 */
      setToGos((oldToGos) => [...oldToGos, selectedVisited]);
    }
  };
  // ************************************************************

  // ************************************************************
  // 세 번째 리스트
  const [love, setLove] = useRecoilState(loveState);
  // 내가 좋아하는 나라들에 li 추가
  const LoveList = (id: number) => {
    // visiteds의 id와 선택된 id가 일치하는 요소들로 새로운 배열을 만듬
    const selectedVisited = visiteds.find((visited) => visited.id === id);
    // selectedVisited에 값이 존재할 경우
    if (selectedVisited) {
      // filter를 통해 선택한 id와 다른 id를 가진 요소로 새로운 배열을 만듬
      // 이것이 다시 visited가 됨
      setVisited((oldVisiteds) =>
        oldVisiteds.filter((visited) => visited.id !== id)
      );
      // 그리고 love에는 기존의 배열에 selectedVisited가 추가된 새로운 배열이 전달됨
      setLove((oldLove) => [...oldLove, selectedVisited]);
    }
  };

  // 좋아하는 나라들 취소
  const LoveCancle = (id: number) => {
    // find를 통해 유저가 선택한 id와 일치하는 id값을 가진 요소들을 selectedLove에 저장
    const seletedLove = love.find((love) => love.id === id);
    // selectedLove가 존재할 경우
    if (seletedLove) {
      /* setLove는 filter를 통해 유저가 선택한 id와 다른 값을 가진 id를 가진 요소들로 
          배열이 새로 만들어지고 */
      setLove((oldLove) => oldLove.filter((love) => love.id !== id));
      // setVisited에는 기존의 값과 selectedLove가 추가된 새로운 배열이 전달됨
      setVisited((oldVisited) => [...oldVisited, seletedLove]);
    }
  };
  // ************************************************************

  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toGo", {
            required: "😡required!",
          })}
          placeholder="이름"
        />
        <span>{errors?.toGo?.message}</span>
        <button>가자!</button>
      </form>

      <ul>
        {toGos.map((toGo) => (
          <li key={toGo.id}>
            {toGo.text}
            <button onClick={() => visitedList(toGo.id)}> ✅ </button>
            <button onClick={() => handleDelete(toGo.id)}> 🗑 </button>
          </li>
        ))}
      </ul>

      <ul>
        내가 가본 나라들
        {visiteds.map((Visited) => (
          <li key={Visited.id}>
            {Visited.text}
            <button onClick={() => LoveList(Visited.id)}> 👍 </button>
            <button onClick={() => SecondCancle(Visited.id)}> ❌ </button>
          </li>
        ))}
      </ul>

      <ul>
        내가 좋아하는 나라들
        {love.map((love) => (
          <li key={love.id}>
            {love.text}
            <button onClick={() => LoveCancle(love.id)}>👎</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
