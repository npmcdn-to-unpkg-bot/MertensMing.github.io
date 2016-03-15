---
title: HTML 最佳实践之高可读性的 HTML
date: 2016-02-25 14:12:14
categories: 前端规范
tags: HTML
---
## HTML 语义化

什么是 HTML 的语义？

直观的说，就是 HTML 的含义，从 HTML 代码中使用的标签本身就可以说明标签包含内容的含义。

**标签语义化的优点：**

- 使得诸如搜索引擎以及第三方内容抓取工具等更容易读懂页面代码
- 提高页面代码的可读性，利于代码阅读者理解代码的模块

**什么事高语义化的页面？**

从代码的角度来说，高语义化的页面就是在页面代码中尽量使用合适的语义化标签。

<!--more-->

**编写高语义HTML 代码可参考的四条原则**

1. 熟悉所有规范中的 HTML 标签，理解各标签的语义，在合适的地方使用合适的标签。
2. 熟悉各标签上规范的属性，给 HTML 标签设置必要的属性。
3. 样式和结构分离，更进一步，把 HTML 代码中用于表达外观的部分从 HTML 中删除，并改用 CSS 样式来实现。
4. 给空标签添加隐藏文字，用于说明标签的实际功能。

## 如何设置网页标题层级

- 在页面内容的标题部分使用 `hx` 标签
- 页面中只使用一个 `<h1>` 标签，各模块的标题从 `<h2>` 开始
- `<hx>` 标签使用过程中不要跳级，把不在页面中显示的 标题隐藏，而不是删除
- 不要单纯使用 `<hx>` 标签给内容设置样式

## 如何正确的设计表单

`<label>` 用于为输入控件定义文本标签（label）—— 即显示在输入控件旁边的说明性文字。

要为 `<label>` 指定关联的输入控件，只需把相关控件的 id 赋值给 `<label>` 标签的 `for` 属性。

`for` 属性的作用是： 不仅把 `<label>` 元素上的触发事件指向了 for 属性指代的表单元素。

`<fieldset>` 元素用于把表单里的相关控件集中起来，形成一个控件组。

`<legend>` 元素用来定义控件组的标题。

**输入框设置水印提示提高表单易用性**

1.使用 `<label>` 标签，设置 `<label>` 标签的 `for` 属性

2.给输入控件设置合适的水印提示，推荐使用 HTML5 中引入的 `placeholder` 属性， `jquery-placeholder` 插件

3.如有必要，给输入控件设置 `tab` 顺序

```html
<input type="text" tabindex="2" />
```

4.使用 HTML5 中引入的表单控件

```html
<form action="/service/user" method="post">
    <fieldset>
        <legend>Sign in to begin.</legend>
        <label for="userName">User Name:</label>
        <input type="email" id="userName" name="userName" placeholder="user@lifeway.com" tabindex="1" required="true" />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" tabindex="2" required="true" />
        <label for="staySigned">
            <input type="checkbox" id="staySigned" name="staySigned" tabindex="3" />
            Stay signed in
        </label>
    </fieldset>
    <input type="submit" value="Login" tabindex="4" />
</form>
```

![效果图][1]

[1]: http://static.zybuluo.com/mertens/8db7qjozjd6zfu5ufalztm90/%E6%90%9C%E7%8B%97%E6%88%AA%E5%9B%BE20160225200935.jpg

## 精简 HTML 代码

- 删除多余的容器
- 装饰性的元素使用 CSS 样式
- 避免使用 table 布局

## 过时的块级元素和行内元素

**HTML5中的定义了内容模型，淡化了块元素和行内元素**

为了消除块状元素和行内元素这两个概念引起的混淆，在HTML5规范中刻意淡化了块状元素和行内元素的定义，并按照元素具体的语义重新划分了元素的类型。

HTML5中的分类比HTML4.01中的分类更具体，总共分为七类，每种元素并不限定于某一类型，有可能某个元素属于多个类型，以下是具体的分类 ：

元数据式内容（Metadata content）：`<base>`、`<command>`、`<link>`、`<meta>`等
流式内容（Flow content）：`<span>`、`<div>`等。

这个分类基本包括了HTML4.01中的块状元素和行内元素。

章节式内容：`<article>`、`<aside>`、`<nav>`以及`<section>`
标题式内容：`<h1>`~`<h6>`、`<hgroup>`。
段落式内容：`<span>`、`<img>`等。

基本上等同于HTML4.01中行内元素的范围。

嵌入式内容：`<img>`、`<iframe>`、`<svg>`、`<audio>`、`<video>`、`<canvas>`等。
交互式内容：`<a>`、`<button>`、`<select>`、`<input>` 等。

![七类标签][2]

  [2]: http://static.zybuluo.com/mertens/ez4vr7nemfxzsa1wcbypkoav/%E6%90%9C%E7%8B%97%E6%88%AA%E5%9B%BE20160225205218.jpg
