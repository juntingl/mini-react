/**
 * Diff 算法
 * @Author: Junting
 * @Date: 2021-02-21 13:01:28
 * @Last Modified by: Junting
 * @Last Modified time: 2021-02-21 16:10:17
 */
import mountElement from './mountElement';
import updateTextNode from './updateTextNode';

// oldDOM = container.firstChild
export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;

  // 判断 oldDOM 是否存在
  if(!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
    }

    // 递归对比子元素节点
    virtualDOM.children.forEach((child, index) => {
      diff(child, oldDOM, oldDOM.childNodes[index])
    })
  }
}