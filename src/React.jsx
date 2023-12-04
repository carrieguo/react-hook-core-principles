const { createRoot } = ReactDOM;
export const root = createRoot(document.getElementById("app"));

const states = [];
const stateSetters = [];
const effectDepArr = [];

let stateIndex = 0;
let effectIndex = 0;

function createState(initialState) {
  return states[stateIndex] ? states[stateIndex] : initialState;
}

function createStateSetter(stateIndex) {
  console.log("给每个useState挂载了setState函数");
  return (newState) => {
    if (typeof newState === "function") {
      states[stateIndex] = newState(states[stateIndex]);
    } else {
      console.log("执行setState函数");
      states[stateIndex] = newState;
    }

    render();
  };
}
// setState执行，需要重新render组件，此时需要把stateIndex重置为0
// 有疑问？为什么stateIndex重置为0要写在这里.答：重新render之前，将stateIndex初始化
async function render() {
  const App = (await import("./customApp")).default;
  stateIndex = 0;
  effectIndex = 0
  root.render(<App />);
}
export const useState = (initialState) => {
  states[stateIndex] = createState(initialState);
  if (!stateSetters[stateIndex]) {
    stateSetters.push(createStateSetter(stateIndex));
  }

  const _state = states[stateIndex];
  const _setState = stateSetters[stateIndex];
  stateIndex++;
  return [_state, _setState];
};

// 实现useReducer
export const useReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState);
  const dispatch = (action) => {
    const newState = reducer(state, action);
    setState(newState);
  };
  return [state, dispatch];
};

// 实现useEffect
export const useEffect = (cb, depArr) => {
  if (typeof cb !== "function") {
    throw new TypeError("callback must be a function");
  }
  if (depArr === undefined) {
    cb();
  } else if (!Array.isArray(depArr)) {
    throw new TypeError("dependencies must be a function");
  } else {
    const isChanged = effectDepArr[effectIndex]
      ? depArr.some((dep, index) => dep !== effectDepArr[effectIndex][index])
      : true;
    isChanged && cb();
    effectDepArr[effectIndex] = depArr;
    effectIndex++;
  }
};
