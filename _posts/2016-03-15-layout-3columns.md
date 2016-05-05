---
title: 三栏式布局
date: 2016-03-15 17:31:11
categories: CSS
tags: 布局
---
**参考**
[双飞翼布局介绍-始于淘宝UED](http://www.imooc.com/wenda/detail/254035)

## 圣杯布局

```html
<div class="body">
    <div class="main"></div>
    <div class="sub"></div>
    <div class="extra"></div>
</div>
```

<!-- more -->

```css
.main {
    float: left;
    width: 100%; /*基于父元素*/
}
.sub {
    float: left;
    width: 190px; /*定宽*/
    margin-left: -100%; /*基于父元素*/
}
.extra {
    float: left;
    width: 230px;
    margin-left: -230px;
}
```

可以看出，通过简单的负边距，已经让`sub`和`extra`定位到正确的位置。剩下的问题是如何让`main`也定位到正确的位置。

[**点此查看 demo**](http://sandbox.runjs.cn/show/lyth3f6u)

但是 `main` 被`sub` 和 `extra` 覆盖在下面。

要把 `main` 定位到正确的位置，给`main`的容器`.body`添加`padding`:

```css
.body {
    padding: 0 230px 0 190px;
}
```

[**点击查看 demo**](http://sandbox.runjs.cn/show/f4laoayq)

这样能让`main`定位到正确的位置，但`sub`和`extra`的位置不对了，这个时候就需要用到相对定位。

```css
.sub {        
   float: left;
   width: 190px;
   margin-left: -100%;
   position: relative;
   left: -190px;
}  
.extra {
    float: left;
    width: 230px;
    margin-left: -230px;
    position: relative;
    right: -230px;
}
```

[**点击查看 demo**](http://sandbox.runjs.cn/show/imquophu)

很明显，这就是圣杯布局！

## 双飞翼布局

既然不添加额外标签时，完美布局的实现如此困难，那如果允许添加一个额外标签呢？

给`main`增加了一层包裹：

```html
<div class="main">
    <div class="main-wrap"></div>
</div>
```

这样的话只需要增加一行 CSS 代码：

```css
.main-wrap {
    margin: 0 230px 0 190px;
}
```

整个 HTML 代码如下：

```html
<div class="body">
    <div class="main">
        <div class="main-wrap"></div>
    </div>
    <div class="sub"></div>
    <div class="extra"></div>
</div>
```

整个 CSS 代码如下：

```css
.main {
    float: left;
    width: 100%; /*基于父元素*/
}
.sub {
    float: left;
    width: 190px; /*定宽*/
    margin-left: -100%; /*基于父元素*/
}
.extra {
    float: left;
    width: 230px;
    margin-left: -230px;
}
/*新增这一行*/
.main-wrap {
    margin: 0 230px 0 190px;
}
```

[**点击查看 demo**](http://sandbox.runjs.cn/show/yznneugc)


