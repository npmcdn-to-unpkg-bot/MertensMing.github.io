---
title: SASS 学习笔记
date: 2016-05-03; 22:46:47
categories: CSS
tags: [SASS, CSS预处理器]
---
**学习资料：**
[Sass入门篇](http://www.imooc.com/learn/311)

# 关于 SASS 的一些概念

## 什么是 CSS 预处理器？

> 通俗的说，“CSS 预处理器用一种专门的编程语言，进行 Web 页面样式设计，然后再编译成正常的 CSS 文件，以供项目使用。CSS 预处理器为 CSS 增加一些编程的特性，无需考虑浏览器的兼容性问题”

## 什么是 Sass？

`Sass 官网`上是这样描述 `Sass` 的：

> Sass 是一门高于 CSS 的元语言，它能用来`清晰地、结构化地描述文件样式`，有着比普通 CSS 更加强大的功能。
Sass 能够提供更简洁、更优雅的语法，同时提供多种功能来创建可维护和管理的样式表。

## Sass 和 Scss 有什么区别？

`Sass` 和 `Scss` 其实是同一种东西，我们平时都称之为 Sass，两者之间不同之处有以下两点：

1. 文件扩展名不同，Sass 是以“`.sass`”后缀为扩展名，而 Scss 是以“`.scss`”后缀为扩展名
2. 语法书写方式不同，`Sass` 是以`严格的缩进式语法规则`来书写，`不带大括号({})`和`分号(;)`，而 `SCSS 的语法书写`和我们的 `CSS 语法书写方式非常类似`。

<!-- more -->

Sass 语法

```css
$font-stack: Helvetica, sans-serif  //定义变量
$primary-color: #333 //定义变量

body
  font: 100% $font-stack
  color: $primary-color
```

SCSS 语法

```css
$font-stack: Helvetica, ;sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

编译出来的 CSS

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

## Sass/Scss 和纯 CSS 写法差很多吗？

### Sass 和 CSS 写法有差别：

Sass 和 CSS 写法的确存在一定的差异，由于 Sass 是基于 Ruby 写出来，所以其延续了 Ruby 的书写规范。

在书写 Sass 时不带有大括号和分号，其主要是**`依靠严格的缩进方式`**来控制的。如：

### Scss 和 CSS 写法无差别：

SCSS 和 CSS 写法无差别，这也是 Sass 后来越来越受大众喜欢原因之一。

**简单点说，把你现有的“.css”文件直接修改成“.scss”即可使用。**

# Sass 安装环境

## Sass 安装（windows）

我是直接通过 Git 命令行安装的，通过下面几个命令，Sass 就安装成功了。

```html
git clone git://github.com/nex3/sass.git
cd sass
rake install
```

## Sass 编译

### 命令行编译

单文件转换命令

```html 
sass style.scss style.css
```

单文件监听命令

```html 
sass --watch style.scss:style.css
```

文件夹监听命令

```html 
sass --watch sassFileDirectory:cssFileDirectory
```

css文件转成sass/scss文件

```html 
sass-convert style.css style.sass   
sass-convert style.css style.scss
```

### 命令行其他配置选项

运行命令行帮助文档，可以获得所有的配置选项

```html 
sass -h
```

我们一般常用的有`--style`，`--sourcemap`，`--debug-info`等。

```html 
sass --watch style.scss:style.css --style compact
sass --watch style.scss:style.css --sourcemap
sass --watch style.scss:style.css --style expanded --sourcemap
sass --watch style.scss:style.css --debug-info
```

`--style`表示`解析后的css是什么格式`，有四种取值分别为：`nested`，`expanded`，`compact`，`compressed`。

`--sourcemap`表示开启`sourcemap`调试。开启`sourcemap`调试后，`会生成一个后缀名为.css.map`文件。

`--debug-info`表示开启`debug`信息，升级到`3.3.0之后因为sourcemap更高级`，这个`debug-info就不太用了`

#### 四种style生成后的css

```scss
/* nested */
#main {
  color: #fff;
  background-color: #000; }
  #main p {
    width: 10em; }

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline; }

/*expanded*/
#main {
  color: #fff;
  background-color: #000;
}
#main p {
  width: 10em;
}

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline;
}

