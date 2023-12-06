import { root, useState, memo, useMemo, useCallback } from "./React";

const Child = memo((props) => {
  console.log("memo 对于普通传值 child function is calling");
  return <div>child count2:{props.count2}</div>;
});
const Child2 = memo((props) => {
  console.log("memo 对于引用传值 child2 function is calling");
  return (
    <div>
      childData count2:{props.childData.count2}
    </div>
  );
});
const Child3 = memo((props) => {
  console.log("setMemo 对于引用传值 child3 function is calling");
  return <div>childData3 count2:{props.childData.count2}</div>;
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
  const childData3 = useMemo(() => ({ count2: count2 * 2 }), [count2]);
  const cbSetCount1 = () => {
    setCount2(count2 + 1);
  };
  const cbSetCount2 = useCallback(() => {
    setCount2(count2 + 1);
  }, []);
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
