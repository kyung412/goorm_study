import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
   
    console.log("Timer started");

    return () => {
      clearInterval(interval); 
      console.log("Timer cleared");
    };
  }, []);

  return <p>Time: {time}s</p>;
}

export default Timer;