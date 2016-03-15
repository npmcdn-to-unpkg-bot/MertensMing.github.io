---
title: DOM 的节点操作
date: 2016-03-06 22:31:18
categories: DOM
tags: Events
---
## 节点操作

### 1.1 获取节点

#### 1.1.1 父子关系

##### `parentNode`

- parentNode 属性以 Node 对象的形式返回指定节点的父节点。 
- 如果指定节点没有父节点，则返回 null。

##### `firstChild`
- 返回当前节点在DOM树中的第一个子节点, 如果没有子节点,则返回 null.
- `IE9` 及以上可以识别文本节点

<!--more-->

##### `lastChild`
- lastChild 属性返回指定节点的最后一个子节点，以 Node 对象

##### `childNodes`
- Node.childNodes 返回包含指定节点的子节点的集合，该集合为**即时更新**的集合 （live collection）

##### `children`
- `ParentNode.children`  是一个只读属性，返回一个包含当前元素的子元素的集合，该集合为一个**即时更新**的（live）HTMLCollection。
- `IE9`以上支持

<!--more-->

#### 1.1.2 兄弟关系
----------
##### `Node.previousSibling`
- 返回当前节点在其父节点的 childNodes 列表中的前一个节点,**如果当前节点就是其父节点的第一个子节点 , 则返回 null**.

##### `Node.nextSibling`
- Node.nextSibling 是一个只读属性，返回其父节点的 childNodes 列表中紧跟在其后面的节点，**如果指定的节点为最后一个节点，则返回 null**

##### `previousElementSibling` / `nextElementSibling`
- `IE9` 以上支持


----------


#### 1.1.3 接口获取元素节点


----------


##### `document.getElementById('id')`
- element是一个 Element 对象。
- 如果当前文档中拥有特定ID的元素不存在则返回null.
id是大小写敏感的字符串，代表了所要查找的元素的唯一ID.

##### `element.getElementsByTagName('TagName')`
- 返回一个实时的包含具有给出标签名的元素们的HTMLCollection
- 返回的 list 是实时的，意味着它会随着DOM树的变化自动更新

##### `element.getElementsByClassName()`
- 返回一个类似数组的对象，包含了所有指定 class 名称的子元素
- `IE9` 以上支持

##### `element.querySelector()`
- 返回该元素后代元素中，第一个匹配选择器参数的后代元素
- `IE8` 以上支持

##### `element.querySelectorAll()`
- 返回一个**non-live**的NodeList对象,这个对象将会包含调用querySelectorAll()方法的那个DOM对象的所有后代元素中匹配指定css选择器的元素们.


----------
### 1.2 创建节点


----------
#### `document.createElement()`
- 在一个HTML文档中, document.createElement()方法用于创建指定的HTML元素，或者， 当指定未定义的元素时， 创建一个HTMLUnknownElement。

#### `document.createTextNode()`
- 创建一个新的文本节点
- `var text = document.createTextNode(data);`
- text 是一个文本节点
- data 是一个字符串,包含了放在文本节点中的内容


----------
### 1.3 修改节点


----------
#### `Node.textContent`
- Node.textContent 属性可以表示一个节点及其后代节点的文本内容
- 对于其他节点类型，textContent 将所有子节点的 textContent 合并后返回，除了注释、ProcessingInstruction节点。如果该节点没有子节点的话，返回一个空字符串
- 在节点上设置 textContent 属性的话，会删除它的所有子节点，并替换为一个具有给定值的文本节点
- `IE9` 以上支持

#### `Node.innerText`
- 行为跟 textContent 类似
- 有以下不同
- textContent 会获取所有元素的内容，包括<script> 和 <style> 元素，然而 IE 专有属性 innerText 不会。
- innerText 会受样式的影响，它不返回隐藏元素的文本，但 textContent 返回。
- 由于 innerText 受 CSS 样式的影响，它会触发重排（reflow），但textContent 不会。

### 1.4 插入节点
#### `Node.appendChild`
- 将一个节点插入到指定的父节点的最末尾处(也就是成为了这个父节点的最后一个子节点)
- 如果**被插入的节点已经存在于当前文档的文档树中**,则那个节点会首先**从原先的位置移除**,然后再插入到新的位置.
- 如果你需要保留这个子节点在原先位置的显示,则你需要先用Node.cloneNode方法复制出一个节点的副本,然后在插入到新位置.
- 这个方法只能将某个子节点插入到同一个文档的其他位置,如果你想跨文档插入,你需要先调用document.importNode方法.

#### `Node.insertBefore`
- 在当前节点的某个子节点之前再插入一个子节点
- `var insertedElement = parentElement.insertBefore(newElement, referenceElement);`
- 没有 insertAfter 方法，可以使用 insertBefore 方法和 nextSibling 来模拟它
- `parentDiv.insertBefore(sp1, sp2.nextSibling);`

### 1.5 替换节点
#### `Node.replaceChild`
- 用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点

### 1.6 删除节点
#### `Node.removeChild`
- 从某个父节点中移除指定的子节点,并返回那个子节点.

```javascript
if (node.parentNode) {
  // 从DOM树中删除node节点,除非它已经被删除了.
  node.parentNode.removeChild(node);
}
```

### 1.7 innerHTML
- 获取或设置指定节点之中所有的 HTML 内容。
- 替换之前内部所有的内容并创建全新的一批节点（去除之前添加的事件和样式）。
- innerHTML 不检查内容，直接运行并替换原先的内容。

**NOTE**：只建议在创建全新的节点时使用。不可在用户可控的情况下使用。