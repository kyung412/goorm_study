import { useState, useEffect } from "react";
import './App.css';

// 외부 데이터 가져오기(마운트시 한번만 실행)
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((data) => setData(data)); 
  }, []); 

  return (
    <div>
      <h1>{data ? data.title : "Loading..."}</h1>
    </div>
  );
}

export default App;