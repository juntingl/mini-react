function render(el, container) {
  const dom = el.type === 'TEXT_NODE'
    ? document.createTextNode("")
    : document.createElement(el.type);

  Object.keys(el.props)
    .forEach((key) => {
      if (key !== 'children') {
        dom[key] = el.props[key];
      }
    })

  el.props.children.forEach((child) => {
    render(child, dom);
  })

  container.append(dom);
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

export default {
  render,
  createElement
}
