import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;

/**
 * !버그 상태
 * 현재 보고 있는 톡을 삭제했을 때
 * 이름이 없는 톡을 보여준다.
 *
 * 이런 상황에서 아무런 톡도 안보여주고 중앙이 비어있게 만들고 싶다.
 */
