import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';

export default function mountNativeElement(virtualDOM, container, oldDOM) {
  let newElement = createDOMElement(virtualDOM)
  // 判断旧的 DOM 是否存在，存在就删除
  if (oldDOM) {
    unmountNode(oldDOM)
  }
  // 将转换之后的 DOM 放置在容器里
  container.appendChild(newElement)

  // 类组件 -> 将 DOM 对象保存起来，方便下次获取使用
  let component = virtualDOM.component
  if (component) {
    component.setDOM(newElement)
  }
}
