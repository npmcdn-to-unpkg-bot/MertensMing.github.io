---
title: Canvas 绘图之旅
date: 2016-04-13 12:29:29
tags: Canvas
---

# Canvas 绘图基础

## 使用 canvas 标签

```html
<canvas id="drawing" width="500" height="300">你的浏览器不支持 HTML5 Canvas</canvas>
```

`width` 和 `height` 属性设置绘图区域的大小。

开始标签和结束标签之间的内容是后备内容，如果浏览器不支持，则显示这些信息。

```js
var drawing = document.getElementById('drawing');
```

## 取得绘图上下文

要在这块画布`canvas`上绘图，需要取得`绘图上下文`。

调用 `getContext` 方法。

```js
var drawing = document.getElementById('drawing');

// 确定浏览器是否支持 canvas 元素
if (drawing.getContext) {
    var context = drawing.getContext('2d');
}
```

<!-- more -->

## 导出图像

使用 `toDataURL` 方法可以导出在 `canvas` 元素上绘制的图像。

`IE9+` 支持 JPEG 编码格式。 

```js
var drawing = document.getElementById('drawing');
// 确定浏览器是否支持 canvas 元素
if (drawing.getContext) {
    
    // 取得图像的数据 URI
    var imgURI = drawing.toDataURL('image/png');

    // 显示图像
    var image = document.createElement('img');
    image.src = imgURI;
    document.body.appendChild(image);
}
```

## 2D 上下文

使用 `2D` 绘图上下文提供的方法，可以绘制简单的 `2D` 图形。

`2D` 上下文的坐标开始于 `canvas` 坐标的左上角，原点坐标是 `(0, 0)`。

### 填充和描边

**`填充:`** 就是用指定的样式（颜色、渐变或者图像）填充图形。

**`描边:`** 只在图形的边缘画线

大多数 2D 上下文操作都会分为二填充和描边两个操作，而操作的结果取决于两个属性：`fillStyle` 和 `strokeStyle`。

这两个属性的值可以是`字符串`、`渐变对象`或者`模式对象`，而且它们的默认值都是 `'#00000'`
。

如果为它们指定表示颜色的字符串值，可以使用 CSS 中指定颜色值的任何格式。

```js
var drawing = document.getElementById('drawing');
// 确定浏览器是否支持 canvas 元素
if (drawing.getContext) {

    // 取得 2d 上下文
    var context = drawing.getContext('2d');

    context.strokeStyle = 'red';
    context.fillStyle = '#0000ff';
}
```

所有涉及描边和填充的操作都会使用这两个样式。

### 绘制矩形

矩形是唯一一种可以直接在 2D 上下文中绘制的形状。

#### 与矩形有关的方法

`fillRect()` `strokeRect()` `clearRect()`

这三个方法都可以接受 4 个参数：

1. X 轴方向的距离
2. Y 轴方向的距离
3. 矩形的宽度
4. 矩形的高度

#### fillRect()

```js
var drawing = document.getElementById('drawing');

// 确定浏览器是否支持 canvas 元素
if (drawing.getContext) {

    // 取得 2D 上下文
    var context = drawing.getContext('2d');

    // 绘制红色的矩形
    context.fillStyle = '#E55D5D';
    context.fillRect(0, 0, 50, 50);

    // 绘制蓝色半透明的矩形
    context.fillStyle = 'rgba(0, 0, 220, .5)';
    context.fillRect(20, 20, 50, 50);
}
```

1. 以上代码现将 `fillStyle` 设置为红色，然后从 `(0, 0)` 处开始绘制矩形，矩形的宽高都是 `50`。
2. 然后，设置 `fillStyle` 设置为半透明的蓝色。

<img src="1.jpg" title="透过蓝色的矩形可以看到红色的矩形">

#### strokeRect()

```js
var drawing = document.getElementById('drawing');

// 确定浏览器是否支持 canvas 元素
if (drawing.getContext) {

    // 取得 2d 上下文
    var context = drawing.getContext('2d');

    // 绘制红色描边的矩形
    context.strokeStyle = '#E55D5D';
    context.strokeRect(0, 0, 50, 50);

    // 绘制蓝色半透明描边的矩形
    context.strokeStyle = 'rgba(0, 0, 220, .5)';
    context.strokeRect(20, 20, 50, 50);
}
```

<img src="2.jpg" title="两个重叠的矩形，不过只有描边">

#### clearRect()

用于清除画布上的矩形区域。

