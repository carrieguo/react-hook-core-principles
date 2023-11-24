// const { createRoot } = ReactDOM;
// const { useState, useReducer, useEffect } = React;
// const root = createRoot(document.getElementById("app"));

import { root, useState } from './React';
function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <h1>{count2}</h1>
      <button onClick={() => setCount2(count2 + 1)}>+</button>
      <button onClick={() => setCount2(count2=>count2 - 1)}>-</button>
    </div>
  );
}
root.render(<App></App>);
export default App
