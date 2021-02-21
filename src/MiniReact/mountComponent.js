import isFunctionComponent from './isFunctionComponent';
/**
 * 组件渲染方式
 * @param {*} virtualDOM
 * @param {*} container
 */
export default function mountComponent(virtualDOM, container) {
  // 判断组件是类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    console.log('函数组件');
  }
}