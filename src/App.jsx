console.log(React);
const { createRoot } = ReactDOM;
const { useState, useReducer, useEffect } = React;

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
let t;
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
  const [second, setSecond] = useState(0);

  //useEffect 原理手动收集依赖。类似VUE3的watchEffect,区别vue3是自动手机依赖
  // useEffect 代替类组件的生命周期钩子,简化生命周期函数.第一个参数是回调函数，第二个参数是依赖数组depArr，判断回调函数何时执行
  // depArr 在组件App外维护，App每次执行，对比组件外保存的depArr有没有不同，如果有差别，就会执行回调
  /* 如果第二个参数undefined=>任何状态改变时，都会重新执行回调
    如果第二个参数不是数组，会报错
    如果第二个参数是空数组，回调只会在函数组件调用时执行一次(类似conponentDidMount)
    如果第二个参数是一个非空数组，数组元素是状态=》状态更新，回调重新执行一次(类似componentDidUpdate)
  */
  //  回调函数不能为async函数，因为async返回promise .回调函数的返回值只能为普通函数 用于消除副作用
  useEffect(() => {
    // depArr => the Array of dependencies
    t = setInterval(() => {
      setSecond((second) => second + 1);
    }, 1000);
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
      <h2>{count}</h2>
      <h2>{second}s</h2>
      <button onClick={() => dispatch({ type: "PLUS", payload: 1 })}>+</button>
      <button onClick={() => dispatch({ type: "MINUS", payload: 1 })}>-</button>
      <button onClick={() => dispatch({ type: "TIMES", payload: 2 })}>*</button>
      <button onClick={() => dispatch({ type: "DIV", payload: 2 })}>/</button>
    </div>
  );
}
root.render(<App></App>);
