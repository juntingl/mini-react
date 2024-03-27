
let root = null;
let currentRoot = null;
let nextWorkUnit = null;
function fiberLoop(deadline) {
  let shouldYield = false
  while(!shouldYield && nextWorkUnit) {
    nextWorkUnit = preformWorkOfUnit(nextWorkUnit);

    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextWorkUnit && root) {
    commitRoot();
  }

  requestIdleCallback(fiberLoop);
}

requestIdleCallback(fiberLoop);

function update() {
  nextWorkUnit = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot
  };
  root = nextWorkUnit;
}

function commitRoot () {
  commitWork(root.child);
  currentRoot = root;
  root = null; // 只添加一次
}

function commitWork(fiber) {
  if (!fiber) return

  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }

  if (fiber.effectTag === "update"){
    updateProps(fiber.dom, fiber.props, fiber.alternate?.props);
  } else if (fiber.effectTag === 'placement') {
    if (fiber.dom) {
      fiberParent.dom.append(fiber.dom);
    }
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)];
  initChildren(fiber, children);
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDOM(fiber.type));
    updateProps(dom, fiber.props, {});
  }
  const children = fiber.props.children;
  initChildren(fiber, children);
}

function preformWorkOfUnit(fiber) {
  const isFunctionComponent = typeof fiber.type === "function";

  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

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
  nextWorkUnit = {
    dom: container,
    props: {
      children: [el],
    }
  };
  root = nextWorkUnit;
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

function updateProps(dom, nextProps, prevProps) {
  // 1. old 有 new 没有 删除
  Object.keys(prevProps)
    .forEach((key) => {
      if (key !== 'children') {
        if (!(key in nextProps)) {
          dom.removeAttribute(key);
        }
      }
    })
  // 2. old 没有 new 有 新增
  // 3. old 有 new 有 修改
  Object.keys(nextProps)
    .forEach((key) => {
      if (key !== 'children') {
        if (nextProps[key] !== prevProps[key]) {
          if (key.startsWith("on")) {
            const eventType = key.slice(2).toLowerCase();
            dom.removeEventListener(eventType, prevProps[key]);
            dom.addEventListener(eventType, nextProps[key]);
          } else {
            dom[key] = nextProps[key];
          }
        }
      }
    })
}

function initChildren(fiber, children) {
  let oldFiber = fiber.alternate?.child;
  let prevChild = null;
  children.forEach((child, index) => {
    const isSameType = oldFiber && oldFiber.type === child.type;
    let newFiber = null;
    if (isSameType) {
      // update
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: oldFiber.dom,
        effectTag: 'update',
        alternate: oldFiber
      };
    } else {
      // create
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        parent: fiber,
        sibling: null,
        dom: null,
        effectTag: 'placement'
      };
    }
    // 处理剩余兄弟节点
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

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
  createElement,
  update
}
