import { FileFieldsFragment } from "../../../generated/graphql";
import { faker } from "@faker-js/faker";

const genericBlob: FileFieldsFragment = {
  __typename: "Blob",
  byteSize: faker.datatype.number(),
  oid: faker.datatype.uuid(),
  // @ts-ignore
  // @eslint-disable-next-line
  // noinspection
  text: "import config from '../config'\nimport VNode, { createEmptyVNode } from './vnode'\nimport { createComponent } from './create-component'\nimport { traverse } from '../observer/traverse'\n\nimport {\n  warn,\n  isDef,\n  isUndef,\n  isArray,\n  isTrue,\n  isObject,\n  isPrimitive,\n  resolveAsset,\n  isFunction\n} from '../util/index'\n\nimport { normalizeChildren, simpleNormalizeChildren } from './helpers/index'\nimport type { Component } from 'types/component'\nimport type { VNodeData } from 'types/vnode'\n\nconst SIMPLE_NORMALIZE = 1\nconst ALWAYS_NORMALIZE = 2\n\n// wrapper function for providing a more flexible interface\n// without getting yelled at by flow\nexport function createElement(\n  context: Component,\n  tag: any,\n  data: any,\n  children: any,\n  normalizationType: any,\n  alwaysNormalize: boolean\n): VNode | Array<VNode> {\n  if (isArray(data) || isPrimitive(data)) {\n    normalizationType = children\n    children = data\n    data = undefined\n  }\n  if (isTrue(alwaysNormalize)) {\n    normalizationType = ALWAYS_NORMALIZE\n  }\n  return _createElement(context, tag, data, children, normalizationType)\n}\n\nexport function _createElement(\n  context: Component,\n  tag?: string | Component | Function | Object,\n  data?: VNodeData,\n  children?: any,\n  normalizationType?: number\n): VNode | Array<VNode> {\n  if (isDef(data) && isDef((data as any).__ob__)) {\n    __DEV__ &&\n      warn(\n        `Avoid using observed data object as vnode data: ${JSON.stringify(\n          data\n        )}\\n` + 'Always create fresh vnode data objects in each render!',\n        context\n      )\n    return createEmptyVNode()\n  }\n  // object syntax in v-bind\n  if (isDef(data) && isDef(data.is)) {\n    tag = data.is\n  }\n  if (!tag) {\n    // in case of component :is set to falsy value\n    return createEmptyVNode()\n  }\n  // warn against non-primitive key\n  if (__DEV__ && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {\n    warn(\n      'Avoid using non-primitive value as key, ' +\n        'use string/number value instead.',\n      context\n    )\n  }\n  // support single function children as default scoped slot\n  if (isArray(children) && isFunction(children[0])) {\n    data = data || {}\n    data.scopedSlots = { default: children[0] }\n    children.length = 0\n  }\n  if (normalizationType === ALWAYS_NORMALIZE) {\n    children = normalizeChildren(children)\n  } else if (normalizationType === SIMPLE_NORMALIZE) {\n    children = simpleNormalizeChildren(children)\n  }\n  let vnode, ns\n  if (typeof tag === 'string') {\n    let Ctor\n    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)\n    if (config.isReservedTag(tag)) {\n      // platform built-in elements\n      if (\n        __DEV__ &&\n        isDef(data) &&\n        isDef(data.nativeOn) &&\n        data.tag !== 'component'\n      ) {\n        warn(\n          `The .native modifier for v-on is only valid on components but it was used on <${tag}>.`,\n          context\n        )\n      }\n      vnode = new VNode(\n        config.parsePlatformTagName(tag),\n        data,\n        children,\n        undefined,\n        undefined,\n        context\n      )\n    } else if (\n      (!data || !data.pre) &&\n      isDef((Ctor = resolveAsset(context.$options, 'components', tag)))\n    ) {\n      // component\n      vnode = createComponent(Ctor, data, context, children, tag)\n    } else {\n      // unknown or unlisted namespaced elements\n      // check at runtime because it may get assigned a namespace when its\n      // parent normalizes children\n      vnode = new VNode(tag, data, children, undefined, undefined, context)\n    }\n  } else {\n    // direct component options / constructor\n    vnode = createComponent(tag as any, data, context, children)\n  }\n  if (isArray(vnode)) {\n    return vnode\n  } else if (isDef(vnode)) {\n    if (isDef(ns)) applyNS(vnode, ns)\n    if (isDef(data)) registerDeepBindings(data)\n    return vnode\n  } else {\n    return createEmptyVNode()\n  }\n}\n\nfunction applyNS(vnode, ns, force?: boolean) {\n  vnode.ns = ns\n  if (vnode.tag === 'foreignObject') {\n    // use default namespace inside foreignObject\n    ns = undefined\n    force = true\n  }\n  if (isDef(vnode.children)) {\n    for (let i = 0, l = vnode.children.length; i < l; i++) {\n      const child = vnode.children[i]\n      if (\n        isDef(child.tag) &&\n        (isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))\n      ) {\n        applyNS(child, ns, force)\n      }\n    }\n  }\n}\n\n// ref #5318\n// necessary to ensure parent re-render when deep bindings like :style and\n// :class are used on slot nodes\nfunction registerDeepBindings(data) {\n  if (isObject(data.style)) {\n    traverse(data.style)\n  }\n  if (isObject(data.class)) {\n    traverse(data.class)\n  }\n}\n",
};

export default genericBlob;
