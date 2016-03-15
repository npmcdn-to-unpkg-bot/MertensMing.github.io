---
title: HTML 最佳实践之标准的 HTML 代码
date: 2016-02-24 22:29:23
categories: 前端规范
tags: HTML
---

# 标准的 HTML 代码

标准的 HTML 代码指的是 HTML 代码符合 W3C 的最新标准。

## 验证代码是否符合标准

### 一个标准的页面有哪些优点：

**1. 标准的页面会保证浏览器正确地渲染**。

使用符合标准的 HTML 标签和 CSS 样式，能最大限度的保证页面在不同浏览器正常地进行解析，同时最大限度地保证未来的各种客户端中正常地解析。

**2. 网页能更容易被搜索引擎搜寻，提高网站的排名。**

网络“爬虫”会根据标签的语义和标签上的一些属性来判断标签的内容所要表达的意思。

**3. 提高网站的易用性**

让网站能够被更多的用户访问，尤其是一些视力或者肢体障碍用户等所访问。

**4. 网页更好维护和扩展**

页面的多个开发者如果遵循统一的标准，则会更好地理解和维护已有的页面。

**5. HTML 验证工具** 
[W3 Validator][1]

<!--more-->

## 标准的 HTML 页面结构

一个基本的 HTML 页面结构是：

```html
<html>
    <head>
    </head>
    <body>
    </body>
</html>
```

`head` 部分包含整个文档的一些基本信息，如网站的编码格式、网站的标题、网站引用的样式和脚本等。

`body` 部分包含用户在浏览器中能看到的内容。

为了使得 HTML 文档能兼容标准格式，还需要给文档添加一个文档类型声明（`DTD`），当浏览器解析 HTML 文档时会遵循指定的类型声明标准。

HTML4 的规范中定义了多个规范的文档声明：

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Translational//EN">
```

在 HTML5 的规范中简化了文档类型声明，省略了 DTD 的引用，表明文档以标准模式解析：

```html
!DOCTYPE html
```

**head 部分**

文档的标题是作为站点的名称和尖端描述显示在浏览器的标题栏上的：

```html
<title>网站标题</title>
```

如果引用 JavaScript 和 CSS 外部文件，则需要把外部文件的链接添加到 head 部分。

```html
<link rel="stylesheet" type="text/css" href="my_style.css"/>
```

head 部分还会包含一些必要的 `meta` 标签，是对 HTML 文档内容描述，用来表明文档的编码、关键字、介绍、作者等信息。

Meta标签给搜索引擎提供了许多关于网页的信息。

通常情况下，`<meta>` 标签会包含一个 `name属性`，用来设置元数据。元数据的值放在 `content属性` 里面。

可以在<meta>标签中使用各种 `名称/值对`。

**Meta Description**

Meta description标签可能是最有用的标签之一。

顾名思义，它会给搜索引擎提供关于这个网页的简短的描述。

```html
<meta name="description" content="Everything you need toknow about meta tags forsearch engine optimization"/>
```

**Meta Robots**

Meta robots标签管理着搜索引擎是否可以进入网页，你可以用它来允许或不允许搜索引擎来获取你的网页、进入你网页中的子链接或对你的网页存档。

```html
<meta name="robots"content="noindex,nofollow"/>
```

**Meta Content Type (charset)**

meta content type标签被用来声明网页的字符编码，为了防止浏览器产生编码问题最好加上这个属性。

```html
<meta http-equiv='Content-Type'content='Type=text/html; charset=utf-8'>
<!--现在我们也可以使用更简短的、向后兼容的声明模式：-->
<meta charset="utf-8"/>
```

**Meta Keywords**

这个标签在过去很重要，但是现在却没什么价值了。

现在没有一个主流的搜索引擎使用meta keywords来判断网页的内容了。

```html
<meta name="keywords" content="meta tags,search engine optimization"/>
```

**Meta Language**

这个标签之前是用来声明网页的语言的。可以告知屏幕阅读器和其它文本处理器他们正在处理的语言以便更好的工作。

这就是为什么meta language的content声明为什么可以为fr.

```html
<meta http-equiv="content-language"content="fr"/>

