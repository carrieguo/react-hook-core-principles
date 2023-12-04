// const { createRoot } = ReactDOM;
// const { useState, useReducer, useEffect } = React;
// const root = createRoot(document.getElementById("app"));

import { root, useState,useReducer,useEffect } from './React';
let t;
function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const [count3, dispatch] = useReducer(countReducer, 0);
  function countReducer(count, { type, payload }) {
    switch (type) {
      case "PLUS":
        return count + payload;
      case "MINUS":
        return count - payload;
      case "TIMES":
        return count * payload;
      case "DIV":
        return count / payload;
      default:
        return count;
    }
  }


  const [second, setSecond] = useState(0);
  useEffect(() => {
    // depArr => the Array of dependencies
    t = setInterval(() => {
      setSecond((second) => second + 1);
    }, 3000);
    //页面卸载时
    // componentWillUnmount
    return () => {
      clearInterval(t);
      t = null;
    };
  }, []);
  useEffect(() => {
    setSecond(count);
  }, [count]);

  return (
    <div>
      {/* useState */}
      
      <h2>{count}</h2><i>setState普通传参</i>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      
      <h2>{count2}</h2><i>setState函数传参</i>
      <button onClick={() => setCount2(count2 + 1)}>+</button>
      <button onClick={() => setCount2(count2=>count2 - 1)}>-</button>
      {/* useReducer */}
      
      <h2>{count3}</h2><i>useReducer</i>
      <button onClick={() => dispatch({ type: "PLUS", payload: 1 })}>+</button>
      <button onClick={() => dispatch({ type: "MINUS", payload: 1 })}>-</button>
      {/* useEffect */}
      
      <h2>{second}s</h2><i>useEffect</i>
    </div>
  );
}
root.render(<App></App>);
export default App
