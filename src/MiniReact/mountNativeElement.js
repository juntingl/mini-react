import createDOMElement from './createDOMElement';

export default function mountNativeElement(virtualDOM, container) {
  let newElement = createDOMElement(virtualDOM)
  // 将转换之后的 DOM 放置在容器里
  container.appendChild(newElement)
}
