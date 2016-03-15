---
title: CSS 布局
date: 2016-03-02 23:01:54
categories: CSS
tags: Layout
---

布局 - 元素的摆放模式

## display

设置元素的显示方式

`dispaly: block | inline | inline-block | none`

### dispaly: block;

1. 默认宽度为父元素宽度
2. 可设置宽高（1、2影响元素的大小）
3. 换行显示（影响元素的位置）
4. 默认为block的元素：`<div>`, `<p>`, `<h1>` ~ `<h6>`, `<ul>`, `<form>`

<!-- more -->

### display:inline

1. 默认宽度为内容宽度
2. 不可设置宽高
3. 同行显示（元素内部可换行）
4. 默认为inline的元素：`<span>`, `<a>`, `<label>`, `<cite>`, `<em>`

### display:inline-block

1. 默认宽度为内容宽度
2. 可设置宽高
3. 同行显示
4. 整块换行
5. 默认为inline-block的元素：`<input>`, `<textarea>`, `<select>`, `<button>`

### display:none

1. 设置元素不显示
2. `display:none` 与 `visibility:hidden` 的区别为 `display:none` 不显示且不占位，但 `visibility:hidden` 不显示但占位。

## position

`position` 用于设置定位的方式与`top right bottom left z-index` 则用于设置参照物位置（必须配合定位一同使用）。

### 三种定位形式

1. 静态定位（`static`）
2. 相对定位（`relative`）
3. 绝对定位（`absolute`、`fixed`）

```cs
position: static | relative | absolute | fixed
/* 默认值为 static */
```

### position:relative

1. 相对定位的元素仍在文档流之中，并按照文档流中的顺序进行排列。
2. 参照物为元素本身的位置。

**NOTE：**最常用的目的为改变元素层级和设置为绝对定位的参照物。

### position:absolute

建立以包含块为基准的定位，其随即拥有偏移属性和 `z-index` 属性。

1. 默认宽度为内容宽度
2. 脱离文档流
3. 参照物为第一个定位祖先或根元素（<html> 元素）

### position:fixed

1. 默认宽度为内容宽度
2. 脱离文档流
3. 参照物为视窗

**NOTE：**宽高的100%的参照依然为视窗（例：网页遮罩效果）

### top/right/bottom/left

其用于设置元素边缘与参照物边缘的距离，且设置的值可为负值。在同时设置相对方向时，元素将被拉伸。

### z-index

其用于设置 `Z` 轴上得排序，默认值为 `0` 但可设置为负值。（如不做设置，则按照文档流的顺序排列。后面的元素将置于前面的元素之上）

## float

`CSS` 中规定的定位机制，其可实现块级元素同行显示并存在于文档流之中。浮动仅仅影响文档流中下一个紧邻的元素。

```cs
float: left | right | none | inherit
```

1. 默认宽度为内容宽度
2. 脱离文档流（会被父元素边界阻挡与`position`脱离文档流的方式不同）
3. 指的方向一直移动

`float` 元素在同一文档流中，当同时进行 `float` 时它们会按照文档流中的顺序排列。(当所有父元素中的所有元素脱离文档流之后，父元素将失去原有默认的内容高度)

注意：`float` 元素是半脱离文档流的，对元素是脱离文档流，但对于内容则是在文档流之中的（既元素重叠但内容不重叠）。

### clear

```cs
clear: both | left | right | none | inherit
```

1. 应用于后续元素
2. 应用于块级元素（block）

使用方法：

1. `clearfix` 于父元素
2. 浮动后续空白元素 `.emptyDiv {clear: both}`
3. 为受到影响的元素设置 `width: 100%` `overflow: hidden` 也可
4. 块级元素可以使用 `<br>` 不建议使用，影响 `HTML` 结构

```css
/* clearfix */
.clearfix:after {
   content: "."; /* Older browser do not support empty content */
   visibility: hidden;
   display: block;
   height: 0;
   clear: both;
}
.clearfix {zoom: 1;} /* 针对 IE 不支持 :after */
```


