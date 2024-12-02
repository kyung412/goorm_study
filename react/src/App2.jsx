// 컴포넌트 분리 구성
import { useState } from 'react';
import CounterDisplay from './CounterDisplay';
import CounterButton from './CounterButton';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>counter</h1>
      {/* 숫자 표시 컴포넌트 삽입 */}
      <CounterDisplay count={count} />

      {/* 버튼 컴포넌트 삽입 */}
      <CounterButton
        label="증가"
        func={() => setCount(count + 1)}
      />
      <CounterButton
        label="감소"
        func={() => setCount(count - 1)}
      />
    </>
  );
}

export default App;