import isFunction from "./isFunction"

export default function isFunctionComponent (virtualDOM) {
  const type = virtualDOM.type
  // 只需要判断原型上是否有 render 方法
  return type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render)
}
