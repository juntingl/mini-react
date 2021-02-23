export default function unmountNode(node) {
  const virtualDOM = node._virtualDOM
  // 1. 文本节点可以直接删除
  if (virtualDOM.type === 'text') {
    node.remove()
    return
  }
  // 2. 是否由组件生成的
  let component = virtualDOM.component
  // 存在，节点由组件生成
  if (component) {
    component.componentWillUnmount()
  }
  // 3. 节点身上是否有 ref 属性
  if(virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }
  // 4. 节点属性中是否有事件属性
  Object.keys(virtualDOM.props).forEach(propName => {
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLowerCase().slice(2)
      const eventHandler = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandler)
    }
  })
  // 5. 递归删除子节点
  if (node.childNodes.length > 0) {
    for(let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i-- // 节点已经删除，元素不存在，所以 i 要回归一位
    }
  }
  // 删除节点
  node.remove()
}
