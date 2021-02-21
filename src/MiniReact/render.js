/**
 * 转换 Virtual DOM 为 Real DOM
 * @Author: Junting
 * @Date: 2021-02-21 12:56:06
 * @Last Modified by: Junting
 * @Last Modified time: 2021-02-21 13:08:37
 */
import diff from './diff';

export default function render (virtualDOM, container, oldDOM) {
  // 比对
  diff(virtualDOM, container, oldDOM)

}
