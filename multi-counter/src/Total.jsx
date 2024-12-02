/* eslint-disable react/prop-types */
function Total({ counters }) {
  const total = counters.reduce((sum, count) => sum + count, 0);

  return (
    <p style={{ marginTop: "20px", fontWeight: "bold" }}>
      Total: {total}
    </p>
  );
}

export default Total;