```js
var drawing = document.getElementById('drawing');

// 确定浏览器是否支持 canvas 元素
if (drawing.getContext) {

    // 取得 2D 上下文
    var context = drawing.getContext('2d');

    // 绘制红色的矩形
    context.fillStyle = '#E55D5D';
    context.fillRect(0, 0, 50, 50);

    // 绘制蓝色半透明的矩形
    context.fillStyle = 'rgba(0, 0, 220, .5)';
    context.fillRect(20, 20, 50, 50);

    // 在两个矩形重叠的地方清除一个小矩形
    context.clearRect(40, 40, 10, 10);
}
```

<img src="3.jpg">

### 绘制路径

#### 描绘路径

通过路径可以创造出复杂的形状和线条。

1. 要绘制路径，首先必须调用 `beginPath()` 方法，表示要开始绘制新路径。
2. 然后，再通过调用下列方法来实际地绘制路径。

##### 绘制弧线

```js
/**
* 绘制一条弧线
* 
* 以( x, y) 为圆心
* 弧线半径为 radius
* 起始和结束角度（用弧度表示）分别为 startAngle 和 endAngle
* counterclockwise 是否按逆时针方向计算，值为 false 表示按顺时针方向计算
*/
arc( x,  y,  radius,  startAngle,  endAngle, counterclockwise) 
```

```js
/**
* 从上一点开始绘制一条弧线
* 
* 从上一点开始绘制一条弧线，到( x2,y2) 为止
* 并且以给定的半径 radius 穿过( x1,y1)
*/
arcTo( x1, y1, x2, y2, radius)
```

```js
/**
* 从上一点开始绘制一条曲线
* 
* 从上一点开始绘制一条曲线，到( x,y) 为止
* 并且以( c1x,c1y) 和( c2x,c2y) 为控制点
*/

bezierCurveTo( c1x, c1y, c2x, c2y, x, y)
```

##### 绘制直线

```js
/**
* 从上一点开始绘制一条直线，到( x,y) 为止。
*/

 lineTo( x, y)
```

```js
/**
* 将绘图游标移动到( x,y) ，不画线。
*/

moveTo( x, y)
```

##### 绘制二次曲线

```js
/**
* 从上一点开始绘制一条二次曲线
* 
* 从上一点开始绘制一条二次曲线，到( x,y) 为止
* 并且以( cx,cy) 作为控制点。
*/

quadraticCurveTo( cx, cy, x, y)
```

##### 绘制矩形

```js
/**
* 从点( x,y) 开始绘制一个矩形
* 
* 从点( x,y) 开始绘制一个矩形，宽度和高度分别由 width 和 height 指定。
* 这个方法绘制的是矩形路径，而不是 strokeRect() 和 fillRect() 所绘制的独立的形状。
*/

 rect( x, y, width, height)
```

#### 填充路径

1. 创建了路径后，接下来有几种可能的选择。
2. 如果想绘制一条连接到路径起点的线条，可以调用 `closePath()` 。
3. 如果路径已经完成，你想用 `fillStyle` 填充它，可以调用 `fill()` 方法。
4. 另外，还可以调用 `stroke()` 方法对路径描边，描边使用的是 `strokeStyle`。
5. 最后还可以调用 `clip()` ，这个方法可以在路径上创建一个剪切区域。

```js 绘制一个不带数字的时钟表盘
var drawing = document.getElementById('drawing');

// 确定浏览器是否支持 canvas 元素
if (drawing.getContext) {

    // 取得 2D 上下文
    var context = drawing.getContext('2d');

    // 绘制外圆
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);

    // 绘制内圆
    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);

    // 绘制分针
    context.moveTo(100, 100);
    context.lineTo(100, 15);

    // 绘制时针
    context.moveTo(100, 100);
    context.lineTo(35, 100);

    // 描边路径
    context.stroke();
}
```

<img src="4.jpg" title="一个不带数字的时钟表盘">

##### `isPointInPath()`
由于路径的使用很频繁，所以就有了一个名为 `isPointInPath()`的方法。
这个方法接收 x 和 y 坐标作为参数，用于在路径被关闭之前确定画布上的某一点是否位于路径上，例如：

```js
if (context.isPointInPath(100, 100)){
 alert("Point (100, 100) is in the path.");
}
```

### 绘制文本

绘制文本主要有两个方法：` fillText()` 和 `strokeText()`

这两个方法都可以接收 4 个参数：

1. 要绘制的文本字符串
2. x 坐标
3. y 坐标
4. 可选的最大像素宽度

**而且，这两个方法都以下列 3 个属性为基础。**

