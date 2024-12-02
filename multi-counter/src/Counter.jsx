
function Counter({ index, count, onIncrease, onDecrease }) {
  return (
    <div className="counter">
      <span>
        {index + 1}번 카운터:
      </span>
      <span>
        {count}
      </span>
      <button onClick={() => onIncrease(index)}> + </button>
      <button onClick={() => onDecrease(index)}> - </button>
    </div>
  );
}

export default Counter;