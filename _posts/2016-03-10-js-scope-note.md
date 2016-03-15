---
title: JavaScript 作用域学习笔记
date: 2016-03-10 14:36:57
categories: JavaScript
tags: 作用域
---

参考：

[Javascript作用域原理](http://www.laruence.com/2009/05/28/863.html)

[理解 JavaScript 作用域和作用域链](http://www.cnblogs.com/lhb25/archive/2011/09/06/javascript-scope-chain.html)

## JavaScript 作用域

作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期。

在JavaScript中，变量的作用域有 **全局作用域**和 **局部作用域**两种。

### 全局作用域（Global Scope）

在 **代码中任何地方都能访问到的对象**拥有全局作用域，一般来说以下几种情形拥有全局作用域：

<!-- more -->

（1）最外层函数和在最外层函数外面定义的变量拥有全局作用域，例如：

```javascript
var authorName="山边小溪";
function doSomething(){
    var blogName="梦想天空";
    function innerSay(){
        alert(blogName);
    }
    innerSay();
}
alert(authorName); //山边小溪
alert(blogName); //脚本错误
doSomething(); //梦想天空
innerSay() //脚本错误
```

（2）所有末定义直接赋值的变量自动声明为拥有全局作用域，例如：

```javascript
function doSomething(){
    var authorName="山边小溪";
    blogName="梦想天空";
    alert(authorName);
}
doSomething(); //山边小溪
alert(blogName); //梦想天空
alert(authorName); //脚本错误
```

变量`blogName`拥有全局作用域，而`authorName`在函数外部无法访问到。

### 局部作用域（Local Scope）

和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部，所有在一些地方也会看到有人把这种作用域称为 **函数作用域**，例如下列代码中的`blogName`和函数`innerSay`都只拥有局部作用域。

```javascript
function doSomething(){
    var blogName="梦想天空";
    function innerSay(){
        alert(blogName);
    }
    innerSay();
}
alert(blogName); //脚本错误
innerSay(); //脚本错误
```

## JavaScript 的作用域链（Scope  Chain）

### [[scope]] 属性

函数对象其中一个内部属性是`[[Scope]]`，由`ECMA-262`标准第三版定义，该内部属性包含了 **函数被创建的作用域中对象的集合**，这个集合被称为函数的 **作用域链**，它决定了哪些数据能被函数访问。

请看例子：

```javascript
function add(num1,num2) {
    var sum = num1 + num2;
    return sum;
}
```

在函数`add`创建时，它的作用域链中会填入一个全局对象，该全局对象包含了所有全局变量，如下图所示（注意：图片只例举了全部变量中的一部分）：

<img src="1.jpg" alt="">

函数add的 **作用域将会在执行时用到**。

例如执行如下代码：

```javascript
var total = add(5,10);
```

执行此函数时会创建一个称为`“运行期上下文(execution context)”`的内部对象，运行期上下文定义了函数执行时的环境。

每个运行期上下文都有自己的作用域链，用于标识符解析，当运行期上下文被创建时，而它的作用域链初始化为当前运行函数的`[[Scope]]`所包含的对象。

这些值按照它们出现在函数中的顺序被复制到运行期上下文的作用域链中，它们共同组成了一个新的对象，叫`“活动对象(activation object)”`，该对象包含了函数的`所有局部变量`、`命名参数`、`参数集合`以及`this`，然后此对象会被推入作用域链的前端，当运行期上下文被销毁，活动对象也随之销毁。

新的作用域链如下图所示：

<img src="2.jpg" alt="">

在函数执行过程中，每遇到一个变量，都会经历一次标识符解析过程以决定从哪里获取和存储数据。

该过程从作用域链头部，也就是从活动对象开始搜索，查找同名的标识符，如果找到了就使用这个标识符对应的变量，如果没找到继续搜索作用域链中的下一个对象；

如果搜索完所有对象都未找到，则认为该标识符未定义。

函数执行过程中，每个标识符都要经历这样的搜索过程。

### 函数运行在它们被定义的作用域里

**JS权威指南** 中有一句很精辟的描述:

> JavaScript中的函数运行在它们被定义的作用域里,而不是它们被执行的作用域里.

在JS中，作用域的概念和其他语言差不多， 在每次调用一个函数的时候 ，就会进入一个函数内的作用域，当从函数返回以后，就返回调用前的作用域.

`JS`的作用域的实现具体过程如下(ECMA262中所述):

> 任何执行上下文时刻的作用域, 都是由作用域链(`scope chain`, 后面介绍)来实现.

> 在一个函数被定义的时候, 会将它`定义时刻`的`scope chain`链接到这个函数对象的`[[scope]]`属性.

> 在一个函数对象被调用的时候，会创建一个活动对象(也就是一个对象), 然后对于每一个函数的形参，都命名为该活动对象的命名属性, 然后将这个活动对象做为此时的作用域链(`scope chain`)最前端, 并将这个函数对象的`[[scope]]`加入到`scope chain`中.



看个例子：

函数对象的`[[scope]]`属性是在定义一个函数的时候决定的, 而非调用的时候, 所以如下面的例子:

```javascript
var name = 'laruence';
    function echo() {
    alert(name);
}
 
function env() {
    var name = 'eve';
    echo();markdown previewmarkdown previewmarkdown previewmarkdown preview
}
 
env(); // 运行结果是： laruence
```

结合上面的知识, 我们来看看下面这个例子:

```javascript
function factory() {
     var name = 'laruence';
     var intro = function(){
          alert('I am ' + name);
     }
     return intro;
}
 
function app(para){
     var name = para;
     var func = factory();
     func();
}
 
app('eve');
```

当调用`app`的时候, `scope chain`是由: `{window活动对象(全局)}`->`{app的活动对象}` 组成.

在刚进入`app`函数体时, app的活动对象有一个`arguments`属性, 俩个值为`undefined`的属性: `name`和`func`. 和一个值为`’eve’`的属性`para`;

此时的`scope chain`如下:

```javascript
[[scope chain]] = [
{
     para : 'eve',
     name : undefined,
     func : undefined,
     arguments : []
}, {
     window call object
}
]
```

当调用进入`factory`的函数体的时候, 此时的`factory`的`scope chain`为:

```javascript
[[scope chain]] = [
{
     name : undefined,
     intor : undefined
}, {
     window call object
}
]
```

注意到, 此时的作用域链中, 并不包含`app`的活动对象.

在定义`intro`函数的时候, `intro`函数的`[[scope]]`为:

```javascript
[[scope chain]] = [
{
     name : 'laruence',
     intor : undefined
}, {
     window call object
}
]
```

从`factory`函数返回以后,在`app`体内调用`intor`的时候, 发生了标识符解析, 而此时的`sope chain`是:

```javascript
[[scope chain]] = [
{
     intro call object
}, {
     name : 'laruence',
     intor : undefined
}, {
     window call object
}
]
```

因为`scope chain`中,并不包含`factory`活动对象. 所以, `name`标识符解析的结果应该是factory活动对象中的name属性, 也就是`’laruence’`.

所以运行结果是:

```javascript
I am laruence
```

### 作用域链和代码优化

从作用域链的结构可以看出，在运行期上下文的作用域链中，标识符所在的位置越深，读写速度就会越慢。

全局变量总是存在于运行期上下文作用域链的最末端，因此在标识符解析的时候，查找全局变量是最慢的。

所以，在编写代码的时候应尽量少使用全局变量，尽可能使用局部变量。

一个好的经验法则是：如果一个跨作用域的对象被引用了一次以上，则先把它存储到局部变量里再使用。

例如下面的代码：

```javascript
function changeColor(){
    document.getElementById("btnChange").onclick=function(){
        document.getElementById("targetCanvas").style.backgroundColor="red";
    };
}
```

这个函数引用了两次全局变量document，查找该变量必须遍历整个作用域链，直到最后在全局对象中才能找到。

这段代码可以重写如下：

```javascript
function changeColor(){
    var doc=document;
    doc.getElementById("btnChange").onclick=function(){
        doc.getElementById("targetCanvas").style.backgroundColor="red";
    };
}
```

这段代码比较简单，重写后不会显示出巨大的性能提升，但是如果程序中有大量的全局变量被从反复访问，那么重写后的代码性能会有显著改善。

### 改变作用域链

函数每次执行时对应的运行期上下文都是独一无二的，所以多次调用同一个函数就会导致创建多个运行期上下文，当函数执行完毕，执行上下文会被销毁。

每一个运行期上下文都和一个作用域链关联。

一般情况下，在运行期上下文运行的过程中，其作用域链只会被 `with 语句`和 `catch 语句`影响。

#### with 语句

with语句是对象的快捷应用方式，用来避免书写重复代码。

例如：

```javascript
function initUI(){
    with(document){
        var bd=body,
            links=getElementsByTagName("a"),
            i=0,
            len=links.length;
        while(i < len){
            update(links[i++]);
        }
        getElementById("btnInit").onclick=function(){
            doSomething();
        };
    }
}
```

这里使用`with`语句来避免多次书写`document`，看上去更高效，实际上产生了性能问题。

当代码运行到`with`语句时，运行期上下文的作用域链临时被改变了。

一个新的可变对象被创建，它包含了参数指定的对象的所有属性。

这个对象将被推入作用域链的头部，这意味着函数的所有局部变量现在处于第二个作用域链对象中，因此访问代价更高了。

如下图所示：

<img src="3.jpg" alt="">

因此在程序中应避免使用`with`语句，在这个例子中，只要简单的把`document`存储在一个局部变量中就可以提升性能。

#### catch语句

另外一个会改变作用域链的是`try-catch`语句中的`catch`语句。

当`try`代码块中发生错误时，执行过程会跳转到`catch`语句，然后把异常对象推入一个可变对象并置于作用域的头部。

在`catch`代码块内部，函数的所有局部变量将会被放在第二个作用域链对象中。

示例代码：

```javascript
try{
    doSomething();
}catch(ex){
    alert(ex.message); //作用域链在此处改变
}
```

请注意，一旦`catch`语句执行完毕，作用域链机会返回到之前的状态。

`try-catch`语句在代码调试和异常处理中非常有用，因此不建议完全避免。

你可以通过优化代码来减少`catch`语句对性能的影响。

一个很好的模式是将错误委托给一个函数处理，例如：

```javascript
try{
    doSomething();
}catch(ex){
    handleError(ex); //委托给处理器方法
}
```

优化后的代码，`handleError`方法是`catch`子句中唯一执行的代码。

该函数接收异常对象作为参数，这样你可以更加灵活和统一的处理错误。

由于只执行一条语句，且没有局部变量的访问，作用域链的临时改变就不会影响代码性能了。

## Javascript 的预编译

在`JS`中, 是有预编译的过程的, `JS`在执行每一段`JS`代码之前, 都会首先处理`var`关键字和`function`定义式(函数定义式和函数表达式).

如上文所说, 在调用函数执行之前, 会首先创建一个活动对象, 然后搜寻这个函数中的`局部变量定义`,和`函数定义`, 将变量名和函数名都做为这个活动对象的同名属性, 对于局部变量定义,变量的值会在真正执行的时候才计算, 此时只是简单的赋为`undefined`.

而对于函数的定义,是一个要注意的地方:

这就是函数定义式和函数表达式的不同, 对于函数定义式, 会将函数定义提前. 而函数表达式, 会在执行过程中才计算.

```javascript
var name = 'laruence';
     age = 26;
```

我们都知道`不使用var关键字`定义的变量, 相当于是`全局变量`, 联系到我们刚才的知识:

在对`age`做标识符解析的时候, 因为是写操作, 所以当找到到全局的`window`活动对象的时候都没有找到这个标识符的时候, 会在window活动对象的基础上, 返回一个值为`undefined`的`age`属性.

现在, 也许你注意到了我刚才说的: **JS在执行每一段JS代码**.

```html
<script>
     alert(typeof eve); //结果:undefined
</script>
<script>
     function eve() {
          alert('I am Laruence');
     }
</script>
```


