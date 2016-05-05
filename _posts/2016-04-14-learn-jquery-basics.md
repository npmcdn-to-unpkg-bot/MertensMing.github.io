---
title: jQuery 基础修炼
date: 2016-04-14 23:50:40
tags: jQuery
---

**参考**
[慕课网 - jQuery基础修炼圣典 - 样式篇](http://www.imooc.com/learn/418)

正在更新 ……

# 初识 jQuery

## 环境搭建

进入官方网站获取 [最新版本的 jQuery](http://jquery.com/download/)。

### 两个系列

jQuery 分 2 个系列版本 `1.x` 与 `2.x`，主要的区别 在于 `2.x` 不再兼容 `IE6、7、8` 为移动端而优化，由于减少了一些代码，使得该版本比 `jQuery 1.x` 更小且更快。

### 开发版和压缩版

`压缩版(compressed)` 与 `开发版(development)`，我们在开发过程中使用开发版（开发版本便于代码修改及调试），项目上线发布使用压缩版（因为压缩版本体积更小，效率更快）。

### 引入

`jQuery` 只是一个库，不需要特别的安装，只需要我们在页面 `<head>` 标签内中通过 `script` 标签脚本引入 `jQuery` 库即可。

<!-- more -->

## jQuery 对象与 DOM 对象

**`jQuery` 对象与 `DOM` 对象是不一样的***

```html
 <!-- 使用JS原生语法 -->
    <script type="text/javascript">
        window.onload = function(){
            // 通过原生JS语法获取id为imooc1的元素p
            var p = document.getElementById('imooc1');
            // 将元素p在html中内容改变
            p.innerHTML = 'P1：您好！通过慕课网学习jQuery才是最佳的途径';
            // 将元素p的内容颜色改为红色
            p.style.color = 'red';  
        }
    </script>
    
    <!-- 使用jQuery语法 -->
    <script type="text/javascript">
        $(document).ready(function() {
            /**
             * 通过jQuery语法获取id为imooc2的元素获得一个jQuery对象
             * 调用该对象的html()方法进行更改内容
             * 调用该对象的css()方法进行更改颜色样式
             */   
            var $p = $('#imooc2');
            $p.html('P2：您好！通过慕课网学习jQuery才是最佳的途径').css('color','red');
        });
    </script>
```

通过`$('#imooc')`方法会得到一个`$p`的`jQuery`对象，`$p`是一个`类数组`的对象这个对象里面其实是`包含了DOM对象的信息`的,然后封装了很多操作方法，调用自己的方法`html`与`css`处理，得到的效果与标准的`JavaScript`处理结果是一致的。

**通过标准的J`avaScript`操作`DOM`与`jQuery`操作`DOM`的对比，我们不难发现：**

1. 通过`jQuery`方法包装后的对象，是`jQuery`对象，它是一个新的对象
2. `jQuery`与`DOM`对象完全不是同一个东西，但是又似曾相似，因为他们都能处理`DOM`
3. 通过`jQuery`处理`DOM`的操作，可以让开发者更专注业务逻辑的开发，而不需要我们具体知道哪个`DOM`节点有那些方法，也不需要关心不同浏览器的兼容问题，我们可以通过`jQuery`更友好的API进行开发，同时代码也会更加精短。

### jQuery对象转化成DOM对象

`jQuery`库本质上还是`JavaScript`代码，它只是对`JavaScript`语言进行包装处理，为了是提供更好更方便快捷的`DOM`处理与开发常见中经常使用的功能。

我们可以用`jQuery`的同时也能混合`JavaScript`原生代码一起使用。
过`jQuery`生成的对象是一个做了包装处理的对象，如果要用`jQuery`对象自己的方法，就需要满足这个对象是通过`jQuery`生成的。 

在很多场景中，我们需要`jQuery`与`DOM`能够相互的转换，它们都是操作的`DOM`元素，`jQuery`是一个类数组对象，`DOM`对象就是一个单独的`DOM`元素。

#### 利用数组下标的方式读取到jQuery中的DOM对象    

`html` 代码

```html
<div>元素一</div>
<div>元素二</div>
<div>元素三</div>
```

`JavaScript` 代码

```javascript
var $div = $('div') //jQuery对象
var div = $div[0] //转化成DOM对象
div.style.color = 'red' //操作dom对象的属性
```

#### 通过jQuery自带的get()方法

`jQuery`对象自身提供一个`.get() `方法允许我们直接访问`jQuery`对象中相关的DOM节点，`get`方法中提供一个元素的索引：

```javascript
var $div = $('div') //jQuery对象
var div = $div.get(0) //通过get方法，转化成DOM对象
div.style.color = 'red' //操作dom对象的属性
```

其实我们翻开源码，看看就知道了，get方法就是利用的第一种方式处理的，只是包装成一个`get`让开发者更直接方便的使用。

### DOM对象转化成jQuery对象

`$(参数)`是一个多功能的方法，通过传递不同的参数而产生不同的作用。

**如果传递给`$(DOM)`函数的参数是一个`DOM`对象，`jQuery`方法会把这个`DOM`对象给包装成一个新的`jQuery`对象**

```javascript
var div = document.getElementsByTagName('div'); //dom对象
var $div = $(div); //jQuery对象
var $first = $div.first(); //找到第一个div元素
$first.css('color', 'red'); //给第一个元素设置颜色
```

## jQuery 选择器

jQuery几乎支持主流的css1~css3选择器的写法。

### ID 选择器

```javascript
$( "#id" )
```

`id`是唯一的，每个`id`值在一个页面中只能使用一次。如果多个元素分配了相同的`id`，将只匹配该`id`选择集合的第一个`DOM`元素。

但这种行为不应该发生;有超过一个元素的页面使用相同的`id`是无效的。

### 类选择器

```javascript
$( ".class" )
```

类选择器，相对id选择器来说，效率相对会低一点，但是优势就是可以多选

如果浏览器支持，`jQuery`使用`JavaScript`的原生`getElementsByClassName()`函数来实现的。

### 元素选择器

根据给定（`html`）标记名称选择所有的元素

```javascript
$( "element" )
```

### 全选择器

获取文档中所有的元素

```javascript
$( "*" )
```

### 层级选择器

选择器中的层级选择器就是用来处理这种关系

```javascript
子元素 后代元素 兄弟元素 相邻元素
```

选择器 | 描述
---- | ------
`$( "parent > child" )`  子选择器 | 选择所有指定`“parent”`元素中指定的`"child"`的直接子元素
`$("ancestor descendant")` 后代选择器 | 选择给定的祖先元素的所有后代元素, 一个元素的后代可能是该元素的一个孩子，孙子，曾孙等
`$("prev + next")` 相邻兄弟选择器 | 选择所有紧接在`“prev”`元素后的`“next”`元素
`$("prev ~ siblings")` 一般兄弟选择器 | 匹配`“prev”`元素之后的所有 兄弟元素。具有相同的父元素，并匹配过滤`“siblings”`选择器

### 基本筛选选择器

筛选选择器很多都不是CSS的规范，而是jQuery自己为了开发者的便利延展出来的选择器

筛选选择器的用法与CSS中的伪元素相似，选择器用冒号“：”开头，通过一个列表，看看基本筛选器的描述：

选择器 | 描述
:----: | ----
`$(':first')` | 匹配第一个元素
`$(':last')` | 匹配最后一个的元素
`$(':not(selector)')` | 去除所有与给定选择器匹配的元素
`$(':eq(index)')` | 在匹配集合中选择索引值为 index 的直接子元素
`$(':gt(index)')` | 匹配所有大于给定索引值的元素
`$(':lt(index)')` | 匹配所有小于给定索引值的元素
`$(':even')` | 匹配所有索引值为偶数的元素，从 0 开始计数
`$(':odd')` | 匹配所有索引值为奇数的元素，从 0 开始计数
`$(':header')` | 匹配所有标题元素
`$(':root')` | 选择该文档的根元素
`$(':animated')` | 匹配所有正在执行动画效果的元素

### 内容筛选选择器

如果我们要通过内容来过滤，jQuery也提供了一组内容筛选选择器，当然其规则也会体现在它所包含的子元素或者文本内容上

<img src="1.jpg">

**注意事项：**

1. `:contains`与`:has`都有查找的意思，但是`contains`查找包含`“指定文本”`的元素，`has查找包含“指定元素”`的元素
2. 如果`:contains`匹配的文本包含在元素的子元素中，同样认为是符合条件的。
3. `:parent与:empty`是相反的，两者所涉及的子元素，包括文本节点

### 可见性筛选选择器

元素有显示状态与隐藏状态，`jQuery`根据元素的状态扩展了可见性筛选选择器:`visible`与:`hidden`

<img src="2.jpg">

**我们有几种方式可以隐藏一个元素：**

1. CSS `display`的值是`none`。
2.` type="hidden"`的表单元素。
3. `宽度和高度`都显式设置为`0`。
4. 一个祖先元素是隐藏的，该元素是不会在页面上显示
5. CSS `visibility`的值是`hidden`
6. CSS `opacity`的指是`0`

### 属性筛选选择器

**属性选择器让你可以基于属性来定位一个元素。**

可以只指定该元素的某个属性，这样所有使用该属性而不管它的值，这个元素都将被定位，也可以更加明确并定位在这些属性上使用特定值的元素，这就是属性选择器展示它们的威力的地方。

<img src="3.jpg">

### 子元素筛选选择器

子元素筛选选择器不常使用，其筛选规则比起其它的选择器稍微要复杂点

<img src="4.jpg">

**注意事项：**

1. `:first`只匹配一个单独的元素，但是`:first-child` 选择器可以匹配多个：即为每个父级元素匹配第一个子元素。这相当于`:nth-child(1)`
2. `:last` 只匹配一个单独的元素， `:last-child` 选择器可以匹配多个元素：即，为每个父级元素匹配最后一个子元素
3. 如果子元素只有一个的话，`:first-child`与`:last-child`是同一个
4.  `:only-child`匹配某个元素是父元素中唯一的子元素，就是说当前子元素是父元素中唯一的元素，则匹配
5.  jQuery实现`:nth-child(n)`是严格来自CSS规范，所以n值是“索引”，也就是说，`从1开始计数`，`:nth-child(index)`从1开始的，而`eq(index)是从0开始的`
6. `nth-child(n)` 与 `:nth-last-child(n)` 的区别前者是从前往后计算，后者从后往前计算

### 表单元素选择器

jQuery中专门加入了表单选择器，从而能够极其方便地获取到某个类型的表单元素

<img src="5.jpg">

除了`input`筛选选择器，几乎每个表单类别筛选器都对应一个`input`元素的`type`值。

大部分表单类别筛选器可以使用属性筛选器替换。比如 `$(':password') == $('[type=password]')`

### 表单对象属性筛选选择器

表单对象属性筛选选择器也是专门针对表单元素的选择器，可以附加在其他选择器的后面，主要功能是对所选择的表单元素进行筛选

<img src="6.jpg">

**注意事项：**
1. 选择器适用于复选框和单选框，对于下拉框元素, 使用 :selected 选择器
2. 在某些浏览器中，选择器`:checked`可能会错误选取到`<option>`元素，所以保险起见换用选择器`input:checked`，确保只会选取`<input>`元素

### 特殊选择器  this

相信很多刚接触`jQuery`的人，很多都会对`$(this)`和`this`的区别模糊不清，那么这两者有什么区别呢？

其实就是把`this`加工成`jQuery`对象，我们就可以用`jQuery`提供的快捷方法直接处理这个对象。

```javascript
$('p').click(function(){
    //把p元素转化成jQuery的对象
    var $this= $(this) 
    $this.css('color','red')
})
```

# jQuery 的属性和样式

## `.attr()`与`.removeAttr()`

操作特性的`DOM`方法主要有3个，`getAttribute`方法、`setAttribute`方法和`removeAttribute`方法，就算如此在实际操作中还是会存在很多问题，这里先不说。而在`jQuery`中用一个`attr()`与`removeAttr()`就可以全部搞定了，包括兼容问题

```javascript attr() 方法
/**
* attr()有4个表达式
* 
* 1. attr(传入属性名)：获取属性的值
* 2. attr(属性名, 属性值)：设置属性的值
* 3. attr(属性名,函数值)：设置属性的函数值
* 4. attr(attributes)：给指定元素设置多个属性值，即：{属性名一: “属性值一” , 属性名二: “属性值二” , … … }
*/

// 返回文档中所有图像的src属性值。
$("img").attr("src");

// 为所有图像设置src属性。
$("img").attr("src","test.jpg");

// 把src属性的值设置为title属性的值。
$("img").attr("title", function() { return this.src });

// 为所有图像设置src和alt属性。
$("img").attr({ src: "test.jpg", alt: "Test Image" });
```

`DOM`中有个概念的区分：`Attribute`和`Property`翻译出来都是“属性”，《js高级程序设计》书中翻译为`“特性”`和`“属性”`。简单理解，`Attribute`就是`dom`节点自带的属性

**获取`Attribute`就需要用`attr`，获取`Property`就需要用`prop`**

```javascript removeAttr() 方法
/**
* removeAttr()删除方法
* 
* .removeAttr( attributeName )
* 为匹配的元素集合中的每个元素中移除一个属性（attribute
*/

// 将文档中图像的src属性删除
$("img").removeAttr("src");
```

## `.html()`及`.text()`

读取、修改元素的`html结构`或者`元素的文本内容`是常见的DOM操作，jQuery针对这样的处理提供了2个便捷的方法`.html()`与`.text()`

```javascript html()方法 
/**
* 获取集合中第一个匹配元素的HTML内容 或 设置每一个匹配元素的html内容
* 
* 具体有3种用法：
* .html() 不传入值，就是获取集合中第一个匹配元素的HTML内容
* .html( htmlString )  设置每一个匹配元素的html内容
* .html( function(index, oldhtml) ) 用来返回设置HTML内容的一个函数
*/

// 返回p元素的内容。
$('p').html();

// 设置所有 p 元素的内容
$("p").html("Hello <b>world</b>!");

// 使用函数来设置所有匹配元素的内容。
$("p").html(function(n){
    return "这个 p 元素的 index 是：" + n;
});
```

`.htm()`方法内部使用的是DOM的`innerHTML`属性来处理的，所以在设置与获取上需要注意的一个最重要的问题，这个操作是针对`整个HTML内容`（`不仅仅只是文本内容`）

```javascript .text()方法
/**
* 得到匹配元素集合中每个元素的文本内容结合，包括他们的后代
* 或设置匹配元素集合中每个元素的文本内容为指定的文本内容。
* 
* 具体有3种用法：
* .text() 得到匹配元素集合中每个元素的合并文本，包括他们的后代
* .text( textString ) 用于设置匹配元素内容的文本
* .text( function(index, text) ) 用来返回设置文本内容的一个函数
*/

// 返回p元素的文本内容。
$('p').text();  

// 设置所有 p 元素的文本内容
$("p").text("Hello world!");

// 使用函数来设置所有匹配元素的文本内容。
$("p").text(function(n){
    return "这个 p 元素的 index 是：" + n;
});

/**
* .text() 结果返回一个字符串，包含所有匹配元素的合并文本
*/
```

**`.html`与`.text`的异同:**

1. `.html`与`.text`的方法操作是一样，只是在具体针对处理对象不同
2. `.html`处理的是元素内容，`.text`处理的是文本内容
3. `.html`只能使用在HTML文档中，`.text` 在`XML` 和 `HTML` 文档中都能使用
4. 如果处理的对象只有一个子文本节点，那么`html`处理的结果与`text`是一样的
5. 火狐不支持`innerText`属性，用了类似的`textContent`属性，`.text()`方法综合了`2`个属性的支持，所以可以兼容所有浏览器


## `.val()`

`jQuery`中有一个`.val()`方法主要是用于处理表单元素的值，比如 `input`, `select` 和 `textarea`。

```javascript .val()方法
/**
* 获取匹配的元素集合中第一个元素的当前值或设置匹配的元素集合中每个元素的值。
* 
* 具体有3种用法：
* .val()无参数，获取匹配的元素集合中第一个元素的当前值
* .val( value )，设置匹配的元素集合中每个元素的值
* .val( function ) ，一个用来返回设置值的函数
*/

// 获取文本框中的值
$("input").val();

// 设定文本框的值
$("input").val("hello world!");

// 设定文本框的值
$('input:text.items').val(function() {
  return this.value + ' ' + this.className;
});
```

`.html()`,`.text()`和`.val()`的差异总结：

1. `.html()`,`.text()`,`.val()`三种方法都是用来读取选定元素的内容；
2. `.html()`是用来读取元素的`html`内容（包括`html`标签），
3. `.text()`用来读取元素的纯文本内容，包括其后代元素，
4. `.val()`是用来读取表单元素的`"value"`值。
5. 其中`.html()`和`.text()`方法不能使用在表单元素上
6. 而`.val()`只能使用在表单元素上；
7. 另外`.html()`方法使用在多个元素上时，只读取第一个元素；
8. `.val()`方法和`.html()`相同，如果其应用在多个元素上时，只能读取第一个表单元素的`"value"`值，
9. 但是`.text()`和他们不一样，如果`.text()`应用在多个元素上时，将会读取所有选中元素的文本内容。
10. `.html(htmlString)`,`.text(textString)`和`.val(value)`三种方法都是用来替换选中元素的内容，如果三个方法同时运用在多个元素上时，那么将会替换所有选中元素的内容。
11. `.html()`,`.text()`,`.val()`都可以使用回调函数的返回值来动态的改变多个元素的内容。  

## `.addClass()`

```javascript .addClass( className )方法
/**
* 用于动态增加class类名
*
* .addClass( className )方法
* .addClass( className ) : 为每个匹配元素所要增加的一个或多个样式名
* .addClass( function(index, currentClass) ) : 这个函数返回一个或更多用空格隔开的要增加的样式名
*/

// 为匹配的元素加上 'selected' 类
$("p").addClass("selected");
$("p").addClass("selected1 selected2");

// 给li加上不同的class
$('ul li:last').addClass(function() {
  return 'item-' + $(this).index();
});
```

## `.removeClass()`

```javascript .removeClass( )方法
/**
* 从匹配的元素中`删除全部`或者`指定的class`
*
* .removeClass( [className ] )：每个匹配元素移除的一个或多个用空格隔开的样式名
* .removeClass( function(index, class) ) ： 一个函数，返回一个或多个将要被移除的样式名
*/

// 如果一个样式类名作为一个参数,只有这样式类会被从匹配的元素集合中删除 。 
// 如果没有样式名作为参数，那么所有的样式类将被移除

// 从匹配的元素中删除 'selected' 类
$("p").removeClass("selected");

// 删除匹配元素的所有类
$("p").removeClass();

// 删除最后一个元素上与前面重复的class
$('li:last').removeClass(function() {
    return $(this).prev().attr('class');
});
```

## `.toggleClass()`

`addClass`与`removeClass`的互斥切换

`jQuery`提供一个`toggleClass`方法用于简化这种互斥的逻辑，通过`toggleClass`方法动态添加删除`Class`，一次执行相当于`addClass`，再次执行相当于`removeClass`

```javascript .toggleClass( )方法
/**
* 在匹配的元素集合中的每个元素上添加或删除一个或多个样式类
* 取决于这个样式类是否存在或值切换属性。
* 即：如果存在（不存在）就删除（添加）一个类
* .toggleClass( className )：在匹配的元素集合中的每个元素上用来切换的一个或多个（用空格隔开）样式类名
* .toggleClass( className, switch )：一个布尔值，用于判断样式是否应该被添加或移除
* .toggleClass( [switch] )：一个用来判断样式类添加还是移除的 布尔值
* .toggleClass( function(index, class, switch) [, switch ] )：
* 用来返回在匹配的元素集合中的每个元素上用来切换的样式类名的一个函数。
* 接收元素的索引位置和元素旧的样式类作为参数
*/

// 为匹配的元素切换 'selected' 类
$("p").toggleClass("selected");

// 每点击三下加上一次 'highlight' 类
var count = 0;
$("p").click(function(){
    $(this).toggleClass("highlight", count++ % 3 == 0);
});

// 根据父元素来设置class属性
$('div.foo').toggleClass(function() {
  if ($(this).parent().is('.bar') {
    return 'happy';
  } else {
    return 'sad';
  }
});
```

## `.css()`

**`.css()` 方法：获取元素样式属性的计算值或者设置元素的CSS属性**

```javascript .toggleClass( )方法
/**
* 获取：
* .css( propertyName ) ：获取匹配元素集合中的第一个元素的样式属性的计算值
* .css( propertyNames )：传递一组数组，返回一个对象结果
*
* 设置：
* .css(propertyName, value )：设置CSS
* .css( propertyName, function )：可以传入一个回调函数，返回取到对应的值进行处理
* .css( properties )：可以传一个对象，同时设置多个样式
*/

// 取得第一个段落的color样式属性的值
$("p").css("color");

// 将所有段落的字体颜色设为红色并且背景为蓝色
$("p").css({ "color": "#ff0011", "background": "blue" });

// 将所有段落字体设为红色
$("p").css("color","red");

// 逐渐增加div的大小
$("div").click(function() {
  $(this).css({
    width: function(index, value) {
      return parseFloat(value) * 1.2;
    }, 
    height: function(index, value) {
      return parseFloat(value) * 1.2;
    }
  });
});
```

**注意事项：**

1. 浏览器属性获取方式不同，在获取某些值的时候都jQuery采用统一的处理，比如颜色采用`RBG`，尺寸采用`px`
2. `.css()`方法支持驼峰写法与大小写混搭的写法，内部做了容错的处理
3. 当一个数只被作为值`（value）`的时候， jQuery会将其转换为一个字符串，并添在字符串的结尾处添加px，例如 .`css("width",50}`) 与 `.css("width","50px"})`一样

























