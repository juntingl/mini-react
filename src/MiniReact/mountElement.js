import isFunction from './isFunction';
import mountNativeElement from './mountNativeElement';
import mountComponent from './mountComponent';

export default function mountElement(virtualDOM, container) {
  // Component vs NativeElement (组件还是普通元素)
  if (isFunction(virtualDOM)) {
    // Component => 无论是函数组件还是类组件，本质都是函数
    mountComponent(virtualDOM, container)
  } else {
    // Native Element
    mountNativeElement(virtualDOM, container)
  }
}