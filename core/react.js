function render(el, container) {
  nextWorkUnit = {
    dom: container,
    props: {
      children: [el],
    }
  };

  // const dom = el.type === 'TEXT_NODE'
  //   ? document.createTextNode("")
  //   : document.createElement(el.type);

  // Object.keys(el.props)
  //   .forEach((key) => {
  //     if (key !== 'children') {
  //       dom[key] = el.props[key];
  //     }
  //   })

  // el.props.children.forEach((child) => {
  //   render(child, dom);
  // })

  // container.append(dom);
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "string" ? createTextNode(child) : child;
      })
    }
  }
}
function createTextNode(text) {
  return {
    type: "TEXT_NODE",
    props: {
      nodeValue: text,
      children: []
    },
  }
}

let nextWorkUnit = null;
function workLoop(deadline) {
  let shouldYield = false
  while(!shouldYield && nextWorkUnit) {
    nextWorkUnit = preformWorkOfUnit(nextWorkUnit);

    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function preformWorkOfUnit(work) {
  if (!work.dom) {
    // 1. 创建 DOM
    const dom = (work.dom =
      work.type === 'TEXT_NODE'
        ? document.createTextNode("")
        : document.createElement(work.type));

    work.parent.dom.append(dom);

    // 2. 处理 props
    Object.keys(work.props)
    .forEach((key) => {
      if (key !== 'children') {
        dom[key] = work.props[key];
      }
    });
  }

  // 3. 转换链表
  let prevChild = null;
  work.props.children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      child: null,
      parent: work,
      sibling: null,
      dom: null
    };

    if (index === 0) {
      work.child = newWork;
    } else {
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  })
  // 4. 返回下一个执行任务
  if (work.child) {
    return work.child;
  }

  if (work.sibling) {
    return work.sibling;
  }

  return work.parent?.sibling;
}


export default {
  render,
  createElement
}
