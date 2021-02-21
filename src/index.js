import MiniReact from './MiniReact';

const virtualDOM = (
  <div className="container">
    <h1>你好，Mini React</h1>
    <h2 data-test="test">(实现 Virtual DOM)</h2>
    <div>
      嵌套1 <div>嵌套1.1</div>
    </div>
    <h3>(观察：这个将会改变)</h3>
    {/*表达式*/}
    {2 === 1 && <div>如果1和2相等，渲染当前内容</div> }
    {2 === 2 && <div>2</div> }
    <span>这是一个 span 标签</span>
    <button onClick={(e) => console.log(e) }>按钮</button>
    <h3>将会被删除</h3>
    文本内容
    <input type="text"/>
  </div>
)

MiniReact.render(virtualDOM, document.querySelector('#root'));

const $pre = document.createElement('pre');
$pre.textContent = JSON.stringify(virtualDOM, null, 2)

document.querySelector('body').append(
  $pre
)

console.log(virtualDOM);