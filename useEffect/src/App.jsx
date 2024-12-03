import { useEffect } from "react";
import './App.css';

// 매번 실행
function App() {
  useEffect(() => {
    console.log("컴포넌트가 마운트되었습니다!");

    return () => {
      console.log("컴포넌트가 언마운트되었습니다!");
    };
  }); 

  return <div>Hello, React!</div>;
}

export default App;