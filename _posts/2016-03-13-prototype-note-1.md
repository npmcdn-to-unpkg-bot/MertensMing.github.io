---
title: JavaScript 原型学习笔记
date: 2016-03-11 18:15:45
categories: JavaScript
tags: prototype
---
## 解决一些疑问

### 什么是原型？
原型是一个对象，其他对象可以通过它实现属性继承。

### 任何一个对象都可以成为原型么？
是，而且原始类型不可以。

### 哪些对象有原型？
所有的对象在默认的情况下都有一个原型，因为原型本身也是对象，所以每个原型自身又有一个原型(只有一种例外，默认的对象原型在原型链的顶端。）

### 那什么又是对象呢?
在javascript中，一个对象就是任何无序键值对的集合,如果它不是一个主数据类型(`undefined`，`null`，`boolean`，`number`，or `string`)，那它就是一个对象。

一个对象的真正原型是被对象内部的`[[Prototype]]`（`__proto__`）属性`(property)`所持有。

<!-- more -->

### 怎样获取原型对象

`ECMA`引入了标准对象原型访问器`Object.getPrototype(object)`，到目前为止只有`Firefox`和`chrome`实现了此访问器。

除了`IE`，其他的浏览器支持非标准的访问器`__proto__`，如果这两者都不起作用的，我们需要从对象的构造函数中找到的它原型属性。

```js
var a = {}; 

//Firefox 3.6 and Chrome 5 
 Object.getPrototypeOf(a); 
//[object Object]   
 
 
//Firefox 3.6, Chrome 5 and Safari 4 
a.__proto__; 
//[object Object]   
 
 
//all browsers 
 a.constructor.prototype; 
//[object Object]
```

### 我想在继承中使用原型，那我该怎么做？

如果仅仅只是因为一个实例而使用原型是没有多大意义的，这和直接添加属性到这个实例是一样的。

假如我们已经创建了一个实例对象 ，我们想要继承一个已经存在的对象的功能比如说`Array`，我们可以像下面这样做( 在支持`__proto__` 的浏览器中)

```js
//unusual case and does not work in IE
var a = {};
a.__proto__ = Array.prototype;
a.length; 
//0
```

> 原型真正魅力体现在多个实例共用一个通用原型的时候。
> 原型对象 **(注:也就是某个对象的原型所引用的对象)**的属性一旦定义，就可以被多个引用它的实例所继承 **(注:即这些实例对象的原型所指向的就是这个原型对象)**，这种操作在性能和维护方面其意义是不言自明的。

### 这也是构造函数的存在的原因么?
是的。构造函数提供了一种方便的跨浏览器机制，这种机制允许在创建实例时为实例提供一个通用的原型。

### constructor.prototype 属性究竟是什么？
首先，javascript并没有在 `构造函数(constructor)`和`其他函数`之间做区分，所以说每个函数都有一个原型属性。

反过来，如果不是函数，将不会有这样一个属性。

请看下面的代码：

```js
//function will never be a constructor but it has a prototype property anyway 
Math.max.prototype; 
//[object Object] 
 
//function intended to be a constructor has a prototype too 
var A = function(name) { 
 
     this.name = name; 
 
} 

 A.prototype; 
//[object Object]   
 
//Math is not a function so no prototype property 
 Math.prototype; 
//null
```

现在我们可以下个定义了：
函数A的原型属性(`prototype property` )是一个对象，当这个函数被用作构造函数来创建实例时，该函数的原型属性将被作为原型赋值给所有对象实例`(注:即所有实例的原型引用的是函数的原型属性)`

以下的代码更详细的说明这一切：

```js
//创建一个函数b
var b = function(){ var one; }
//使用b创建一个对象实例c
var c = new b();
//查看b 和c的构造函数
b.constructor;  // function Function() { [native code]}
b.constructor==Function.constructor; //true
c.constructor; //实例c的构造函数 即 b function(){ var one; }
c.constructor==b //true
//b是一个函数，查看b的原型如下
b.constructor.prototype // function (){}
b.__proto__  //function (){}

//b是一个函数，由于javascript没有在构造函数constructor和函数function之间做区分，所以函数像constructor一样，
//有一个原型属性，这和函数的原型(b.__proto__ 或者b.construtor.prototype)是不一样的
b.prototype //[object Object]   函数b的原型属性

b.prototype==b.constructor.prototype //fasle
b.prototype==b.__proto__  //false
b.__proto__==b.constructor.prototype //true

//c是一个由b创建的对象实例，查看c的原型如下
c.constructor.prototype //[object Object] 这是对象的原型
c.__proto__ //[object Object] 这是对象的原型

c.constructor.prototype==b.constructor.prototype;  //false  c的原型和b的原型比较
c.constructor.prototype==b.prototype;  //true c的原型和b的原型属性比较

//为函数b的原型属性添加一个属性max
b.prototype.max = 3
//实例c也有了一个属性max
c.max  //3
```




## 原型

```javascript

var decimalDigits = 2,
    tax = 5;
 
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}
//alert(add(1, 3));
```

通过执行各个`function`来得到结果，学习了原型之后，我们可以使用如下方式来美化一下代码。

### 原型使用方式1

在使用原型之前，我们需要先将代码做一下小修改：

```javascript
var Calculator = function (decimalDigits, tax) {
    this.decimalDigits = decimalDigits;
    this.tax = tax;
};
```

然后，通过给`Calculator`对象的`prototype`属性赋值对象字面量来设定`Calculator`对象的原型。

```javascript
Calculator.prototype = {
    add: function (x, y) {
        return x + y;
    },
    subtract: function (x, y) {
        return x - y;
    }
};
//alert((new Calculator()).add(1, 3));

```

这样，我们就可以`new Calculator`对象以后，就可以调用`add`方法来计算结果了。

### 原型使用方式2

第二种方式是，在赋值原型`prototype`的时候使用`function`立即执行的表达式来赋值，即如下格式：

```javascript
Calculator.prototype = function () { } ();
```

它的好处在前面的帖子里已经知道了，就是可以封装私有的`function`，通过`return`的形式暴露出简单的使用名称，以达到`public/private`的效果，修改后的代码如下：

```javascript
alculator.prototype = function () {
    add = function (x, y) {
        return x + y;
    },
    subtract = function (x, y) {
        return x - y;
    }
    return {
        add: add,
        subtract: subtract
    }
} ();
//alert((new Calculator()).add(11, 3));
```

同样的方式，我们可以`new Calculator`对象以后调用add方法来计算结果了。

### 分步声明

上述使用原型的时候，有一个限制就是一次性设置了原型对象，我们再来说一下如何分步来设置原型的每个属性吧。

```javascript
var BaseCalculator = function () {
    //为每个实例都声明一个小数位数
    this.decimalDigits = 2;
};
         
//使用原型给BaseCalculator扩展2个对象方法
BaseCalculator.prototype.add = function (x, y) {
    return x + y;
};
 
BaseCalculator.prototype.subtract = function (x, y) {
    return x - y;
};
```

首先，声明了一个`BaseCalculator`对象，构造函数里会初始化一个小数位数的属性`decimalDigits`；

然后通过原型属性设置2个`function`，分别是`add(x,y)`和`subtract(x,y)`

当然你也可以使用前面提到的2种方式的任何一种，我们的主要目的是看如何将`BaseCalculator`对象设置到真正的`Calculator`的原型上。

```javascript
var BaseCalculator = function() {
    this.decimalDigits = 2;
};
 
BaseCalculator.prototype = {
    add: function(x, y) {
        return x + y;
    },
    subtract: function(x, y) {
        return x - y;
    }
};
```

创建完上述代码以后，我们来开始：

```javascript
var Calculator = function () {
    //为每个实例都声明一个税收数字
    this.tax = 5;
};
        
Calculator.prototype = new BaseCalculator();
```

我们可以看到`Calculator`的原型是指向到`BaseCalculator`的一个实例上，目的是让`Calculator`集成它的`add(x,y)`和`subtract(x,y)`这2个`function`；

<img src="1.jpg" alt="">

还有一点要说的是，由于它的原型是`BaseCalculator`的一个实例，所以不管你创建多少个`Calculator`对象实例，他们的原型指向的都是同一个实例。

```javascript
var calc = new Calculator();
alert(calc.add(1, 1));
//BaseCalculator 里声明的decimalDigits属性，在 Calculator里是可以访问到的
alert(calc.decimalDigits);
```

上面的代码，运行以后，我们可以看到因为`Calculator`的原型是指向`BaseCalculator`的实例上的，所以可以访问他的`decimalDigits`属性值。

那如果我不想让`Calculator`访问`BaseCalculator`的构造函数里声明的属性值，那怎么办呢？

这么办：

```javascript
var Calculator = function () {
    this.tax= 5;
};
 
Calculator.prototype = BaseCalculator.prototype;
```

<img src="2.jpg" alt="">

### 重写原型

我们可以通过继续声明的同样的`add`代码的形式来达到覆盖重写前面的`add`功能，代码如下：

```javascript
//覆盖前面Calculator的add() function
Calculator.prototype.add = function (x, y) {
    return x + y + this.tax;
};
 
var calc = new Calculator();
alert(calc.add(1, 1));
```

这样，我们计算得出的结果就比原来多出了一个`tax`的值，但是有一点需要注意：那就是重写的代码需要放在最后，这样才能覆盖前面的代码。

## 原型链

在将原型链之前，我们先上一段代码：

```javascript
function Foo() {
    this.value = 42;
}
Foo.prototype = {
    method: function() {}
};
 
function Bar() {}
 
// 设置Bar的prototype属性为Foo的实例对象
Bar.prototype = new Foo();
Bar.prototype.foo = 'Hello World';
 
// 修正Bar.prototype.constructor为Bar本身
Bar.prototype.constructor = Bar;
 
var test = new Bar() // 创建Bar的一个新实例
 
// 原型链
test [Bar的实例]
    Bar.prototype [Foo的实例]
        { foo: 'Hello World' }
        Foo.prototype
            {method: ...};
            Object.prototype
                {toString: ... /* etc. */};
```

<img src="3.jpg" alt="">

上面的例子中，`test` 对象从 `Bar.prototype` 和 `Foo.prototype` 继承下来；因此，它能访问 `Foo` 的原型方法 `method`。

同时，它也能够访问那个定义在原型上的 `Foo` 实例属性 `value`。

需要注意的是 `new` `Bar()` 不会创造出一个新的 `Foo` 实例，而是重复使用它原型上的那个实例；

因此，所有的 `Bar` 实例都会共享相同的 `value` 属性。

### 图解

每当你去定义一个函数的 `prototype` 的时候，相当于把该实例的` __proto__`指向一个结构体，那么这个被指向结构体就称为该实例的原型。

```javascript
var foo = { 
    x: 10, 
    y: 20 
}; 
```

<img src="4.jpg" alt="">

不指定`__proto__`的时候，`foo`也会预留一个这样的属性， 

如果有明确的指向，那么这个链表就链起来啦。 

```javascript
var a = { 
    x: 10, 
    calculate: function (z) { 
    return this.x + this.y + z 
} 
}; 
var b = { 
    y: 20, 
    __proto__: a 
}; 

var c = { 
    y: 30, 
    __proto__: a 
}; 

// call the inherited method 
b.calculate(30); // 60 
```

<img src="5.jpg" alt="">

`b`和`c`共享`a`的属性和方法，同时又有自己的私有属性。 

`a` 的 `__proto__`默认的也有指向，它指向的是最高级的`object.prototype`，而`object.prototype`的`__proto__`为空。

<img src="6.jpg" alt="">

#### 理解constructor

```js
function Foo(y){ 
    this.y = y ; 
} 

Foo.prototype.x = 10; 

Foo.prototype.calculate = function(z){ 
    return this.x+this.y+z; 
}; 

var b = new Foo(20); 

alert(b.calculate(30)); 
```

<img src="7.jpg" alt="">

<img src="8.jpg" alt="">

### 属性查找

当查找一个对象的属性时，JavaScript 会向上遍历原型链，直到找到给定名称的属性为止，到查找到达原型链的顶部 - 也就是 `Object.prototype` - 但是仍然没有找到指定的属性，就会返回 `undefined`，我们来看一个例子：

```javascript
function foo() {
    this.add = function (x, y) {
        return x + y;
    }
}
 
foo.prototype.add = function (x, y) {
    return x + y + 10;
}
 
Object.prototype.subtract = function (x, y) {
    return x - y;
}
 
var f = new foo();
alert(f.add(1, 2)); //结果是3，而不是13
alert(f.subtract(1, 2)); //结果是-1
```

通过代码运行，我们发现`subtract`是安装我们所说的向上查找来得到结果的，但是`add`方式有点小不同，这也是我想强调的，就是属性在查找的时候是`先查找自身的属性`，如果没有再查找原型，再没有，再往上走，一直插到`Object`的原型上。

所以在某种层面上说，用 `for in` 语句遍历属性的时候，效率也是个问题。

> 使用`for..in`遍历对象时原理和查找`[[Prototype]]`链类似，任何可以通过原型链访问到（并且是`enumerable`）的属性都会被枚举。

> 使用`in`操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链（无论属性是否可枚举）。

还有一点我们需要注意的是，我们可以赋值任何类型的对象到原型上，但是不能赋值原始类型的值，比如如下代码是无效的：

```javascript
function Foo() {}
Foo.prototype = 1; // 无效
```

### hasOwnProperty 函数

`hasOwnProperty` 是 `Object.prototype` 的一个方法，它可是个好东西，他能判断一个对象是否包含自定义属性而不是原型链上的属性，因为 `hasOwnProperty` 是 JavaScript 中唯一一个 **处理属性但是不查找原型链**的函数。

```javascript
// 修改Object.prototype
Object.prototype.bar = 1;
var foo = {goo: undefined};
 
foo.bar; // 1
'bar' in foo; // true
 
foo.hasOwnProperty('bar'); // false
foo.hasOwnProperty('goo'); // true
```

只有 `hasOwnProperty` 可以给出正确和期望的结果，这在遍历对象的属性时会很有用。

没有其它方法可以用来排除原型链上的属性，而不是定义在对象自身上的属性。

但有个恶心的地方是：JavaScript 不会保护 `hasOwnProperty` 被非法占用，因此如果一个对象碰巧存在这个属性，就需要使用外部的 `hasOwnProperty` 函数来获取正确的结果。

```javascript
var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};
 
foo.hasOwnProperty('bar'); // 总是返回 false
 
// 使用{}对象的 hasOwnProperty，并将其上下为设置为foo
{}.hasOwnProperty.call(foo, 'bar'); // true
```

**但有个恶心的地方是：**JavaScript 不会保护 `hasOwnProperty `被非法占用，因此如果一个对象碰巧存在这个属性，就需要使用外部的 `hasOwnProperty` 函数来获取正确的结果。

```javascript
var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};
 
foo.hasOwnProperty('bar'); // 总是返回 false
 
// 使用{}对象的 hasOwnProperty，并将其上下为设置为foo
{}.hasOwnProperty.call(foo, 'bar'); // true
```

当检查对象上某个属性是否存在时，`hasOwnProperty` 是唯一可用的方法。

同时在使用 `for in loop` 遍历对象时，推荐总是使用 `hasOwnProperty` 方法，这将会避免原型对象扩展带来的干扰，我们来看一下例子：

```javascript
// 修改 Object.prototype
Object.prototype.bar = 1;
 
var foo = {moo: 2};
for(var i in foo) {
    console.log(i); // 输出两个属性：bar 和 moo
}
```

我们没办法改变`for in`语句的行为，所以想过滤结果就只能使用`hasOwnProperty` 方法，代码如下：

```javascript
// foo 变量是上例中的
for(var i in foo) {
    if (foo.hasOwnProperty(i)) {
        console.log(i);
    }
}
```









