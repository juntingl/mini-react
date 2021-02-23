/**
 * Diff 算法
 * @Author: Junting
 * @Date: 2021-02-21 13:01:28
 * @Last Modified by: Junting
 * @Last Modified time: 2021-02-23 21:49:11
 */
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';
import diffComponent from './diffComponent'

// oldDOM = container.firstChild
export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  // 如果是类组件，类组件就挂载了 component 属性
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
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
  } else if (typeof virtualDOM.type === 'function') {
    // 组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 类型相同
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 1. 将拥有 key 属性的子元素存储到一个对象中
    let keyedElements = {}
    for (let i = 0; i < oldDOM.childNodes.length; i++) {
      let domElement = oldDOM.childNodes[i]

      // 判断是否是元素节点
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute('key')
        if(key) {
          keyedElements[key] = domElement
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0

    // 对比子节点
    // 区分带 key 和 不带 key
    if (hasNoKey) {
      // 递归对比子元素节点
      virtualDOM.children.forEach((child, index) => {
        diff(child, oldDOM, oldDOM.childNodes[index])
      })
    } else {
      // 2. 循环 virtual DOM 的子元素，获取子元素的 key 属性
      virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        if (key) {
          let domElement = keyedElements[key]
          if (domElement) {
            // 3. 看看当前位置的元素是不是我们期望的元素
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }

    // 删除节点
    // 获取节点的数量
    let oldChildNodes = oldDOM.childNodes
    // 如果旧节点的数量多于要渲染的新节点的长度
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 区分是否携带 key 属性，调用不同处理逻辑
      if (hasNoKey) {
        // 删除节点
        for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          unmountNode(oldChildNodes[i])
        }
      } else {
        // 通过 key 属性删除节点
        for(let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i]
          let oldChildKey = oldChild._virtualDOM.props.key
          let found = false

          for (let n = 0; n < virtualDOM.children.length; n++) {
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true
              break
            }
          }

          if (!found) {
            unmountNode(oldChild)
          }
        }
      }
    }
  }
}
