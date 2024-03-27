import React from '../core/react.js';

function Counter({ num }) {
  return (
    <div>Count: {num}</div>
  );
}

function CounterContainer () {
  return (
    <div>
      <Counter num={30}></Counter>
    </div>
  );
}

function APP () {
  const handleClick = (event) => {
    console.log("Click:", event.target);
  }
  return (
    <div className="app">
      APP
      <Counter num={10}></Counter>
      <Counter num={20}></Counter>
      <CounterContainer></CounterContainer>
      <button onClick={handleClick}>点我</button>
    </div>
  );
}

export default APP;