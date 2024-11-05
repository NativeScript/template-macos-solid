import { createRenderer } from "npm:solid-js/universal";

export const {
  render,
  effect,
  memo,
  createComponent,
  createElement,
  createTextNode,
  insertNode,
  insert,
  spread,
  setProp,
  mergeProps,
} = createRenderer({
  createElement(string) {
    return document.createElement(string);
  },
  createTextNode(value) {
    return document.createTextNode(value);
  },
  replaceText(textNode, value) {
    textNode.nodeValue = value;
  },
  setProperty(node, name, value, prev) {
    if (value === prev) return;

    if (name.startsWith("on")) {
      const event = name.slice(2, 3).toLowerCase() + name.slice(3);
      if (prev) node.removeEventListener(event, prev);
      node.addEventListener(event, value);
      return;
    }

    if (name === "ref") return value(node);
    if (name === "style") {
      node.style = value;
    } else {
      node.setAttribute(name, value);
    }
  },
  insertNode(parent, node, anchor) {
    parent.insertBefore(node, anchor);
  },
  isTextNode(node) {
    return node.nodeType === 3;
  },
  removeNode(parent, node) {
    parent.removeChild(node);
  },
  getParentNode(node) {
    return node.parentNode;
  },
  getFirstChild(node) {
    return node.firstChild;
  },
  getNextSibling(node) {
    return node.nextSibling;
  },
});

export function use(fn, args) {
  return fn?.(args);
}

export {
  ErrorBoundary,
  For,
  Index,
  Match,
  Show,
  Suspense,
  SuspenseList,
  Switch,
} from "npm:solid-js";
