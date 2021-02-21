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
    <input type="text" value="666"/>
  </div>
)
const modifyDOM = (
  <div className="container">
    <h1>你好，Mini React</h1>
    <h2 data-test="test666">(实现 Virtual DOM)</h2>
    <div>
      嵌套1 <div>嵌套1.1</div>
    </div>
    <h3>(观察：这个将会改变)</h3>
    {/*表达式*/}
    {2 === 1 && <div>如果1和2相等，渲染当前内容</div> }
    {2 === 2 && <div>2</div> }
    <span>这是一个被修改过的 span 标签</span>
    <button onClick={ () => alert(666) }>按钮</button>
    <h6>将会被删除</h6>
    {/* 文本内容
    <input type="text" value="123"/> */}
  </div>
)

MiniReact.render(virtualDOM, document.querySelector('#root'));

setTimeout(() => {
  MiniReact.render(modifyDOM, document.querySelector('#root'));
}, 2000);

function Demo (props) {
  return (
    <div>
      Demo {props.title}
      <Heart/>
    </div>
  )
}
function Heart() {
  return <div>&hearts;</div>
}
// MiniReact.render(<Demo title="Hello React!" />, document.querySelector('#root'))

// 类组件
class Alert extends MiniReact.Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <div>
        React Class Component
        {this.props.title}
      </div>
    )
  }
}
// MiniReact.render(<Alert title="Hello React!" />, document.querySelector('#root'))


// const $pre = document.createElement('pre');
// $pre.textContent = JSON.stringify(virtualDOM, null, 2)
// document.querySelector('body').append(
//   $pre
// )
// console.log(virtualDOM);