1. **font**：表示文本样式、大小及字体，用 CSS 中指定字体的格式来指定，例如`"10px Arial"` 。
2. **textAlign**：表示文本对齐方式。可能的值有`"start" 、 "end" 、 "left" 、 "right" 和"center"`。`建议使用"start" 和"end"` 。
3. **textBaseline**：表示文本的基线。 可能的值有`"top" 、"hanging" 、"middle" 、"alphabetic" 、"ideographic" 和"bottom"` 。

这几个属性都有默认值，因此没有必要每次使用它们都重新设置一遍值。 

`fillText()` 方法使用 `fillStyle` 属性绘制文本；
而 `strokeText()` 方法使用 `strokeStyle` 属性为文本描边。
相对来说，还是使用 `fillText()` 的时候更多，因为该方法模仿了在网页中正常显示文本。

```js
context.font = 'bold 14px Arial';
context.textAlign = 'center';
context.textBaseline = 'middle';
context.fillText('12', 100, 20);
```

<img src="5.jpg">

### 变换

通过上下文的变换，可以把处理后的图像绘制到画布上。

2D 绘制上下文支持各种基本的绘制变换。

1. **`rotate( angle)`** ：围绕原点旋转图像 angle 弧度。
2. **`scale( scaleX, scaleY)`** ：缩放图像，在 x 方向乘以 scaleX，在 y 方向乘以 scaleY。 scaleX 和 scaleY 的默认值都是 1.0。
3. **`translate(x, y)`** ：将坐标原点移动到 `(x,y)` 。执行这个变换之后， 坐标`(0,0)`会变成之前由`(x,y)`表示的点。
4. **`transform( m1_1, m1_2, m2_1, m2_2, dx, dy)`** ：直接修改变换矩阵，方式是乘以如下
矩阵。
m1_1 m1_2  dx
m2_1 m2_2  dy
0    0     1
5. **`setTransform( m1_1, m1_2, m2_1, m2_2, dx, dy)`** ：将变换矩阵重置为默认状态，然后
再调用 `transform()` 。

就拿前面例子中绘制表针来说，如果把原点变换到表盘的中心，然后再绘制表针就容易多了。

```js
var drawing = document.getElementById('drawing');

// 确定浏览器是否支持 canvas 元素
if (drawing.getContext) {

    // 取得 2D 上下文
    var context = drawing.getContext('2d');

    // 绘制外圆
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);

    // 绘制内圆
    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);

    // 变换原点
    context.translate(100, 100);

    // 绘制分针
    context.moveTo(0, 0);
    context.lineTo(0, -85);

    // 绘制时针
    context.moveTo(0, 0);
    context.lineTo(-65, 0);

    // 描边路径
    context.stroke();
}
```

# 从线条开始

## 画一条线条

有了上面那些基础之后，我们可以来着手开始利用 Canvas 绘画了，首先，我们从画一条直线开始。

<iframe style="width: 100%; height: 300px" src="http://sandbox.runjs.cn/show/eg1ldduu" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<script type="text/javascript" src="http://runjs.cn/gist/eg1ldduu"></script>

## 线条组成的图形

### 画一个箭头

<iframe style="width: 100%; height: 300px" src="http://sandbox.runjs.cn/show/dai5dusk" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<script type="text/javascript" src="http://runjs.cn/gist/dai5dusk"></script>

### 画三条折线

每次开始描绘一条折线的路径时，首先用 `moveTo()` 设置绘图游标。

<iframe style="width: 100%; height: 300px" src="http://sandbox.runjs.cn/show/7stfnsfe" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<script type="text/javascript" src="http://runjs.cn/gist/7stfnsfe"></script>

### 画三条不同颜色的折线

`beginPath()` 表示要开始一段全新的绘制，从这里开始就会使用新制定的状态来进行绘制，如果没有指定新的状态，就用之前指定的状态或者默认状态。

<iframe style="width: 100%; height: 300px" src="http://sandbox.runjs.cn/show/2jduiisg" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<script type="text/javascript" src="http://runjs.cn/gist/2jduiisg"></script>

### 画一个封闭的多边形

`closePath()` 表示当前的路径要被封闭，同时也结束。

`fillStyle` & `fill()`

绘制了一个封闭的图形，就可以使用 `fill()` 来进行填充。

要先填充，再描边，不然边框会被填充的内容覆盖掉一半。

<iframe style="width: 100%; height: 300px" src="http://sandbox.runjs.cn/show/fj6avq5j" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<script type="text/javascript" src="http://runjs.cn/gist/fj6avq5j"></script>

# 图形变换

## 状态保存和恢复

**`save()`**

保存当前的图形状态，如果当前状态没被设置过，保存的就是什么都没被设置过的状态

**`restore()`**

恢复上次保存的图形状态

# 待更 ...

















