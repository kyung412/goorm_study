// 단일 컴포넌트 구성
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>counter</h1>
      <p>{count}</p> 
      <button onClick={() => setCount(count + 1)}> 증가 </button>
      <button onClick={() => setCount(count - 1)}> 감소 </button>
    </>
  );
}

export default App;