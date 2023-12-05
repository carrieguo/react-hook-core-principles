const { createRoot } = ReactDOM;
const root = createRoot(document.getElementById("app"));

const { useState, memo, useMemo,useCallback } = React;
/*  函数组件最大的弱点：渲染执行
当一个组件状态发生改变时，相关试图必然更新
函数组件在试图更新需求来临时，函数必然执行


*/
const Child = memo((props) => {
  /* 点击第一个按钮 child也会执行,
  但是memo可以创建一个组件的备忘,memo包裹后可以帮助判断当前组件需要的状态是否更新，来自己决定是否执行子组件函数 */
  console.log("memo 对于普通传值 child function is calling");
  return <div style={{ display: "inline-block" }}>count2:{props.count2}</div>;
});
const Child2 = memo((props) => {
  /* memo核心会对引用进行比较，这种比较是浅比较
  childData引用，如果更新了一个新的引用，那么child就会被执行，
  如果引用没有变化，那么child就不会执行
  count1更新，APP必然执行，
  childData被重新赋值，所以child2重新执行
  */
  console.log("memo 对于引用传值 child2 function is calling");
  return (
    <div style={{ display: "inline-block" }}>
      childData count2:{props.childData.count2}
    </div>
  );
});

const Child3 = memo((props) => {
  console.log("setMemo 对于引用传值 child3 function is calling");
  return (
    <div style={{ display: "inline-block" }}>
      childData3 count2:{props.childData.count2}
    </div>
  );
});

const Child4 = memo((props) => {
  console.log("setMemo 对于引用(函数)传值 child4 function is calling");
  return (
    <div>
      <div style={{ display: "inline-block" }}>
        childData4 count2:{props.childData.count2}
      </div>
      <button onClick={props.cbSetCount2}>+</button>
    </div>
  );
});
const Child5 = memo((props) => {
    console.log("useCallBack 对于引用(函数)传值 child5 function is calling");
    return (
      <div>
        <div style={{ display: "inline-block" }}>
          childData4 count2:{props.childData.count2}
        </div>
        <button onClick={props.cbSetCount2}>+</button>
      </div>
    );
  });
function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const childData = { count2 };

  /* useMemo是否返回一个新的引用，取决于第二个参数count2是否发生改变
  有点类似vue的computed,区别在于vue自动收集依赖，react手动收集依赖 */
  const childData3 = useMemo(() => ({ count2: count2 * 2 }), [count2]);

  /*  */
  const cbSetCount1 = () => {
    setCount2(count2 + 1);
  };
  const cbSetCount2 = useCallback(() => {
    setCount2(count2 + 1);
  },[]);
  return (
    <div>
      <h1 style={{ display: "inline-block" }}>count1:{count1}</h1>
      <button
        onClick={() => {
          setCount1(count1 + 1);
        }}
      >
        +
      </button>
      <Child count2={count2}></Child>
      <button
        onClick={() => {
          setCount2(count2 + 1);
        }}
      >
        +
      </button>

      <Child2 childData={childData}></Child2>
      <button
        onClick={() => {
          setCount2(count2 + 1);
        }}
      >
        +
      </button>
      <Child3 childData={childData3}></Child3>
      <button
        onClick={() => {
          setCount2(count2 + 1);
        }}
      >
        +
      </button>
      <Child4 childData={childData3} cbSetCount2={cbSetCount1}></Child4>
      <Child5 childData={childData3} cbSetCount2={cbSetCount2}></Child5>
    </div>
  );
}
root.render(<App></App>);
export default App;
