
let root = null;
let nextFiberUnit = null;
function fiberLoop(deadline) {
  let shouldYield = false
  while(!shouldYield && nextFiberUnit) {
    nextFiberUnit = preformFiberOfUnit(nextFiberUnit);

    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextFiberUnit && root) {
    commitRoot();
  }

  requestIdleCallback(fiberLoop);
}

requestIdleCallback(fiberLoop);

function commitRoot () {
  commitWork(root.child);
  root = null; // 只添加一次
}

function commitWork(fiber) {
  if (!fiber) return

  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }

  if (fiber.dom) {
    fiberParent.dom.append(fiber.dom);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function preformFiberOfUnit(fiber) {
  const isFunctionComponent = typeof fiber.type === "function";

  if (!isFunctionComponent) {
    if (!fiber.dom) {
      const dom = (fiber.dom = createDOM(fiber.type));
      updateProps(dom, fiber.props);
    }
  }
  // 3. 转换链表
  const children = isFunctionComponent ? [fiber.type(fiber.props)] : fiber.props.children;
  initChildren(fiber, children);
  // 4. 返回下一个执行任务
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while(nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

function render(el, container) {
  nextFiberUnit = {
    dom: container,
    props: {
      children: [el],
    }
  };
  root = nextFiberUnit;
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        const isTextNode = typeof child === 'string' || typeof child === 'number';
        return isTextNode ? createTextNode(child) : child;
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

function initChildren(fiber, children) {
  let prevChild = null;
  children.forEach((child, index) => {
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

export default {
  render,
  createElement
}
