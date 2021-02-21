/**
 * 转换 Virtual DOM 为 Real DOM
 * @Author: Junting
 * @Date: 2021-02-21 12:56:06
 * @Last Modified by: Junting
 * @Last Modified time: 2021-02-21 16:09:56
 */
import diff from './diff';


/**
 * render 渲染函数
 * @param {Object} virtualDOM
 * @param {DOM} container 元素节点
 * @param {DOM} oldDOM 更新前的旧 DOM
 */
export default function render (virtualDOM, container, oldDOM = container.firstChild) {
  // 比对
  diff(virtualDOM, container, oldDOM)

}
