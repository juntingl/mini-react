import ReactDOM from './core/react-dom.js';
import App from './app.js';

// 定义 VDOM JSON
// const el = {
//   type: "div",
//   props: {
//     className: "",
//     style: "",
//     // ...
//     children: [
//       {
//         type: "TEXT_NODE", // 普通文本, 比较特殊，最基础
//         props: {
//           nodeValue: 'app'
//           children: [] // 赋予一个 children 空数组，逻辑好处理子元素
//         },
//       }
//     ]
//   },
// };

const root = document.querySelector("#root");
ReactDOM.createRoot(root).render(App);