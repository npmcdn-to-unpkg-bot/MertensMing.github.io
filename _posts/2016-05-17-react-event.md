---
title: React 入门 —— React 中的事件
date: 2016-05-17 09:28:53
categories: JavaScript
tags: React
---

## 事件处理

### “合成事件”和“原生事件”

React 实现了一个`“合成事件”层`（`synthetic event system`），这个事件模型保证了和 W3C 标准保持一致，所以不用担心有什么诡异的用法，并且这个事件层`消除了 IE 与 W3C 标准实现之间的兼容问题`。

“合成事件”额外提供了两个好处：

#### 自动绑定上下文和事件委托

“合成事件”自动`将事件处理方法的上下文绑到当前组件`，所以 `handleClick` 方法里面可以直接使用 `this.setState`。

“合成事件”会以`事件委托`（event delegation）的方式`绑定到组件最上层`，并且在`组件卸载（unmount）的时候自动销毁绑定的事件`。

<!-- more -->

#### 什么是“原生事件”？

比如你在 `componentDidMount` 方法里面通过 `addEventListener` 绑定的事件就是浏览器原生事件。

使用原生事件的时候注意在 `componentWillUnmount` `解除绑定` `removeEventListener`。

所有通过 JSX 这种方式绑定的事件都是绑定到“合成事件”，除非你有特别的理由，`建议总是用 React 的方式处理事件`。

### 绑定事件处理函数

React 里面绑定事件的方式和在 HTML 中绑定事件类似，使用`驼峰式命名`指定要绑定的 `onClick` 属性为组件定义的一个方法 `{this.handleClick}`。

#### 参数传递

给事件处理函数传递额外参数的方式：`bind(this, arg1, arg2, ...)`

```js
render: function() {
    return <p onClick={this.handleClick.bind(this, 'extra param')}>;
},
handleClick: function(param, event) {
    // handle click
}
```

### 实例演示

```js
var HelloWorld = React.createClass({
    handleChange: function (event) {
        console.log(event.target.value);
    },
    render: function () {
        return <div>
                    <input onChange={this.handleChange}></input>
                </div>
    }
});
```

## 事件类型

React 将事件统一化，使事件在不同浏览器上有一致的属性。

下面的事件处理程序在事件冒泡阶段被触发。

如果要注册事件捕获处理程序，应该使用 Capture 事件

例如使用 `onClickCapture` 处理点击事件的`捕获阶段`，而不是 `onClick`。

```html
// 触摸事件
onTouchCancel
onTouchEnd
onTouchMove
onTouchStart

// 键盘事件
onKeyDown
onKeyPress
onKeyUp

// 剪切
onCopy
onCut
onPaste

// 表单
onChange
onInput
onSubmit

// 焦点
onFocus
onBlur

// UI
onScroll

// 滚轮
onWheel

// 鼠标
onClick
onContentMenu （右键）
onDoubleClick
onMouseDown
onMouseEnter
onMouseLeave
onMouseMove
onMouseOut
onMouseOver
onMouseUp

// 拖拽事件
onDrop
onDrag
onDragEnd
onDragEnter
onDragExit
onDragLeave
onDragOver
onDragStart
```

## 事件对象

事件处理程序通过 合成事件（`SyntheticEvent`）的实例传递，`SyntheticEvent` 是浏览器原生事件跨浏览器的封装。`SyntheticEvent` 和浏览器原生事件一样有 `stopPropagation()`、`preventDefault()` 接口，而且这些接口夸浏览器兼容。

### 通用属性

每个合成事件（SyntheticEvent）对象都有以下属性：

```js
bubbles // boolean 
cancelable // boolean 
currentTarget // DOMEventTarget 
defaultPrevented // boolean 
eventPhase // Number 
isTrusted // boolean 用户输入还是脚本输入
nativeEvent // DOMEvent 
preventDefault() // void 
stopPropagation() // void 
target // DOMEventTarget 
timeStamp // Date 事件触发的时间
type // String      
```

### 剪切事件属性

```js
clipboardData // DOMDataTransfer 剪切的值、复制的值
```

### 键盘事件的属性

```js
altKey // boolean 是否按下
charCode // Number 字符编码
ctrlKey // boolean 
key // String 
keyCode // Number 按键编码
locale // String 
location // Number 位置
metaKey // boolean 
repeat // boolean 
shiftKey // boolean 
which // Number 通用化的 charCode 和 keyCode

/**
是否按下传入的按键
function getModifierState(key)
*/
```

### 焦点事件的属性

```js
relatedTarget // DOMEventTarget 相关对象
```

### 鼠标事件的属性

```js
altKey // boolean 
button // Number 
buttons // Number 
clientX // Number 浏览器窗口
clientY // Number 
ctrlKey // boolean 
/*
function getModifierState(key)
*/
boolean metaKey
pageX // Number html 页面
pageY // Number 
relatedTarget // DOMEventTarget 
screenX // Number 显示屏
screenY // Number 
shiftKey // boolean 
```

### 触摸事件的属性

```js
altKey // boolean 
changedTouches // DOMTouchList 
ctrlKey // boolean 
/*
function getModifierState(key)
*/
metaKey // boolean 
shiftKey // boolean 
targetTouches // DOMTouchList 
touches // DOMTouchList 
```

### UI 事件的属性

```js
detail // Number 滚动的距离
view // DOMAbstractView 
```

### 鼠标滚轮事件的属性

```js
deltaMode // Number 一种单位
deltaX // Number 移动的数值 数值结合单位就可以知道移动了多远
deltaY // Number 
deltaZ // Number 
```
