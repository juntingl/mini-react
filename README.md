# Mini React

React implementation principle, a basic version.

## The first day

1. 浏览器呈现 “APP”
2. 原生 JS 方式实现
3. 将页面元素转换成对象数据结构的方式去表达页面DOM元素的关系
4. 将定义呈现的页面数据结构通过 render 函数转换成真实 DOM 元素呈现到 web 浏览器上。

## The second day

### What

当渲染层级很深和很多节点时，VDOM 转换 真实 DOM，就会造成长时间卡顿，出现浏览器崩溃的情况。

### How

将大量的任务，拆分成多个小块，每次只执行一个小块，依次去执行。

* 一个任务执行调度器，用来控制当前执行任务 => Fiber
* 使用浏览器提供的 API： requestIdleCallback 来控制任务执行
