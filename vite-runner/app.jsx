import React from '../core/react.js';

function Counter({ num }) {
  return (
    <div>Count: {num}</div>
  );
}

function APP () {
  return (
    <div className="app">
      APP
      <Counter num={10}></Counter>
      <Counter num={20}></Counter>
    </div>
  );
}

export default APP;