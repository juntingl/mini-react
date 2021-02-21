/**
 * Diff 算法
 * @Author: Junting
 * @Date: 2021-02-21 13:01:28
 * @Last Modified by: Junting
 * @Last Modified time: 2021-02-21 18:08:18
 */
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';

// oldDOM = container.firstChild
export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;

  // 判断 oldDOM 是否存在
  if(!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (
    // 类型不一样
    virtualDOM.type !== oldVirtualDOM.type &&
    // 组件需要单独处理
    typeof virtualDOM.type !== 'function'
  ) {
    const newElement = createDOMElement(virtualDOM)
    // 用新创建的 DOM 对象替换旧的 DOM 对象
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 递归对比子元素节点
    virtualDOM.children.forEach((child, index) => {
      diff(child, oldDOM, oldDOM.childNodes[index])
    })

    // 删除节点
    // 获取节点的数量
    let oldChildNodes = oldDOM.childNodes
    // 如果旧节点的数量多于要渲染的新节点的长度
    if (oldChildNodes.length > virtualDOM.children.length) {
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i])
      }
    }
  }
}
