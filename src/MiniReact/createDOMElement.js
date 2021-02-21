import createElement from "./createElement";

import mountElement from "./mountElement"

export default function createDOMElement(virtualDOM) {
  let newElement = null
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
  }
  // 递归创建子节点
  virtualDOM.children.forEach(child => {
    // 不确定 child 是 组件还是普通元素
    mountElement(child, newElement)
  })

  return newElement
}