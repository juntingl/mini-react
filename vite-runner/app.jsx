import React from '../core/react.js';

let count = 10;
let props = { id: 1111 }
function Counter({ num }) {
  return (
    <div>Count: {num}</div>
  );
}

function CounterContainer () {
  return (
    <div {...props}>
      <Counter num={30}></Counter>
    </div>
  );
}

function APP () {
  const handleClick = (event) => {
    console.log("Click:", event.target);
    count++;
    props={}
    React.update();
  }
  return (
    <div className="app">
      APP: {count}
      <Counter num={count}></Counter>
      <Counter num={count}></Counter>
      <CounterContainer></CounterContainer>
      <button onClick={handleClick}>点我</button>
    </div>
  );
}

export default APP;