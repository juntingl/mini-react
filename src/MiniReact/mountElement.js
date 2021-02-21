import mountNativeElement from './mountNativeElement';

export default function mountElement(virtualDOM, container) {
  // Component vs NativeElement (组件还是普通元素)
  mountNativeElement(virtualDOM, container)
}