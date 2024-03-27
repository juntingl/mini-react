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

## The third day

使用 requestIdleCallback API 是利用浏览器空闲时期才会调用传递的函数，之前代码实现是边转换成链表就边开始添加 DOM 去渲染，在大量任务处理的情况下，就会发生浏览器不空闲，暂定当前回调任务，这时页面可能才渲染一半，等浏览器空闲了，页面才渲染完成的情况看。

这种情况怎么处理？

将渲染的工作统一移到最后去完成，当前空闲时还存在转换任务时，不进行最后的渲染工作，这样也能不占用当前浏览器的渲染进程和降低页面重绘。

## The fourth day

添加绑定事件，规则：“on + 事件方式（click）”, props 中将其捞出来，绑定到真实 DOM 上。
