import diff from "./diff";
export default class Component {
  constructor(props) {
    this.props = props
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state);
    // 获取最新的要渲染的 virtual DOM 对象
    let virtualDOM = this.render()
    // 获取旧的 virtual DOM 进行比对
    let oldDOM = this.getDOM()
    // 获取容器
    let container = oldDOM.parentNode
    // 实现对比
    diff(virtualDOM, container, oldDOM)
  }

  // 用于存储 DOM 对象, 使之可以进行新旧 virtual DOM 对比
  setDOM(dom) {
    this._dom = dom
  }

  getDOM() {
    return this._dom
  }

  updateProps(props) {
    this.props = props
  }

  // 生命周期函数
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {}
}