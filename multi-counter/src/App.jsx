import { useState } from "react";
import CounterList from "./CounterList.jsx";
import Total from "./Total";
import './App.css';

function App() {
  const [counters, setCounters] = useState([0, 0, 0]); 

  const increase = (index) => {
    setCounters((prev) =>
      prev.map((count, i) => (i === index ? count + 1 : count))
    );
  };

  const decrease = (index) => {
    setCounters((prev) =>
      prev.map((count, i) => (i === index ? count - 1 : count))
    );
  };

  const addCounter = () => {
    setCounters([...counters, 0]);
  };

  return (
    <>
      <h1>multi-counter</h1>
      <CounterList
        counters={counters}
        onIncrease={increase}
        onDecrease={decrease}
      />
      <button onClick={addCounter}> 카운터 추가 </button>
      <Total counters={counters} />
    </>
  );
}

export default App;