/*compact*/
#main { color: #fff; background-color: #000; }
#main p { width: 10em; }

.huge { font-size: 10em; font-weight: bold; text-decoration: underline; }

/*compressed*/
#main{color:#fff;background-color:#000}#main p{width:10em}.huge{font-size:10em;font-weight:bold;text-decoration:underline}
```

# Sass 基础

## 声明变量

Sass 的变量包括三个部分：

1. 声明变量的符号“$”
2. 变量名称
3. 赋予变量的值

<img src="1.jpg">

```scss
$brand-primary : darken(#428bca, 6.5%) !default; // #337ab7
$btn-primary-color : #fff !default;
$btn-primary-bg : $brand-primary !default;
$btn-primary-border : darken($btn-primary-bg, 5%) !default;
```

如果值后面加上`!default`则表示默认值。

## 默认变量

sass 的默认变量仅需要在值后面加上 `!default` 即可。

```scss
$baseLineHeight:1.5 !default;
body{
    line-height: $baseLineHeight; 
}
```

编译后的css代码：

```css
body{
    line-height:1.5;
}
```

**sass 的默认变量一般是用来设置默认值**，然后`根据需求来覆盖`的，覆盖的方式也很简单，只需要在默认变量之前重新声明下变量即可。

```scss
$baseLineHeight: 2;
$baseLineHeight: 1.5 !default;
body{
    line-height: $baseLineHeight; 
}
```

编译后的css代码：

```scss
body{
    line-height:2;
}
```

默认变量的价值在进行**组件化开发的时候会非常有用**。

## 局部变量和全局变量

从 `3.4 版本`开始，Sass 已经可以正确处理`作用域`的概念，并通过创建一个新的局部变量来代替。

```scss
//SCSS
$color: orange !default;//定义全局变量(在选择器、函数、混合宏...的外面定义的变量为全局变量)
.block {
  color: $color;//调用全局变量
}
em {
  $color: red;//定义局部变量
  a {
    color: $color;//调用局部变量
  }
}
span {
  color: $color;//调用全局变量
}
```

## 嵌套

Sass 中还提供了选择器嵌套功能，但这也并不意味着你在 Sass 中的嵌套是无节制的，因为你嵌套的层级越深，编译出来的 CSS 代码的选择器层级将越深。

选择器嵌套为样式表的作者提供了一个通过局部选择器相互嵌套实现全局选择的方法，Sass 的嵌套分为三种：

1. 选择器嵌套
2. 属性嵌套
3. 伪类嵌套

### 选择器嵌套 

假设我们有一段这样的结构：

```html 
<header>
    <nav>
        <a href=“##”>Home</a>
        <a href=“##”>About</a>
        <a href=“##”>Blog</a>
    </nav>
<header>
```

想选中 `header` 中的 a 标签，在写 CSS 会这样写：

```css
nav a {
  color:red;
}

header nav a {
  color:green;
}
```

那么在 Sass 中，就可以使用选择器的嵌套来实现：

```scss
nav {
  a {
    color: red;

    header & {
      color:green;
    }
  }  
}
```

### 属性嵌套

CSS 有一些属性前缀相同，只是后缀不一样，比如：`border-top/border-right`，与这个类似的还有 `margin、padding、font`等属性。假设你的样式中用到了：

```css
.box {
    border-top: 1px solid red;
    border-bottom: 1px solid green;
}
```

在 Sass 中我们可以这样写：

```scss
.box {
  border: {
   top: 1px solid red;
   bottom: 1px solid green;
  }
}
```

### 伪类嵌套

其实伪类嵌套和属性嵌套非常类似，只不过他需要借助`&`符号一起配合使用。我们就拿经典的“clearfix”为例吧：

```scss
.clearfix{
    &:before,
    &:after {
        content:"";
        display: table;
    }
    &:after {
        clear:both;
        overflow: hidden;
    }
}
```

编译出来的 CSS：

```scss
clearfix:before, .clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  overflow: hidden;
}
```

### 避免选择器嵌套

1. 选择器嵌套最大的问题是将使最终的代码难以阅读。开发者需要花费巨大精力计算不同缩进级别下的选择器具体的表现效果。
2. 选择器越具体则声明语句越冗长，而且对最近选择器的引用(&)也越频繁。在某些时候，出现混淆选择器路径和探索下一级选择器的错误率很高，这非常不值得。

## 混合宏

当样式变得越来越复杂，需要重复使用大段的样式时，使用变量就无法达到我们目了。

这个时候 Sass 中的`混合宏`就会变得非常有意义。

### 声明混合宏

#### 不带参数混合宏

在 Sass 中，使用`“@mixin”`来声明一个混合宏。如：

```scss
@mixin border-radius{
    border-radius: 5px;
}
```

其中 `@mixin` 是用来声明混合宏的关键词，有点类似 CSS 中的 `@media`、`@font-face` 一样。

`border-radius` 是混合宏的名称。

`大括号`里面是复用的样式代码。

#### 带参数混合宏

除了声明一个不带参数的混合宏之外，还可以在`定义混合宏时带有参数`，如：

```scss
@mixin border-radius($radius:5px){
    border-radius: $radius;
}
```

#### 复杂的混合宏

```scss
@mixin box-shadow($shadow...)
{
    @if length($shadow) >= 1
    {
        @include prefixer(box-shadow, $shadow);
    } @else
    {
        $shadow: 0 0 4px rgba(0,0,0,.3);
        @include prefixer(box-shadow, $shadow);
    }
}
// 简单的解释一下，当 $shadow 的参数数量值大于或等于“ 1 ”时，表示有多个阴影值，反之调用默认的参数值“ 0 0 4px rgba(0,0,0,.3) ”。
```

### 调用混合宏

在 Sass 中通过 `@mixin` 关键词声明了一个混合宏，那么在实际调用中，其匹配了一个关键词“`@include`”来调用声明好的混合宏。

例如在你的样式中定义了一个圆角的混合宏“`border-radius`”:

```scss
@mixin border-radius{
    border-radius: 3px;
}
```

在一个按钮中要调用定义好的混合宏“`border-radius`”，可以这样使用：

```scss
button {
    @include border-radius;
}
```

这个时候编译出来的 CSS:

```scss
button {
  border-radius: 3px;
}
```

### 混合宏的参数

Sass 的混合宏有一个强大的功能，可以传参，那么在 `Sass` 中传参主要有以下几种情形：

#### 传一个不带值的参数

在混合宏中，可以传一个不带任何值的参数，比如：

```scss
@mixin border-radius($radius){
  border-radius: $radius;
}
```

在混合宏“`border-radius`”中定义了一个不带任何值的参数“`$radius`”。

在调用的时候可以给这个混合宏传一个**参数值**：

```scss
.box {
  @include border-radius(3px);
}
```

这里表示给混合宏传递了一个`“border-radius”`的值为`“3px”`。

编译出来的 CSS:

```scss
.box {
  border-radius: 3px;
}
```

#### 传一个带值的参数

在 Sass 的混合宏中，还可以`给混合宏的参数传一个默认值`，例如：

```scss
@mixin border-radius($radius:3px){
  border-radius: $radius;
}
```

在混合宏“border-radius”传了一个参数“$radius”，而且给这个参数赋予了一个默认值“3px”。

在调用类似这样的混合宏时，会多有一个机会，假设你的页面中的圆角很多地方都是“3px”的圆角，那么这个时候只需要调用默认的混合宏“border-radius”:

```scss
.btn {
  @include border-radius;
}
```

编译出来的 CSS:

```scss
.btn {
  border-radius: 3px;
}
```

但有的时候，页面中有些元素的圆角值不一样，那么可以随机给混合宏传值，如：

```scss
.box {
  @include border-radius(50%);
}
```

编译出来的 CSS:

```scss
.box {
  border-radius: 50%;
}
```

#### 传多个参数

Sass 混合宏除了能传一个参数之外，还可以**传多个参数**，如：

```scss
@mixin center($width,$height){
  width: $width;
  height: $height;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -($height) / 2;
  margin-left: -($width) / 2;
}
```

在混合宏“`center`”就传了多个参数。在实际调用和其调用其他混合宏是一样的：

```scss
.box-center {
  @include center(500px,300px);
}
```

#### 特别的参数 `...`

有一个特别的参数`“…”`。当混合宏传的参数过多之时，可以使用参数来替代，如：

```scss
@mixin box-shadow($shadows...){
  @if length($shadows) >= 1 {
    -webkit-box-shadow: $shadows;
    box-shadow: $shadows;
  } @else {
    $shadows: 0 0 2px rgba(#000,.25);
    -webkit-box-shadow: $shadow;
    box-shadow: $shadow;
  }
}
```

在实际调用中：

```scss
.box {
  @include box-shadow(0 0 1px rgba(#000,.5), 0 0 2px rgba(#000,.2));
}
```

编译出来的CSS:

```scss
.box {
  -webkit-box-shadow: 0 0 1px rgba(0, 0, 0, 0.5), 0 0 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5), 0 0 2px rgba(0, 0, 0, 0.2);
}
```

### 混合宏的不足

混合宏在实际编码中给我们带来很多方便之处，特别是对于复用重复代码块。

但其最大的不足之处是会 **生成冗余的代码块**。比如在不同的地方调用一个相同的混合宏时。

## 扩展/继承 @extend

在 Sass 中也具有继承一说，也是继承类中的样式代码块。

在 Sass 中是通过关键词 `“@extend”`来继承已存在的类样式块，从而实现代码的继承。如下所示：

```scss
//SCSS
.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}

.btn-second {
  background-color: orange;
  color: #fff;
  @extend .btn;
}
```

编译出来之后：

```scss
//CSS
.btn, .btn-primary, .btn-second {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
}

.btn-second {
  background-clor: orange;
  color: #fff;
}
```

从示例代码可以看出，在 Sass 中的继承，可以继承类样式块中所有样式代码，而且编译出来的 CSS 会将选择器合并在一起，形成组合选择器：

```scss
.btn, .btn-primary, .btn-second {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}
```

## 占位符 %placeholder

Sass 中的占位符 `%placeholder` 功能是一个很强大，很实用的一个功能。

%placeholder 声明的代码，如果不被 `@extend` 调用的话，不会产生任何代码。

来看一个演示：

```scss
%mt5 {
  margin-top: 5px;
}
%pt5{
  padding-top: 5px;
}
```

这段代码没有被 @extend 调用，他并没有产生任何代码块，只是静静的躺在你的某个 SCSS 文件中。

只有通过 @extend 调用才会产生代码：


```scss
//SCSS
%mt5 {
  margin-top: 5px;
}
%pt5{
  padding-top: 5px;
}

.btn {
  @extend %mt5;
  @extend %pt5;
}

.block {
  @extend %mt5;

  span {
    @extend %pt5;
  }
}
```

编译出来的CSS

```scss
//CSS
.btn, .block {
  margin-top: 5px;
}

.btn, .block span {
  padding-top: 5px;
}
```

从编译出来的 CSS 代码可以看出，通过 `@extend` 调用的占位符，编译出来的代码会将相同的代码合并在一起。

这也是我们希望看到的效果，也让你的代码变得更为干净。

## 混合宏 VS 继承 VS 占位符

<img src="2.jpg">

## 插值#{}

```scss
$properties: (margin, padding);
@mixin set-value($side, $value) {
    @each $prop in $properties {
        #{$prop}-#{$side}: $value;
    }
}
.login-box {
    @include set-value(top, 14px);
}
```

它可以让变量和属性工作的很完美，上面的代码编译成 CSS：

```scss
.login-box {
    margin-top: 14px;
    padding-top: 14px;
}
```

这是 Sass 插值中一个简单的实例。当你想设置属性值的时候你可以使用字符串插入进来。

另一个有用的用法是构建一个选择器。

可以这样使用：

```scss
@mixin generate-sizes($class, $small, $medium, $big) {
    .#{$class}-small { font-size: $small; }
    .#{$class}-medium { font-size: $medium; }
    .#{$class}-big { font-size: $big; }
}
@include generate-sizes("header-text", 12px, 20px, 40px);
```

编译出来的 CSS:

```scss
.header-text-small { font-size: 12px; }
.header-text-medium { font-size: 20px; }
.header-text-big { font-size: 40px; }
```

一旦你发现这一点，你就会想到超级酷的 mixins，用来生成代码或者生成另一个 mixins。

然而，这并不完全是可能的。

第一个限制，这可能会很删除用于 Sass 变量的插值。

```scss
$margin-big: 40px;
$margin-medium: 20px;
$margin-small: 12px;
@mixin set-value($size) {
    margin-top: $margin-#{$size};
}
.login-box {
    @include set-value(big);
}
```

上面的 Sass 代码编译出来，你会得到下面的信息：

```html
error style.scss (Line 5: Undefined variable: “$margin-".)
```

所以，`#{}`语法并不是随处可用，你也不能在 mixin 中调用：

```scss
@mixin updated-status {
    margin-top: 20px;
    background: #F00;
}
$flag: "status";
.navigation {
    @include updated-#{$flag};
}
```

上面的代码在编译成 CSS 时同样会报错：

```html
error style.scss (Line 7: Invalid CSS after "...nclude updated-": expected "}", was "#{$flag};")
```

幸运的是，可以使用 `@extend` 中使用插值。

例如：

```scss
%updated-status {
    margin-top: 20px;
    background: #F00;
}
.selected-status {
    font-weight: bold;
}
$flag: "status";
.navigation {
    @extend %updated-#{$flag};
    @extend .selected-#{$flag};
}
```

上面的 Sass 代码是可以运行的，因为他给了我们力量，可以动态的插入 `.class` 和 `%placeholder`。

当然他们不能接受像 `mixin` 这样的参数，上面的代码编译出来的 CSS:

```scss
.navigation {
    margin-top: 20px;
    background: #F00;
}
.selected-status, .navigation {
    font-weight: bold;
}
```

## 注释

1. 类似 CSS 的注释方式，使用 ”`/* `”开头，结属使用 ”`*/ `”
2. 类似 JavaScript 的注释方式，使用“`//`

两者区别，前者会在编译出来的 CSS 显示，后者在编译出来的 CSS 中不会显示，来看一个示例：

```scss
//定义一个占位符

%mt5 {
  margin-top: 5px;
}

/*调用一个占位符*/

.box {
  @extend %mt5;
}
```

编译出来的CSS

```scss
.box {
  margin-top: 5px;
}

/*调用一个占位符*/
```

## 数据类型

Sass 和 JavaScript 语言类似，也具有自己的数据类型，在 Sass 中包含以下几种数据类型：

- `数字`: 如，1、 2、 13、 10px；
- `字符串`：有引号字符串或无引号字符串，如，"foo"、 'bar'、 baz；
- `颜色`：如，blue、 #04a3f9、 rgba(255,0,0,0.5)；
- `布尔型`：如，true、 false；
- `空值`：如，null；
- `值列表`：用空格或者逗号分开，如，1.5em 1em 0 2em 、 Helvetica, Arial, sans-serif。

SassScript 也支持其他 CSS 属性值（property value），比如 Unicode 范围，或 !important 声明。

然而，Sass 不会特殊对待这些属性值，一律视为`无引号字符串 (unquoted strings)`。

## 字符串

SassScript 支持 CSS 的`两种字符串类型`：

**`有引号字符串 (quoted strings)`**，如 "Lucida Grande" 、'http://sass-lang.com'；

**`无引号字符串 (unquoted strings)`**，如 sans-serifbold。

在编译 CSS 文件时不会改变其类型。

只有一种情况例外，使用 `#{ }`插值语句 (interpolation) 时，有引号字符串将被编译为无引号字符串，这样方便了在混合指令 (mixin) 中引用选择器名。

```scss
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}
@include firefox-message(".header");
```

编译为：

```scss
body.firefox .header:before {
  content: "Hi, Firefox users!"; }
```

需要注意的是：当 `deprecated = property syntax` 时 （暂时不理解是怎样的情况），所有的字符串都将被编译为无引号字符串，不论是否使用了引号。

## 值列表

所谓值列表 (lists) 是指 Sass 如何处理 CSS 中： 


```scss
margin: 10px 15px 0 0
```

或者： 

```scss
font-face: Helvetica, Arial, sans-serif
```

像上面这样`通过空格或者逗号分隔的一系列的值`。

事实上，`独立的值也被视为值列表`——`只包含一个值的值列表`。

**Sass列表函数（Sass list functions）赋予了值列表更多功能（Sass进级会有讲解）：**

1. nth函数（nth function） 可以直接访问值列表中的某一项；
2. join函数（join function） 可以将多个值列表连结在一起；
3. append函数（append function） 可以在值列表中添加值； 
4. @each规则（@each rule） 则能够给值列表中的每个项目添加样式。

**值列表中可以再包含值列表**，比如 `1px 2px, 5px 6px` 是`包含 1px 2px 与 5px 6px 两个值列表的值列表`。

如果内外两层值列表使用相同的分隔方式，要用圆括号包裹内层，所以也可以写成 (1px 2px) (5px 6px)。

当值列表被编译为 CSS 时，Sass 不会添加任何圆括号，因为 CSS 不允许这样做。

**`(1px 2px) (5px 6px)`与 `1px 2px 5px 6px` 在编译后的 CSS 文件中是一样的，但是它们在 Sass 文件中却有不同的意义，前者是包含两个值列表的值列表，而后者是包含四个值的值列表。**

可以用 `()` 表示空的列表，这样不可以直接编译成 CSS，比如`编译 font-family: ()时，Sass 将会报错`。

如果值列表中包含空的值列表或空值，编译时将清除空值，比如 1px 2px () 3px 或 1px 2px null 3px。

# Sass 运算

程序中的运算是常见的一件事情，但在 CSS 中能做运算的，到目前为止仅有 `calc()` 函数可行。

但在 Sass 中，运算只是其基本特性之一。

## 加法

加法运算是 Sass 中运算中的一种，在`变量或属性中`都可以做加法运算。

如：

```scss
.box {
  width: 20px + 8in;
}
```

编译出来的 CSS:

```scss
.box {
  width: 788px;
}
```

但对于`携带不同类型的单位`时，在 Sass 中计算会报错，如下例所示：

```scss
.box {
  width: 20px + 1em;
}
```

编译的时候，编译器会报错：`“Incompatible units: 'em' and ‘px'.`

## 减法

Sass 的减法运算和加法运算类似，我们通过一个简单的示例来做阐述

```scss
$full-width: 960px;
$sidebar-width: 200px;

.content {
  width: $full-width -  $sidebar-width;
}
```

编译出来的 CSS 如下：

```scss
.content {
  width: 760px;
}
```

同样的，运算时碰到不同类型的单位时，编译也会报错。

## 乘法

Sass 中的乘法运算和前面介绍的加法与减法运算还略有不同。

虽然他也能够支持多种单位（比如 em ,px , %），但当一个单位同时声明两个值时会有问题。比如下面的示例：

```scss
.box {
  width:10px * 2px;  
}
```

编译的时候报`“20px*px isn't a valid CSS value.”`错误信息。

如果进行乘法运算时，两个值单位相同时，只需要 **`为一个数值提供单位`** 即可。

上面的示例可以修改成：

```scss
.box {
  width: 10px * 2;
}
```

编译出来的 CSS:

```scss
.box {
  width: 20px;
}
```

Sass 的乘法运算和加法、减法运算一样，在运算中有不同类型的单位时，也将会报错。

如下面的示例：

```scss
.box {
  width: 20px * 2em;
}
```

编译时报`“40em*px isn't a valid CSS value.”`错误信息。

## 除法

Sass 的乘法运算规则也适用于除法运算。

不过除法运算还有一个特殊之处。众所周知“`/`”符号在 CSS 中已做为一种符号使用。

因此在 Sass 中做除法运算时，`直接使用“/”符号做为除号时，将不会生效`，编译时既得不到我们需要的效果，`也不会报错。`

一起先来看一个简单的示例：

```scss
.box {
  width: 100px / 2;  
}
```

编译出来的 CSS 如下：

```scss
.box {
  width: 100px / 2;
}
```

这样的结果对于大家来说没有任何意义。

要修正这个问题，只需要给运算的外面添加一个小括号( )即可：

```scss
.box {
  width: (100px / 2);  
}
```

编译出来的 CSS 如下：

```scss
.box {
  width: 50px;
}
```

除了上面情况带有小括号，“`/`”符号会当作除法运算符之外，如果“`/`”符号`在已有的数学表达式中时，也会被认作除法符号。`

如下面示例：

```scss
.box {
  width: 100px / 2 + 2in;  
}
```

编译出来的CSS：

```scss
.box {
  width: 242px;
}
```

另外，在 Sass 除法运算中，当`用变量进行除法运算时`，`“/”符号也会自动被识别成除法`，如下例所示：

```scss
$width: 1000px;
$nums: 10;

.item {
  width: $width / 10;  
}

.list {
  width: $width / $nums;
}
```

编译出来的CSS:

```scss
.item {
  width: 100px;
}

.list {
  width: 100px;
}
```

综合上述，”/  ”符号被当作除法运算符时有以下几种情况：
•    如果数值或它的任意部分是`存储在一个变量中`或是`函数的返回值`。
•    如果数值`被圆括号包围`。
•    如果数值是另一个`数学表达式的一部分`

```scss
如下所示：
//SCSS
p {
  font: 10px/8px;             // 纯 CSS，不是除法运算
  $width: 1000px;
  width: $width/2;            // 使用了变量，是除法运算
  width: round(1.5)/2;        // 使用了函数，是除法运算
  height: (500px/2);          // 使用了圆括号，是除法运算
  margin-left: 5px + 8px/2px; // 使用了加（+）号，是除法运算
}
```

编译出来的CSS

```scss
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  margin-left: 9px;
 }
```

Sass 的除法运算还有一个情况。

我们先回忆一下，在乘法运算时，如果两个值带有相同单位时，做乘法运算时，出来的结果并不是我们需要的结果。

但在除法运算时，如果两个值带有相同的单位值时，除法运算之后会得到一个不带单位的数值。

如下所示：

```scss
.box {
  width: (1000px / 100px);
}
```

编译出来的CSS如下：

```scss
.box {
  width: 10;
}
```

## 变量计算

在 Sass 中使用变量进行计算，这使得 Sass 的数学运算功能变得更加实用。

一起来看一个简单的示例：

```scss
$content-width: 720px;
$sidebar-width: 220px;
$gutter: 20px;

.container {
  width: $content-width + $sidebar-width + $gutter;
  margin: 0 auto;
}
```

编译出来的CSS

```scss
.container {
  width: 960px;
  margin: 0 auto;
}
```

## 数字运算

在 Sass 运算中数字运算是较为常见的，数字运算包括前面介绍的：加法、减法、乘法和除法等运算。

而且还可以通过括号来修改他们的运算先后顺序。

和我们数学运算是一样的，一起来看个示例。

```scss
.box {
  width: ((220px + 720px) - 11 * 20 ) / 12 ;  
}
```

编译出来的 CSS:

```scss
.box {
  width: 60px;
}
```

上面这个简单示例是一个典型的计算 Grid 单列列宽的运算。

## 颜色运算

所有算数运算都支持颜色值，并且是分段运算的。

也就是说，红、绿和蓝各颜色分段单独进行运算。如：

```scss
p {
  color: #010203 + #040506;
}
```

计算公式为 `01 + 04 = 05`、`02 + 05 = 07` 和 `03 + 06 = 09`， 并且被合成为：

如此编译出来的 CSS 为：

```scss
p {
  color: #050709;
}
```

算数运算也能将数字和颜色值 一起运算，同样也是分段运算的。如：

```scss
p {
  color: #010203 * 2;
}
```

计算公式为 `01 * 2 = 02、02 * 2 = 04` 和 `03 * 2 = 06`， 并且被合成为：

```scss
p {
  color: #020406;
}
```

## 字符运算

在 Sass 中可以通过加法符号`“+”`来对`字符串进行连接`。例如：

```scss
$content: "Hello" + "" + "Sass!";
.box:before {
  content: " #{$content} ";
}
```

编译出来的CSS：

```scss
.box:before {
  content: " Hello Sass! ";
}
```

除了`在变量中做字符连接`运算之外，还可以`直接通过 +，把字符连接`在一起：

```scss
div {
  cursor: e + -resize;
}
```

编译出来的CSS:

```scss
div {
  cursor: e-resize;
}
```

注意，如果有引号的字符串被添加了一个没有引号的字符串 （也就是，带引号的字符串在 + 符号左侧）， 结果会是一个有引号的字符串。 

同样的，如果一个没有引号的字符串被添加了一个有引号的字符串 （没有引号的字符串在 + 符号左侧）， 结果将是一个没有引号的字符串。 

例如：

```scss
p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
}
```

编译出来的 CSS：

```scss
p:before {
  content: "Foo Bar";
  font-family: sans-serif; }
```
