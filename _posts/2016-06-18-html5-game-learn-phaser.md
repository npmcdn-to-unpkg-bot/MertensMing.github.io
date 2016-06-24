---
title: Phaser 学习笔记
date: 2016-06-18 11:32:24
categories: Game
tags: [游戏, HTML5]
---
# 显示对象

## 概述

显示对象， 顾名思义就是能在舞台上显示的对象，也就是我们能在游戏中看到的东西。对于Phaser来说，显示对象就是需要在画布中渲染出来的对象。

### 显示对象的种类

图片、图形、按钮、文字、精灵、瓦片精灵、瓦片地图、粒子

### 显示对象列表

### Phaser 的运行机制

## 游戏工厂对象(GameObjectFactory)

`GameObjectFactory` 可以帮助我们快速的创建显示对象以及一些重要的非显示对象（声音）

### 使用 GameObjectFactory

添加一个图片对象到游戏中的两种方法 

#### 不使用游戏工厂对象

```js
var game = new Phaser.Game();
var image = new Phaser.Image(game, 0, 0, 'cat');
game.wrold.add(image);
```

当不使用工厂对象来创建显示对象时，需要先实例化那个显示对象，然后再手动添加到游戏中，非常麻烦

#### 使用游戏工厂对象

```js
var game = new Phaser.Game();
game.add.image(game, 0, 0, 'cat');
```

使用工厂对象来创建显示对象更简单，并且会自动把显示对象添加到游戏当中

### 图片

```html
game.add.image(x, y, key, frame, group)
```

<img src="1.jpg">

```js
var game = new Phaser.Game(400, 500, Phaser.AUTO, 'container', state);
function state (game) {
    this.preload = function () {
        game.load.image('cat', 'assets/cat.png');
    }
    this.create = function () {
        game.add.image(100, 100, 'cat');
    }
}
```

```js
var game = new Phaser.Game(400, 500, Phaser.AUTO, 'container', state);
function state (game) {
    this.preload = function () {
        game.load.spritesheet('sprite', 'assets/spite.png', 150, 162);
    }
    this.create = function () {
        game.add.image(0, 0, 'sprite', 0);
        game.add.image(200, 50, 'sprite', 1);
        game.add.image(0, 200, 'sprite', 2);
        game.add.image(200, 250, 'sprite', 3);
    }
}
```

### 图形

图形对象相当于一个画板，可以在画板上绘制多个图形

```html
game.add.graphics(x, y, group)
```

<img src="2.jpg">

```js
var graphics = game.add.graphics(0, 0);
graphics.drawRect(); // 矩形
graphics.drawRoundedRect(); // 圆角矩形
graphics.drawCircle(); // 圆形
graphics.drawEllipse(); // 椭圆形
graphics.arc(); // 弧形
graphics.drawPloygon(); // 多边形
graphics.moveTo();
graphics.lineTo(); // 直线
graphics.bezierCurveTo(); // 曲线
```

#### 图形填充

填充指定的颜色和透明度

```js 
graphics.beginFill(color, alpha);
```

<img src="3.jpg">

<img src="4.jpg" title="图形填充的实例">

#### 图形描边

```js
graphics.lineStyle(lineWidth, color, alpha)
```

<img src="5.jpg">

<img src="6.jpg" title="图形描边的示例">

#### 直线线条

```js
graphics.moveTo(x, y); // 指定起点
graphics.lineTo(x, y); // 指定终点，同时把这个终点作为下一个线条的起点
```

<img src="7.jpg">

#### 曲线线条

指定起点和终点，还有中间两个控制点，就可以确定一条曲线

<img src="8.jpg">

#### 清除图形

清除在这个图形对象上绘制的所有图形，并且重置填充和描边的样式

<img src="9.jpg">

### 按钮对象

```js
game.add.button();
```

<img src="10.jpg">

上面四个状态不是必须的，如果没有指定每个状态的图片，那么它每个状态的都是一个模样

<img src="11.jpg" title="按钮对象使用示例">

### 精灵

```js
game.add.sprite(x, y, key, frame, group)
```

<img src="12.jpg">

#### 图片对象和精灵对象的区别

<img src="13.jpg">

#### 精灵对象常用的属性

##### 位置

给显示对象设定的位置都是相对于自己的父元素的

<img src="14.jpg" title="Phaser中的坐标系统">

###### 设置位置坐标的方法

```js
// 1.创建时设定
var sprite = game.add.sprite(100, 100, 'cat');

// 2. 使用 x 和 y 属性来设定
sprite.x = 100;
sprite.y = 100;

// 3. 使用 position 来设定
sprite.position.x = 100;
sprite.position.y = 100;

/*
* position 属性是一个 Phaser.Point 对象，可以使用 set 方法来指定 x 和 y
*/
sprite.position.set(100, 100);
```

##### 锚点的设置

```js
var sprite = game.add.sprite(100, 100, 'cat');

sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

sprite.anchor.set(0.5, 0.5);
/*
* 锚点的取值范围是 0 - 1
* x 为 0 时，为显示对象的左边界
* y 为 0 时，为显示对象的上边界
*/
```

#### 遮罩

```js
this.preload = function () {
    game.load.image('bg', 'assets/bg.jpg');
};
this.create = function () {
    var bg = game.add.image(0, 0, 'bg'); // 背景图
    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xFFFFFF); // 必须要填充一个颜色
    var circle = graphics.drawCircle(150, 250, 200); // 画一个圆
    // 透过这个圆，才能看到显示对象，其余的部分都被遮盖住了
    bg.mask = circle; // 把圆作为遮罩
}
```

#### tileSprite

> Textures will automatically wrap and are designed so that you can create game backdrops using seamless textures as a source.

`tileSprite` 是用来制作背景的，[详情请查看文档](http://phaser.io/docs/2.4.4/Phaser.TileSprite.html)

```js
game.add.tileSprite(x, y, width, height, key, frame, group)
```

因为 `tileSprite` 是平铺的，所以就相当于是一张无限大的背景图，这张背景图也可以滚动。

```js
this.preload = function () {
    game.load.image('tile', 'assets/tile.png');
};
this.create = function () {
    var tileSprite = game.add.tileSprite(0, 0, game.width, game.height, 'tile')
    tileSprite.autoScroll(-20, 0); // 每秒20像素向左滚动
    tileSprite.stopScroll(); // 停止滚动
};
```

### 文字

```js
game.add.text(x, y, text, style, group)
```

[Text 说明文档](http://phaser.io/docs/2.5.0/Phaser.Text.html)

### 组

[Group 说明文档](http://phaser.io/docs/2.4.4/Phaser.Group.html)

`Phaser.Group` 组是一个虚拟的、无形的显示对象容器，用来把多个显示对象组合在一起使之形成一个整体。同时，组又可以作为其他显示对象或组的子元素。`Phaser.World` 世界对象是显示对象列表中最顶层的一个组。

#### 组的作用

1.组合多个显示对象，便于整体操作
2.提供多种便捷方法对组内元素进行管理
3.为显示对象的回收利用机制提供支持

#### 给组添加子元素的方法

1.创建图片或精灵等显示对象时指定组
2.`group.add()` 方法直接添加
3.`group.create()` 方法创建子元素并且添加进组

### 动画 Animation

#### 过渡动画 tween

```js
game.add.tween(object)
```

[Tween 说明文档](http://phaser.io/docs/2.4.4/Phaser.Tween.html)




