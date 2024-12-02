import Counter from "./Counter";
function CounterList({ counters, onIncrease, onDecrease }) {
  return (
    <div>
      {counters.map((count, index) => (
        <Counter
          key={index}
          index={index}
          count={count}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </div>
  );
}

export default CounterList;