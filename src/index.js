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

// MiniReact.render(virtualDOM, document.querySelector('#root'));

// setTimeout(() => {
//   MiniReact.render(modifyDOM, document.querySelector('#root'));
// }, 2000);

/*----------------------------------------------------------------*/

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

/*----------------------------------------------------------------*/

// 类组件
class Alert extends MiniReact.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Alert title'
    }
    this.changeTitle = this.changeTitle.bind(this)
  }
  changeTitle () {
    this.setState({
      title: 'Changed Alert Title'
    })
  }
  render() {
    console.log('state 改变后：', this.state)
    return (
      <div>
        React Class Component
        {this.props.title}
        <br/>
        {this.state.title}
        <button onClick={this.changeTitle}>Change Title</button>
      </div>
    )
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
}
// MiniReact.render(<Alert title="Hello React!" />, document.querySelector('#root'))
// // 组件更新
// setTimeout(() => {
//   MiniReact.render(<Alert title="/nReact Component Alert/n" />, document.querySelector('#root'))
//   // MiniReact.render(<Heart title="React Component Alert" />, document.querySelector('#root'))
// }, 2000);

/*----------------------------------------------------------------*/
// ref 属性
class DemoRef extends MiniReact.Component {
  handle() {
    let value = this.input.value
    console.log(value)
    console.log('Alert Ref:', this.alert);
  }
  render () {
    return (
      <div>
        <input	type="text" ref={ input => (this.input = input) }/>
        <button onClick={this.handle.bind(this)}>点击</button>
        <Alert ref={alert => this.alert = alert} title=" Alert"/>
      </div>
    )
  }

  componentDidMount() {
    console.log('componentDidMount');
  }
}
// MiniReact.render(<DemoRef title="Hello React!" />, document.querySelector('#root'))


/*----------------------------------------------------------------*/
// Key
class KeyDome extends MiniReact.Component {
  constructor (props) {
    super(props)
    this.state = {
      person: [
        {
          id: 1,
          name: 'Bob',
          age: 18
        },
        {
          id: 2,
          name: 'Joy',
          age: 18
        },
        {
          id: 3,
          name: 'Hey',
          age: 16
        },
        {
          id: 4,
          name: 'Jack',
          age: 18
        },
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state))
    newState.person.push(newState.person.shift())
    this.setState(newState)
  }
  render () {
    return (
      <div>
        <ul>
          {this.state.person.map(person => (
            <li key={person.id}>{person.name} - {person.age}</li>
          ))}
        </ul>
        <button onClick={this.handleClick}>点击</button>
      </div>
    )
  }

  componentDidMount() {
    console.log('componentDidMount');
  }
}
MiniReact.render(<KeyDome title="Hello React!" />, document.querySelector('#root'))

// const $pre = document.createElement('pre');
// $pre.textContent = JSON.stringify(virtualDOM, null, 2)
// document.querySelector('body').append(
//   $pre
// )
// console.log(virtualDOM);