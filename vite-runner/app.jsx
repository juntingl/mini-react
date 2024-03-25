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
  return (
    <div className="app">
      APP
      <Counter num={10}></Counter>
      <Counter num={20}></Counter>
      <CounterContainer></CounterContainer>
    </div>
  );
}

export default APP;