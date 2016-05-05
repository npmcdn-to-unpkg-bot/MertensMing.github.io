---
title: CSS 居中布局解决方案
date: 2016-03-18 14:25:38
categories: CSS
tags: 布局
---
**参考**
[布局解决方案](http://wiki.jikexueyuan.com/project/fend_note/chapter4/02_layout.html)

## 水平居中布局

如果子元素是定宽的话，可以直接使用下面代码使子元素水平居中。

```css
.child {
    margin: 0 auto;
}
```

但是如果要使子元素水平居中，而且子元素和父元素的宽度都可以改变。

###  inline-block + text-align

```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .child {
    display: inline-block;
  }
  .parent {
    text-align: center;
  }
</style>
```

<a href="http://jsbin.com/wuriko/embed?css,output">**点击此查看 DEMO**</a>

**优点**：兼容性好，可以兼容到 IE6

<!-- more -->

### display: table + margin

```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .child {
    display: table; /*display: table 在表现上类似于 block 元素，但是宽度为内容宽*/
    margin: 0 auto;
  }
</style>
```

<a href="http://jsbin.com/sanahi/embed?css,output">**点击此查看 DEMO**</a>

**特点:**
不需要设置父元素的样式；
支持 `IE8` 及以上版本；
需要支持 `IE8` 以下版本需要将结构更改为 `<table>`

```html
<div class="parent">
  <table class="child">Demo</table>
</div>
```

### absolute + transform

```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    position: relative; /*父元素相对定位*/
  }
  .child {
    position: absolute; /*子元素绝对定位*/
    left: 50%; /*百分比参照物是父元素*/
    transform: translateX(-50%); /*百分比参照物是自身*/
  }
</style>
```

<a href="http://jsbin.com/nesofu/embed?css,output">**点击此查看 DEMO**</a>

**特点：**
绝对定位脱离常规文档流，不会对后续元素的布局造成影响。
`transform` 为 `CSS3` 属性，可以支持到 `IE9+`

### flex + justify-content

```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    display: flex; /*flex item 默认宽度为内容宽度*/
    justify-content: center;
  }

  /* 或者下面的方法，可以达到一样的效果 */

  .parent {
    display: flex;
  }
  .child {
    margin: 0 auto;
  }
</style>
```

<a href="http://jsbin.com/domepow/embed?css,output">**点击此查看 DEMO**</a>

**特点：**
只需要设置父元素的属性。
面向未来，有兼容性问题，`IE11+` 才支持 `dispaly: flex` 。

## 垂直居中布局

子元素于父元素垂直居中且其（子元素与父元素）高度均可变。

### table + transform

```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    height: 500px; /*可以给.parent元素设置固定高度*/
    display: table-cell;
    vertical-align: middle;
  }
</style>
```

<a href="http://jsbin.com/domepow/embed?css,output">**点击此查看 DEMO**</a>

**特点：**
兼容性好（支持 `IE8+`，以下版本需要调整页面结构至 `table`）
如果父元素的高度需要撑满屏幕，需要设置父元素的父元素 `display: table` 且设置 `height: 100%`

### absolute + tansform

```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    position: relative;
  }
  .child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
```

<a href="http://jsbin.com/nifisa/embed?html,css,output">**点击此查看 DEMO**</a>

**特点：**
绝对定位脱离文档流，不会对后续元素的布局造成影响。
但如果绝对定位元素是唯一的元素则父元素也会失去高度。
`IE9+` 兼容 `transform`

### flex + align-items

```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    display: flex;
    align-items: center;
  }
</style>
```

<a href="http://jsbin.com/miporoj/embed?html,css,output">**点击此查看 DEMO**</a>

**特点：**
只需要设置父元素的属性。
面向未来，有兼容性问题，`IE11+ `才支持 `dispaly: flex` 。

## 垂直水平居中布局

子元素于父元素垂直及水平居中且其（子元素与父元素）高度宽度均可变。

### inline-block + text-align + table-cell + vertical-align

```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    text-align: center;
    display: table-cell;
    vertical-align: middle;
  }
  .child {
    display: inline-block;
  }
</style>
```

<a class="jsbin-embed" href="http://jsbin.com/kinowo/embed?css,output">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.11"></script>

### absolute + transform

```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    position: relative;
  }
  .child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```

<a class="jsbin-embed" href="http://jsbin.com/vidira/embed?html,css,output">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.11"></script>

### flex + justify-content + align-items

```html
<div class="parent">
  <div class="child">Demo</div>
</div>

<style>
  .parent {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
```

<a class="jsbin-embed" href="http://jsbin.com/zulata/embed?css,output">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.35.11"></script>