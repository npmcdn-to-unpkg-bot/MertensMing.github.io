---
title: CSS深入理解之 float浮动（转）
date: 2016-03-02 10:25:15
categories: CSS
tags: CSS
---

<a href="http://www.imooc.com/learn/121">CSS深入理解之float浮动</a>

## float 的历史

float 设计的初衷仅仅是： **文字环绕效果**

明白了浮动的设计初衷，就可以明白很多 float 特有的行为表现。

## 包裹与破坏

增强浮动的感性认知

<!-- more -->

### 包裹

由这种状态

<img src="2.jpg" alt="">

变成这种状态

<img src="3.jpg" alt="">

1. 收缩，本来它的宽度是很长的，包裹之后宽度变得很窄，跟它的身体宽度是一样的
2. 坚挺，原来的高度基本上是没有，突然坚挺了，高度就变成了跟它身高一样
3. 隔绝，里面的人发生的任何事情，对外面都不会有任何的影响(`BFC-块级格式化上下文`)

具有包裹性的其他小伙伴：
1. display: inline-block / table-cell
2. position: aboslute / fixed / sticky
3. voerflow: hidden / scroll

### 破坏

<img src="4.jpg" alt="">

<img src="5.jpg" alt="">

<img src="6.jpg" alt="">

容器被破坏表现行为是 **父元素高度塌陷**

其他具有破坏性的小伙伴：
1. display: none
2. position: aboslute / fixed / sticky

## 被误解的 float

是魔鬼还是情非得已？

众所周知，float 会让父元素高度塌陷！

言论：如何解决浮动让父元素高度塌陷的 bug？

**你需要知道的：浮动使高度塌陷不是 bug，而是标准！**

<img src="7.jpg" alt="">

浮动原本的作用仅仅是为了实现文字环绕效果。

利用破坏，实现文字环绕效果！

<img src="8.jpg" alt="">

<img src="9.jpg" alt="">

看以下例子：

<img src="10.jpg" alt="">

<img src="11.jpg" alt="">

<img src="12.jpg" alt="">

浮动的破坏性只是单纯的为了实现文字环绕效果而已。

因此，父容器高度塌陷根本不是 `bug`，特性使然！

## 清除浮动

<img src="13.jpg" alt="">

### 清除浮动的两大基本方法
1. 在底部插入一个设置了 `clear:both;` 的元素
2. 父元素`BFC（IE8+）`或 `haslayout(IE6/IE7)` 

### 方法差异

1. `clear` 跟外部可以接触，可以发生 `margin` 重叠
2.` BFC / haslayout` 跟外部隔绝

### clear 通常的应用形式

1. `HTML block` 水平元素底部走起 `<div...></div>`
2. `CSS after` 伪元素底部生成 `.clearfix:after`

**缺点：**

1. `div` 元素会产生多余的 `div` 元素
2. `after` 伪元素 - 不兼容 `IE6/IE7`

### BFC / haslayout 通常声明

<img src="15.jpg" alt="">

**缺点：**

<img src="16.jpg" alt="">

### 权衡后的策略

```html
<style>
    /*IE8 以上浏览器使用 after 伪元素*/
   .clearfix:after {
        content:"";
        display: block;
        height: 0;
        overflow: hidden;
        clear: both;
    } 
    /*IE6、IE7*/
    .clearfix {
        *zoom:1;
    }
</style>
```

### 切勿滥用

`.clearfix` 应用在包含浮动子元素的父级元素上

## 浮动的滥用

1. 元素 `block` 块状化（砖头化）
2. 破坏性造成的紧密排列特性（去空格化） 

### 砌砖布局的问题

1. 容错性比较糟糕，容易出问题
2. 这种布局需要元素固定尺寸，很难重复使用
3. 在低版本的 `IE` 下会有很多问题

## float 与兼容性

### 让 IE7 飙泪的浮动问题

含 clear 的浮动元素包裹不正确的问题

<img src="17.jpg" alt="">

浮动元素倒数 2 个莫名垂直间距问题

<img src="18.jpg" alt="">

浮动元素最后一个字符重复问题

<img src="19.jpg" alt="">

浮动元素楼梯排列问题

<img src="20.jpg" alt="">

浮动元素和文本不在同一行的问题

<img src="21.jpg" alt="">

<img src="22.jpg" alt="">


