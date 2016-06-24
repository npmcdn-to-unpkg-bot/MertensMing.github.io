---
title: React 入门 —— 组件的生命周期
date: 2016-05-16 19:32:33
categories: JavaScript
tags: React
---

> **参考资料**
> [组件的详细说明和生命周期](http://reactjs.cn/react/docs/component-specs.html)
> [React 组件生命周期和方法](https://segmentfault.com/a/1190000005161417#articleHeader5)

## 什么是生命周期？

### 组件的声明周期

`-` 组件本质上是状态机，输入确定，输出一定确定。
`-` `状态发生转换`时，会触发不同的钩子函数，从而让开发者有机会做出响应。

初始化阶段 `——>` 运行中阶段 `——>` 销毁阶段

## 组件的详细说明

当通过调用 `React.createClass()` 来创建组件的时候，你应该`提供一个包含 render 方法的对象`，这个对象里也可以包含其他的生命周期方法。

```html
var HelloWorld = React.createClass({
    redner: ...,
    // 还可以有其他的生命周期方法
});
```

<!-- more -->

<img src="1.jpg">

### render

`-` `redner()` 方法是`必须的`
`-` 当调用的时候，会检测 `this.props` 和 `this.state`，`返回一个单子级组件`。

`-` 该子级组件可以是`虚拟的本地 DOM 组件`（比如 `<div />` 或者 `React.DOM.div()`）
`-` 也可以是`自定义的复合组件`。

`-` 你也可以`返回 null 或者 false` 来表明`不需要渲染任何东西`。
`-` 实际上，React 渲染一个 `<noscript>` 标签来处理当前的差异检查逻辑。
`-` 当返回 null 或者 false 的时候，`this.getDOMNode() 将返回 null`。

#### 纯粹的 render

> render() 函数应该是纯粹的 
> `-` 也就是说该函数`不修改组件 state`，每次调用都返回相同的结果
> `-` `不读写 DOM 信息`，也`不和浏览器交互`（例如`通过使用 setTimeout`）
> `-` 如果需要和`浏览器交互`，在 `componentDidMount()` 中或者`其它生命周期方法中`做这件事。
> `-` 保持 `render()` 纯粹，可以使服务器端渲染更加切实可行，也使组件更容易被理解。

<!-- more -->

### getInitialState

```html
object getInitialState()
```

**`调用时刻：`** 在组件挂载之前调用一次。

> 返回值将会作为 `this.state` 的`初始值`。

### getDefaultProps

```html
object getDefaultProps()
```

**`调用时刻：`** 在组件类创建的时候（之前）调用一次

> 返回值被缓存下来。
> `-` 如果`父组件没有指定 props 中的某个键`，则此处返回的对象中的`相应属性将会合并到 this.props` （`使用 in 检测属性`）。
> `-` 该方法在任何实例创建之前调用，因此`不能依赖于 this.props`。
> `-` 另外，`getDefaultProps()` 返回的`任何复杂对象将会在实例间共享`，而不是每个实例拥有一份拷贝。

### propTypes

```html
object propTypes
```

`propTypes` 对象允许验证传入到组件的 `props`。

> `React.PropTypes` 提供很多验证器 (`validator`) 来验证传入数据的有效性。
> 当向 `props` 传入无效数据时，`JavaScript` 控制台会抛出警告。
> 为了性能考虑，只在开发环境验证 `propTypes`。

下面用例子来说明不同验证器的区别：

```html
React.createClass({
  propTypes: {
    // 可以声明 prop 为指定的 JS 基本类型。默认
    // 情况下，这些 prop 都是可传可不传的。
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,

    // 所有可以被渲染的对象：数字，
    // 字符串，DOM 元素或包含这些类型的数组。
    optionalNode: React.PropTypes.node,

    // React 元素
    optionalElement: React.PropTypes.element,

    // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
    optionalMessage: React.PropTypes.instanceOf(Message),

    // 用 enum 来限制 prop 只接受指定的值。
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // 指定的多个对象类型中的一个
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // 指定类型组成的数组
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // 指定类型的属性构成的对象
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // 特定形状参数的对象
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // 以后任意类型加上 `isRequired` 来使 prop 不可空。
    requiredFunc: React.PropTypes.func.isRequired,

    // 不可空的任意类型
    requiredAny: React.PropTypes.any.isRequired,

    // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接
    // 使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  /* ... */
});
```

### mixins

```html
array mixins
```

`-` mixins 可以理解为 `React 的插件列表`
`-` 通过这种模式在`不同组件之间共享方法数据或者行为`只需共享 mixin 就行
`-` `mixins 内定义的生命周期方法在组件的生命周期内都会被调用`。

#### 可能的一些疑问

>**Q1. 如果组件已经定义了某`个生命周期方法，` mixin 内也定义了该方法，那么  mixin 内会被调用还是组件的会被调用？**
A1: 都会被调用

>**Q2. 多个 mixin 都定义了相同生命周期的方法呢？**
A2: 都会被调用

>**Q3. 那如果多个插件定义了  getInitialState 这种配置方法呢，有何影响？**
A3: React 会对返回结果做智能的合并，所有插件的 `getInitialState` 都会生效
前提条件是它们`返回的字段不冲突`，如果发生`字段冲突，React 会提示报错`。 
同理如果是非组件的规格方法，出于共享目的的一些方法在多个 mixin 中也不能冲突。

插件模式并非继承的模式，对于问题 1、2 的答案是一样的，都会被调用，`调用顺序为 mixins 数组中的顺序`。

```js
var MyMixin1 = {
    componentDidMount: function() {
        console.log('auto do something when component did mount');
    }
};

var MyMixin2 = {
    someMethod: function() {
        console.log('doSomething');
    }
};

var MyComponnet = React.createClass({
    mixins: [MyMixin1, MyMixin2],
    componentDidMount: function() {
        // 调用 mixin1 共享的方法
        this.someMethod();
    }
});
```

### statics

```html
object statics
```

statics 对象允许你定义静态的方法，这些静态的方法可以在组件类上调用。

```js
var MyComponent = React.createClass({
  statics: {
    customMethod: function(foo) {
      return foo === 'bar';
    }
  },
  render: function() {
  }
});
MyComponent.customMethod('bar');  // true
```

> 在这个块儿里面定义的方法都是静态的
> 意味着你可以在任何组件实例创建之前调用它们，这些方法不能获取组件的 props 和 state。
> 如果你想在静态方法中检查 props 的值，在调用处把 props 作为参数传入到静态方法。

### displayName

```html
string displayName
```

displayName 字符串用于输出调试信息。JSX 自动设置该值。


## 生命周期方法

### 挂载： componentWillMount

```html
componentWillMount()
```

**`调用时刻：`** 服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。

如果在这个方法内调用 `setState`，`render()` 将会感知到更新后的 `state`，将会执行仅一次，尽管 `state` 改变了。

### 挂载： componentDidMount

```html
componentDidMount()
```

**`调用时刻：`** 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。

在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 `this.getDOMNode()` 来获取相应 DOM 节点。

如果想`和其它 JavaScript 框架集成`，使用 `setTimeout 或者 setInterval 来设置定时器`，或者发送 AJAX 请求，可以在该方法中执行这些操作。

> 注意：
> 为了兼容 v0.9，DOM 节点作为最后一个参数传入。
> 你依然可以通过 this.getDOMNode() 获取 DOM 节点。

### 更新： componentWillReceiveProps

```html
componentWillReceiveProps(object nextProps)
```

**`调用时刻：`** 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。

用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。
老的 props 可以通过 this.props 获取到。
在该函数中调用 this.setState() 将不会引起第二次渲染。

```js
componentWillReceiveProps: function(nextProps) {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
}
```

> 注意：
> 对于 `state`，没有相似的方法： `componentWillReceiveState`。
> 将要传进来的 `prop` 可能会引起 `state` 改变，反之则不然。
> 如果需要在 `state` 改变的时候执行一些操作，请使用 `componentWillUpdate`。

### 更新： shouldComponentUpdate

```html
boolean shouldComponentUpdate(object nextProps, object nextState)
```

**`调用时刻：`** 在接收到新的 `props` 或者 `state`，将要渲染之前调用。
该方法在初始化渲染的时候不会调用，在使用 `forceUpdate` 方法的时候也不会。

如果确定新的 `props` 和 `state` 不会导致组件更新，则此处应该返回 `false。`

```js
shouldComponentUpdate: function(nextProps, nextState) {
  return nextProps.id !== this.props.id;
}
```

如果 `shouldComponentUpdate` 返回 `false，则` `render`() 将不会执行，直到下一次 `state` 改变。
（另外，`componentWillUpdate` 和 `componentDidUpdate` 也不会被调用。）

默认情况下，`shouldComponentUpdate` 总会返回 `true`，在 `state` 改变的时候避免细微的 `bug`
但是如果总是小心地把 `state` 当做不可变的，在 `render()` 中只从 `props` 和 `state` 读取值，此时你可以覆盖 `shouldComponentUpdate` 方法，实现新老 `props` 和 `state` 的比对逻辑。

> 如果性能是个瓶颈，尤其是有几十个甚至上百个组件的时候，使用 `shouldComponentUpdate` 可以提升应用的性能。

### 更新： componentWillUpdate

```html
componentWillUpdate(object nextProps, object nextState)
```

**`调用时刻：`** 在接收到新的 `props` 或者 `state` 之前立刻调用。
在初始化渲染的时候该方法不会被调用。

使用该方法做一些更新之前的准备工作。

> 注意：
> 你不能在该方法中使用 `this.setState()`。
> 如果需要更新 `state` 来响应某个 `prop` 的改变，请使用 `componentWillReceiveProps`。

### 更新： componentDidUpdate

```html
componentDidUpdate(object prevProps, object prevState)
```

**`调用时刻：`** 在组件的更新已经同步到 DOM 中之后立刻被调用。
该方法不会在初始化渲染的时候调用。

使用该方法可以在组件更新之后操作 DOM 元素。

> 注意：
> 为了兼容 v0.9，DOM 节点会作为最后一个参数传入。
> 如果使用这个方法，你仍然可以使用 `this.getDOMNode()` 来访问 DOM 节点。

### 移除： componentWillUnmount

```html
componentWillUnmount()
```

在组件从 DOM 中移除的时候立刻被调用。

在该方法中执行任何必要的清理，比如`无效的定时器`，或者`清除在 componentDidMount 中创建的 DOM 元素`。