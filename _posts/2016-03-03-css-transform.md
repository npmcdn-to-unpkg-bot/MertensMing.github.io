---
title: CSS 变形 - transform
date: 2016-03-03 14:47:52
categories: CSS
tags: CSS
---
通过一些方法可以将盒子进行旋转、缩放、移动等等。

## transform

``` transform 语法
transform : none | <transform-function>+
```

```html
transform: none
transform: <transform-function>+
<!-- 可以写一个或多个方法 -->
```

```html
    transform: translate(50%) rotate(45deg);
```

<!-- more -->

<img src="15.jpg" alt="">

如果先做 rotate，再做 translate，那结果就不一样了,因为坐标的方向已经变化了，所以移动的方向也会跟着变化。

```html
    transform: rotate(45deg) translate(50%);
```

<img src="16.jpg" alt="">

### rotate() 旋转

#### 语法

```html
rotate(<angle>)
```

#### 使用示例

```html
transform: rotate(45deg);
/*顺时针旋转45°*/
```

<img src="1.jpg" alt="">

```css
transform: rotate(-60deg);
/*逆时针旋转-60°*/
```

<img src="2.jpg" alt="">

### translate() 移动

#### 语法

```html
translate(<translation-value> [,<translation-value>]?)
/*两个参数分别表示向 x 和 y 轴移动*/
```

```html
translateX(<translation-value>)
translateY(<translation-value>)
```

#### 使用示例

```html
transform:translate(50px);
/*向右偏移 50 px*/
```

<img src="3.jpg" alt="">

```html
    transform: translate(50px,20%);
    /*向右偏移 50px*/
    /*向下偏移当前元素高度的20%*/
```

<img src="4.jpg" alt="">

```html
    transform: translateX(-50px);
    /*向左偏移 50px*/
```

<img src="5.jpg" alt="">

```html
    transform: translateY(20%);
    /*向下偏移自身高度的20%*/
```

<img src="6.jpg" alt="">

### scale() 缩放

#### 语法

```html
scale(<number> [,<number>]?)
<!-- 如果第二个值不写，就默认等于第一个值 -->
scaleX(<number>)
scaleY(<number>)
```

#### 使用示例

```html
   transform: scale(1.2); 
   /*整体变成了 1.2 倍*/
```

<img src="7.jpg" alt="">

```html
   transform: scale(1,1.2); 
   /*x轴变成1倍，y轴变成1.2倍*/
```

<img src="8.jpg" alt="">

```html
   transform: scaleX(1.2); 
   /*x轴变成1.2倍*/
```

<img src="9.jpg" alt="">

```html
   transform: scaleY(1.2); 
   /*y轴变成1.2倍*/
```

<img src="10.jpg" alt="">

### skew() 倾斜

#### 语法

```html
skew(<angle> [,<angle>]?)  
<!-- 第一个值：Y 轴向 X 轴方向偏移多少度-->
<!-- 第二个值：X 轴往 y 轴方向倾斜多少度-->
skewX(<angle>)
skewY(<angle>)
```

#### 使用示例

```html
    transform: skew(30deg);
```

<img src="11.jpg" alt="">

```html
    transform: skew(30deg, 30deg);
```

<img src="12.jpg" alt="">

```html
    transform: skewX(30deg);
```

<img src="13.jpg" alt="">

```html
    transform: skewY(30deg);
```

<img src="14.jpg" alt="">



## transform-origin

<img src="18.jpg" alt="">

我们之前讲到的旋转，总是围绕着元素的中心点旋转，那有没有可能围绕着其他地方旋转呢？

那就要用到 `transform-origin` 方法，设置坐标轴的轴心，原点的位置

### 语法

<img src="17.jpg" alt="">

#### 上面有三条语法：

第一条语法： `写一个值`，可以是`一个关键字`，`一个百分比`，也可以是`一个长度值`

第二条语法： `写三个值`，第一个值表示 x 方向，第二个值表示 y 方向，第三个值可写可不写，表示 x 方向

第三条语法：只使用`关键字` + `长度值`

### 使用示例

```html
    transform-origin: 50% 50%;
    /*默认值*/
```

<img src="19.jpg" alt="">

```html
    transform-origin: 0 0;
    /*最左上角*/
```

<img src="20.jpg" alt="">

```html
    transform-origin: 20%;
    /*只写第一个值，第二个值就是 50%*/

    transform-origin: right 50px 20px;  
     /*移动到了x轴的最右边，沿着y轴移动50px，往z轴正方向移动20px*/

    transform-origin: right 50px 20px;  
    /*移动到了y轴的最顶部，沿着x轴移动到最右边，往z轴正方向移动20px*/
```

## perspective 透视效果

```html
perspective: none | <length>
```


```html
<style>
    .demo {
        transform: rotateX(45deg);
    }    
</style>
```

<img src="21.jpg" alt="">

`2000px` 表示人眼到这个物体的距离，人眼离物体更近的话，透视效果就会更加明显。

### perspective-origin 不同的透视角度

<img src="22.jpg" alt="">

#### 语法

1. 可以只写一个值
2. 可以只写两个值
3. 可以写两个关键字

#### 使用示例

<img src="23.jpg" alt="">

## 3d 方法

### translate3d() 3d 移动

#### 语法

```html
translate3d(<translate-value>, <translate-value>, <length>)
translateX(<translate-value>)
translateY(<translate-value>)
translateZ(<length>) 靠近观察者或者远离观察者
```

<img src="23.jpg" alt="">

<img src="24.jpg" alt="">

### scale3d() 3d缩放

<img src="25.jpg" alt="">

scaleZ() 方法只有在和其他方法连用时，才会对元素显示造成影响

### rotate3d() 3d旋转

<img src="26.jpg" alt="">

## transform-style

<img src="27.jpg" alt="">

## backface-visibility 背面是否可见

<img src="28.jpg" alt="">



























