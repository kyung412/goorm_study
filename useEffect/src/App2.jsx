import { useState, useEffect } from "react";
import './App.css';

//상태 변화 감지(Update)
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`현재 카운트: ${count}`);
  }, [count]); 

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default App;