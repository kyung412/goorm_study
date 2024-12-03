import { useState } from "react";
import Timer from "./Timer";
import './App.css';

function App() {
  const [showTimer, setShowTimer] = useState(true);

  return ( 
    // 정리 작업은 리소스를 해제하거나 이벤트를 제거하는 데 사용
    <div>
      <h1>React Timer</h1>

      {showTimer && <Timer />} {/* 타이머 컴포넌트 표시 여부 */}

      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? "Remove Timer" : "Show Timer"}
      </button>
      {/* 버튼(boolean toggle)을 클릭하면 showTimer가 false로 변경되어 Timer 컴포넌트가 화면에서 제거 */}
    </div>
  );
}

export default App;