---
title: DOM 的属性操作
date: 2016-03-06 22:37:02
categories: DOM
tags: Events
---
## 属性操作

### `Property Accessor`
- 属性访问器提供了两种方式用于访问一个对象的属性，它们分别是点符号和括号

```javascript
object.property
object["property"]
```

**点符号表示法**：

- 属性名必须是一个有效的JavaScript标识符

**括号表示法**：

- 属性名必须是字符串。
- 这意味着非字符串对象不能用来作为一个对象属性的键。
- 任何非字符串对象，包括number，可通过toString方法，类型转换成一个字符串。

<!-- more -->

### `getAttribute()`
- getAttribute() 返回元素上指定属性（attribute）的值。如果指定的属性不存在，则返回  null 或 "" （空字符串）
- 当指定的属性不存在于元素上时，所有浏览器都返回 null，这是当前 DOM 规范草案规定的。
- 然而，旧的DOM 3 Core specification 认为此时正确的返回值应该是一个空字符串，一些 DOM 实现环境实现了该行为（behavior）。在 XUL (Gecko) 中，getAttribute 的实现遵从 DOM 3 Core specification，返回一个空字符串。
- 因此，**如果一个属性可能不存在于指定的元素上，在调用 getAttribute() 之前，你应该使用 element.hasAttribute() 来检测该属性是否存在。**

### `setAttribute()`
- 添加一个新属性（attribute）到元素上，或改变元素上已经存在的属性的值
- `element.setAttribute(name, value);`
- 当在 HTML 文档中的 HTML 元素上调用 setAttribute() 方法时，该方法会将其属性名称（attribute name）参数小写化。
- 如果指定的属性已经存在，则其值变为传递的值。如果不存在，则创建指定的属性。
- 对于不存在的属性，getAttribute() 返回 null，还是应该使用 removeAttribute() 代替 elt.setAttribute(attr, null) 来删除属性。

### `dataset`
- HTMLElement.dataset 属性允许我们访问所有在元素上自定义的data属性 (这种属性一般以data-开头）
- 它的结构是一个DOMString映射表，对每一个自定义的数据属性都有一个实体与之对应

**自定义的data 属性名称转化成 DOMStringMap 的键值时会遵循下面的规则：**

- 前缀  data- 被去除(包括减号)；
- 对于每个在小写字母 a到 z前面的减号，减号会被去除，并且字母会转变成对应的大写字母
- 其他字符（包含其他减号）都不发生变化
- `IE10`以上支持
 
 