<!--W3C推荐使用标签的属性来声明语言-->
<html lang="en">
```

## 正确闭合 HTML 标签

元素可以包含的内容包括其他元素和字符。

也有一些元素是 `空元素`，即不能包含任何内容，这些元素对应的 HTML 标签也称为 `自闭合标签`。

`area` `base` `br` `col` `command` `embed` `hr` `img` `input` `keygen` `link` `meta` `param` `source` `track` `wbr`

在 HTML5 的规范中，自闭合标签添加 `/` 和 不添加 `/` 都符合规范。

## 停止使用不标准的标签和属性

标签和属性不被推荐的原因有以下几个：

**1. 标签没有实际的语义，仅仅用于设置样式**

```html
<!-- 不推荐代码：不推荐使用单纯设置样式的标签，应该通过 CSS 设置样式 -->
<font color="blue">don't use it!</font>
<big>don't use it!</big>
<center>don't use it!</center>
```

不推荐在HTML 标签中添加样式属性。

```html
<!-- 不推荐代码：标签中添加 border、width、height 等样式属性 -->
<img src="#" alt="demo" border="1" width="194" height="37" />
<div id="focusViwer" align="center"></div>
```

不推荐使用 `blink` 或 `marquee`（闪动或滚动）

**2. 让 HTML 标签具有更好地语义**

```html
<!-- 不推荐代码：无语义的标签，单纯设置样式 -->
<b>don't use it!</b>
<i>don't use it!</i>
<s>don't use it!</s>
<strike>don't use it!</strike>
```

推荐示例

```html
<!-- 推荐代码：使用具有语义的标签，如果单纯为了样式，应该使用 CSS 来设置 -->
<strong>important</strong>
<em>emphasize</em>
<del>deleted</del>
<ins>insert</ins>
```

**3. 移除不常用的 HTML 标签**

废弃的原因是使用率极低或者语义有歧义，并且有其他更好地替代方案。

表达缩写的标签 `<acronym>`，语义模糊，用 `<abbr>` 来替代；

使用 `<li>` 来代替 `<dir>`。

## 样式与结构分离

HTML 和 CSS 所有的组合方式：

**1. 在 HTML 页面中链接一个 CSS 文件**

```html
<link rel="stylesheet" href="default.css" />

<!--设置 media 属性来设置来表明样式使用的场景-->
<link rel="stylesheet" href="print.css" media="print" />
```

这种模式是最佳实践，做到了 CSS 和 HTML 的完美分离。

**2. 在 HTML 页面中内嵌 CSS 样式**

```html
<style>
    body { }
</style>
```

**一种好的实践：**

- 在开发阶段，将 CSS 和 HTML 放置于单独的页面中，方便后续的开发和维护。
- 当代码发布时，使用工具合并 CSS 和 HTML 代码，提高页面实际运行时的性能。

**3. 在 HTML 标签中添加内联 CSS 样式**

```html
<span style="color:green;">green</span>
```

- 不利于页面的维护与样式的重用
- 便于通过 JavaScript 代码动态更改元素样式

**4. 在 CSS 样式文件中加载 CSS 样式文件**

```html
@import "mystyle.css";
@import url("mystyle.css");
```

## 添加 JavaScript 禁用的提示信息

```html
<noscript>
    <p>浏览器不支持 JavaScript</p>
</noscript>
```

最好不要用 `<noscript>` 标签，而是更改设计，让页面从无脚本模式过渡到有脚本的模式。

最佳实践是，提示用户 JavaScript 已被禁用，并同时提供一个功能简单、不依赖于 JavaScript 的代替网站供用户继续浏览，做到平稳降级。

## 添加必要的 `<meta>` 标签

[Meta标签与搜索引擎优化][2]




  [1]: https://validator.w3.org/
  [2]: http://www.chinaz.com/web/2016/0111/494040.shtml