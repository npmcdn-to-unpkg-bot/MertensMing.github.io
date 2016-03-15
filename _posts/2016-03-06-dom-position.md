---
title: JavaScript 获取 DOM 元素位置和大小
date: 2016-03-06 22:32:51
categories: DOM
tags: Position
---
**关键字**

- 元素位置
- 尺寸的计算

## 基础概念
HTML 元素的实际内容有时候会比容纳它的盒子更大，因此可能会出现滚动条，内容区域是视口当实际内容比视口大的时候，需要把元素的滚动条位置考虑进去。

**每个 HTML 元素都会有以下属性：**

`offsetWidth` `offsetHeight` 
元素外尺寸，内容区 + 内边距 + 边框

`offserLeft` `offsetTop`
当前元素的外边框相到其 offsetParent 元素内容区的（左边）顶部的距离

`clientWidth` `clientHeight` 
元素的内尺寸，内容区 + 内边距 - 滚动条

`clientLeft` `clientTop`
内边距的外边缘 和 边框的外边缘 之间的水平和垂直距离，也就是边框的宽度

`scrollWidth` `scrollHeight` 
元素的实际宽高：实际内容区 + 内边距 - 滚动条
**在FireFox和IE10下没有计算下padding**

`scrollLeft` `scrollTop`
滚动条滚动的距离，可读可写

<!--more-->

## 相对于文档与视口的坐标
- 当我们计算一个 DOM 元素的位置也就是坐标的时候，会涉及两种坐标系，**文档坐标** 和 **视口坐标**
- 我们经常用到的 document 就是整个页面部分，而不仅仅时窗口可见部分，还包括因为窗口大小限制超出滚动条的部分它的左上角就是所谓文档坐标的原点。
- 视口是显示文档内容的浏览器的一部分，它不包括浏览器外壳（菜单、工具栏、状态栏），不包括滚动条。
- 如果文档比视口小，说明没有出现滚动条，文档左上角和视口左上角重叠
- 一般来讲，要在两种坐标系间切换，需要加上或减去滚动的偏移量（scroll offset）

 **为了在坐标系之间进行转换，我们需要判定浏览器窗口的滚动条位置**

- `pageYOffset` 返回文档在垂直方向已滚动的像素值。
- `pageXOffset` 返回文档在垂直方向已滚动的像素值。
- IE8 及以下可以通过 scrollTop 和 scrollLeft 来获取滚动条的位置，正常情况下可以通过查询文档的根节点(`document.documentElement`)，来获取这些属性值，在怪异模式下必须通过文档的 body 查询。
IE8 及以下的兼容代码
```javascript
var x = (window.pageXOffset !== undefined) ? 
window.pageXOffset : 
    (document.documentElement || 
    document.body.parentNode || 
    document.body)
    .scrollLeft;
var y = (window.pageYOffset !== undefined) ? 
window.pageYOffset : 
    (document.documentElement || 
    document.body.parentNode || 
    document.body)
    .scrollTop;
```

## 文档坐标
- 任何 HTML 元素都拥有 offsetLeft 和 offsetTop 属性返回元素的 X坐标 和 Y 坐标，对于很多元素，这些值都是文档坐标，但是对于**定位元素**和**其他一些元素（表格单元）**，返回相对于祖先的坐标

**可以通过递归上溯累加计算**
有滚动条的情况下这个方法不能正常工作

```javascript
function getElementPosition(ele) {
    var x = 0, y = 0;
    while( ele !== null) {
        x += ele.offsetLeft;
        y += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return 
    {
        x:x,
        y:y
    };
}
```
## 视口坐标
- `getBoundingClientRect()` 元素的该方法返回一个有 left、rifht、top、bottom 属性的对象，分别表示元素的四个位置相对于视口的坐标。
- 兼容性很好

## 元素尺寸
- 标准下，`getBoundingClientRect` 返回的对象中还包括 weight 和 height 属性，但是原始 IE 未实现，但是通过返回的 right - left 和 top - bottom 可以计算得出
