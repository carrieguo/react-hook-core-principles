console.log(React);
const { createRoot } = ReactDOM;
const { useState, useReducer } = React;

/* 
React =>view Library
data => state
state =>view
视图上的状态发生变化，视图进行相应的更新
react=>运行时
vue=>编译时语言
*/
//与类组件相比的好处，不用关心this,在事件处理函数中，this指向类实例

const root = createRoot(document.getElementById("app"));
function App() {
  //数组解构，名称可以自定义
  //   const [count, setCount] = useState(1);
  // + - * / =>计算count
  // count => 多种操作方案，每一种方案可能有很多地方需要使用
  // useReducer => 收集所有操作某一个数据的方案。是一个非常好的解决对状态进行修改的方案集合的方法。
  // 派发器=>传入不同的操作类型=》调用不同的逻辑
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
  const [count, dispatch] = useReducer(countReducer, 0);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch({ type: "PLUS", payload: 1 })}>+</button>
      <button onClick={() => dispatch({ type: "MINUS", payload: 1 })}>-</button>
      <button onClick={() => dispatch({ type: "TIMES", payload: 2 })}>*</button>
      <button onClick={() => dispatch({ type: "DIV", payload: 2 })}>/</button>
    </div>
  );
}
root.render(<App></App>);
