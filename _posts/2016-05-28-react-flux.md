---
title: React 入门 —— 使用Flux搭建React应用程序架构
date: 2016-05-28 20:48:28
categories: JavaScript
tags: React
---

> **参考资料**
> [使用Flux搭建React应用程序架构](http://www.infoq.com/cn/articles/react-flux)

在一个完整的应用程序中，除了实现View之外，
我们还需要考虑如何`同服务器通信`、`View之间如何交互`以及`View背后的数据模型如何去设计`。

> **那么Flux正是Facebook提出的解决这些问题的方案。
**

简单来说，`Flux`定义了一种`单向数据流`的方式，来实现`View和Model之间的数据流动`。
它更`像是一种设计模式`而非一个正式的框架，以至于官方的Flux参考实现只有一个文件，区区100多行源代码。
所以Flux继承了React的简单、直观的设计思想，让人一眼就能看明白其背后的运行原理。
当然，要用好Flux，还是要正确`理解其概念和背后的出发点`，官方则是提供了两个具体的例子供大家参考。

<!-- more -->

## Flux 要解决的问题

在`传统MVC框架`中，通常使用`双向绑定的方式来将Model的数据展现到View`。
当`Model`中的数据发生变化时，一个或多个`View`会发生变化；
当`View`接受了用户输入时，`Model`中的数据则会发生变化。

在实际的应用中，当一个`Model`中的数据发生变化时，也有可能另一个相关的`Model`中的数据会被同步更新。
这样，很容易出现的一个现象就是`连锁更新（Cascading Update）`，`Model可以更新Model`，`Model可以更新View`，`View也可以更新Model`。
你很难去推断一个界面的变化究竟是由哪个局部的功能代码引起。

如下图所示， Model 和 View 之间的关系错综复杂，导致出现问题时很难调试；
实现新功能时也需要时刻注意代码是否会产生副作用。

<img src="1.jpg">

**对此问题，Flux的解决方案是`让数据流变成单向`，引入`Store`、`Action`、`Action Creators`和`Dispatcher`等概念来管理信息流。**
如下图所示：

<img src="2.jpg">

可以看到，数据流变成单向的。
同时，数据如何被处理也被明确的定义了。
在MVC中，数据如何处理通常由`Controller`来完成，在`Controller`中实现大部分的业务逻辑来处理数据。
而现在则`被清晰的定义在Store`或者`Action Creators`中。
当然，上图隐藏了一些细节，更为全面的架构图则如下所示：

<img src="3.jpg">

在`Flux`中，`View`完全是`Store`的展现形式，`Store`的更新则完全由`Action`触发。
得益于`React`的`View`每次更新都是整体刷新的思路，我们可以完全不必关心`Store`的变化细节，只需要`监听Store的onChange事件`，`每次变化都触发View的re-render`。
从而也可以看到，尽管Flux架构可以离开React单独使用，但无疑两者结合是一个更加和谐的方案，能够各发挥所长。

## 一个具体的例子

为了对`Flux`有一个总体的印象，我们先考虑一个简单的使用场景：`在文章评论页面提交一条评论`。
为此，我们需要`向服务器发送一个请求提交新的评论`，同时要`将新的评论显示在列表中`。

### 设计思路

> **这样的场景如果使用`Flux`去实现，大概需要实现以下几个部分：**
> 1.`React`组件用于显示评论列表以及评论框，并绑定到`Store`；
> 2.一个`Store`用于存储评论数据；
> 3.`Action Creator`用于向服务器发送请求；
> 4.`Store`中监听`Action`并进行处理，从而对`Store`自身进行更新。

<img src="4.jpg">

> **整个流程的运行大概如下：**
> 1.用户点击提交按钮，`Action Creator`负责向服务器发送请求；
> 2.请求如果成功，那么将评论本身被添加到`Store`；
> 3.请求如果失败，那么在`Store`中标记一个特别的错误状态；
> 4.`View`监听了`Store的onChange`的事件，因此，无论请求成功和失败，`Store`都会触发`onChange`事件，这时`View`就会进行整体更新。

可以看到，`无论请求成功和失败`，都是去`修改组件之外的Store`，由`Store通知UI进行变化`。
在这样一个架构中，`Store`中存储的是`整个或者一部分应用程序的状态`，React实现的`View只需要监听Store的变化`，而无需知道变化的细节，这也是由React组件的特点决定的。

这样，我们就使用Flux完成了评论功能，
不同于双向绑定，在Flux的流程中，数据如何流转和变化，变得非常清晰明确。
`虽然可能需要写更多的代码，但是带来了更清楚的架构。`
下面，我们来具体看其中的每个具体组件的概念和用法。

### View 和 Store

在`Flux`架构中，`View`即`React`的组件，而`Store`则存储的是应用程序的状态。
在前面的文章中我们已经介绍过，`React`是完全面向`View`的解决方案，它提供了一种始终都是整体刷新的思路来构建界面。

> 在`React`的思路中，`UI`就是一个状态机，每个确定的状态对应着一个确定的界面。

对于一个小的组件，它的状态可能是在其内部进行维护；
而对于多个组件组成的应用程序，如果某些状态需要在组件之间进行共享，则可以将这部分状态放到`Store`中进行维护。

在`Flux`中，`Store`并不是一个复杂的机制，甚至Flux的官方实现中并没有任何`Store`相关的机制和接口，而是仅仅通过示例来描述了一个`Store`应该是什么样的数据结构。

例如，在官方提供的[**TodoMVC例子**]( https://github.com/facebook/flux/tree/master/examples/flux-todomvc/ )中，Store的实现如下：

```js
var _todos = [];
var TodoStore = assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
})
```

可以看到，一个`Flux`的`Store`就是一个能触发`onChange`事件的对象，能够让其它对象订阅（`addChangeListener`）或者取消订阅（`removeChangeListener`）。
同时，它提供了一些API供View来获取自己需要的状态。
因此，也可以将`Store`理解为需要被不同`View`共享的公用状态。

那么，已经有了`Store`，`React`的组件（`View`）该如何使用它们呢？
其实很简单，只需要在`Store``每次变化时都去获取一下最新的数据`即可。

我们可以看下TodoMVC中的实现：

```html
var TodoStore = require('../stores/TodoStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

var TodoApp = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});
```

可以看到，在组件的`componentDidMount`方法中，开始`监听Store`的`onChange事件`；
在`componentWillUnmount`方法中，`取消监听onChange事件`。
在Store的`每次变化后`，都去`重新获取自己需要的状态数据`：`getTodoState()`。

通过这样一种很简单的机制，我们建立了从`Store`到`View`的数据绑定，每当`Store`发生变化，`View`也会进行相应的更新。

### Dispatcher 和 Action

那么底下我们需要关心当View接收用户交互，需要将新的状态存入到Store中，应该如何去实现。
这就需要引入Flux的另外两个概念`Dispatcher`和`Action`。

顾名思义，`Dispatcher`就是负责分发不同的`Action`。
在一个`Flux`应用中，只有一个中心的`Dispatcher`，所有的`Action`都通过它来分发。
而Facebook的官方Flux实现其实就仅仅是提供了`Dispatcher`。
使用`Dispatcher`只需要将其作为`npm模块`引入：

```js
var Dispatcher = require('flux').Dispatcher;
```

> Dispatcher有两个方法：
> `dispatch`：分发一个Action；
> `register`：注册一个Action处理函数。

这样，当`View`接受了一个用户的输入之后，通过`Dispatcher`来分发一个特定的`Action`，而对应的`Action`处理函数会负责去更新`Store`。
这个流程在文章开始的图中可以清楚的看到。
因此，通常来说`Action的处理函数`会和`Store`放在一起，因为`Store的更新`都是由`Action处理函数来完成`的。

例如在`TodoMVC`中，`TodoStore`中会处理如下`Action`：

```js
Dispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});
```

无论是添加、删除还是修改一个Todo项，都是由Action来触发的。
在Action处理函数中，不仅对Store进行了更新，还触发了Store的onChange事件，从而让所有监听组件能够得到通知。
[完整的代码可以参考](https://github.com/facebook/flux/blob/master/examples/flux-todomvc/js/stores/TodoStore.js)

通过`Dispatcher和Action`，实现了`从View到Store的数据流`，进而实现了整个Flux的单向数据流循环。
从这里可以看到，`Dispatcher是全局唯一`的，相当于是`所有Action的总hub`；
而`每个Action处理函数都能够收到所有的Action`，至于需要对哪些进行处理，则由处理函数自己决定。

例子中是通过switch来判断Action的type属性来决定如何进行处理。
因此，虽然不是必须，但是一般Action都会有一个type属性来标识其类型。

### Action Creators

有了上述概念和机制，基本上就已经有了Flux的整个架构的模型。
那么`Action Creators`又是什么呢？
顾名思义，Action Creators即`Action的创建者`。
它们负责去`创建具体的Action`。
一个Action可以由`一个界面操作产生`，也可以由`一个Ajax请求的返回结果产生`。
为了让这部分逻辑更加清晰，让View更少的去关心数据流的细节，于是有了`Action Creators`。

例如，对于一个TodoItem组件，当用户点击其中的Checkbox时，会产生一个`COMPLETE_TODO`的Action，直观的看，完全可以在View的内部去实现`Dispatcher.dispatch({type: ‘COMPLETE_TODO’, payload: {…})`，而为了保持View的简单和直观，通常会在独立的Action Creators去封装这部分逻辑，例如：

```js
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },
  …
}
```

这里的`TodoActions`就是一个`Action Creator`，它把具体分发`Action`的动作封装成具有语义的方法，供View去使用，那么在一个`TodoItem`的组件中，其界面JSX可能就是：

```html
…
render: function() {
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.text}
        />;
    }

    return (
      <li
        className={classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  },

  _onToggleComplete: function() {
    TodoActions.toggleComplete(this.props.todo);
  },
…
```


