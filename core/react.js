function render(el, container) {
  nextFiberUnit = {
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

function createDOM(type) {
  return type === 'TEXT_NODE'
    ? document.createTextNode("")
    : document.createElement(type);
}

function updateProps(dom, props) {
  Object.keys(props)
    .forEach((key) => {
      if (key !== 'children') {
        dom[key] = props[key];
      }
    });
}

function initChildren(fiber) {
  let prevChild = null;
  fiber.props.children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
  });
}

let nextFiberUnit = null;
function fiberLoop(deadline) {
  let shouldYield = false
  while(!shouldYield && nextFiberUnit) {
    nextFiberUnit = preformFiberOfUnit(nextFiberUnit);

    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(fiberLoop);
}

requestIdleCallback(fiberLoop);

function preformFiberOfUnit(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDOM(fiber.type));
    fiber.parent.dom.append(dom);
    updateProps(dom, fiber.props);
  }

  // 3. 转换链表
  initChildren(fiber);
  // 4. 返回下一个执行任务
  if (fiber.child) {
    return fiber.child;
  }

  if (fiber.sibling) {
    return fiber.sibling;
  }

  return fiber.parent?.sibling;
}

export default {
  render,
  createElement
}
