---
title: React 入门 —— 属性和状态
date: 2016-05-16 21:54:24
categories: JavaScript
tags: React
---

## 属性的含义和用法

### 含义

props = properties

在 React 中，可以理解为，属性是不可以由组件自己修改的。

### 用法

#### 第一种用法

```js
<HelloWorld name={[1, 2, 3]}/>
```

组件可以根据传入的属性来构建不同的子组件。

#### 第二种用法

```html
var props = {
    one: '123',
    two: 321
}
// 需要加三个点号
<HelloWorld {...props}/>
```

<!-- more -->

#### 第三种用法（几乎不会使用）

```js
var instance = React.rander(<HelloWorld></HelloWorld>, document.body);
instance.setProps({
    name: 'Tim'
});
```

## 状态

### 定义

state

状态：事物所处的状况

状态是由事物自行处理、不断变化的

### 用法

`getInitialState`：初始化每个实例特有的状态
`setState`：更新组件的状态

<img src="1.jpg" title="更新 state 后">