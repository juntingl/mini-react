/**
 * Diff 算法
 * @Author: Junting
 * @Date: 2021-02-21 13:01:28
 * @Last Modified by: Junting
 * @Last Modified time: 2021-02-21 14:17:12
 */
import mountElement from './mountElement';

export default function diff(virtualDOM, container, oldDOM) {
  // 判断 oldDOM 是否存在
  if(!oldDOM) {
    mountElement(virtualDOM, container)
  }
}