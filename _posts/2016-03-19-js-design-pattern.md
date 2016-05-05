---
title: JavaScript 设计模式学习笔记
date: 2016-03-19 12:07:42
categories: JavaScript
tags: 设计模式
---

## 一些必要的基础知识

### JavaScript闭包

1. 闭包最常用的方式就是返回一个内联函数( **何为内联函数? 就是在函数内部声明的函数** );
2. 我们有时候需要得到函数内部的变量，这时我们就可以创建一个闭包，用来在外部访问这个变量。
3. 闭包的用途 主要就是上一点提到的读取函数内部变量，还有一个作用就是可以使这些变量一直保存在内存中。
4. 使用闭包要注意，由于变量被保存在内存中，所以会对内存造成消耗，所以不能滥用闭包。解决方法是 在退出函数之前，将不使用的局部变量全部删除。

```js
function f() {
    var n = 999;
    function f1 () {
        alert(n += 1);
    }
    return f1;
}
var result = f();
result(); 
```

<!-- more -->

### 封装

通过将一个方法或者属性声明为私用的，可以让对象的实现细节对其他对象保密以降低对象之间的耦合程度，可以保持数据的完整性并对其修改方式加以约束，这样可以是代码更可靠，更易于调试。封装是面向对象的设计的基石。

下面还是通过一套完整的代码去分析，介绍什么是私有属性和方法，什么是特权属性和方法，什么是公有属性和方法，什么是公有静态属性和方法。

#### 私有属性和方法

函数有作用域，在函数内用 `var` 关键字声明的变量在外部无法访问，私有属性和方法本质就是你希望在对象外部无法访问的变量。

#### 特权属性和方法

创建属性和方法时使用 `this` 关键字，因为这些方法定义在构造器的作用域中所以它们可以访问到私有属性和方法；

只有那些需要直接访问私有成员的方法才应该被设计为特权方法。

#### 共有属性和方法

直接链在 `prototype` 上的属性和方法，不可以访问构造器内的私有成员，可以访问特权成员，子类会继承所有的共有方法。

#### 共有静态属性和方法

最好的方式就是把它想象成一个命名空间，实际上相当于把构造器作为命名空间来使用。

#### 代码示例

```js
var _packaging = function () {
    // 私有属性和方法
    var name = 'mertens';
    var method1 = function () {
        // ...
    }
    // 特权属性和方法
    this.title = 'JavaScript Design Patterns';
    this.getName = function () {
        // 访问私有属性
        return name; 
    }
}

// 共有静态属性和方法
_packaging._name = 'Mertens code';
_packaging.alertName = function () {
    alert(_packaging._name);
}

// 共有属性和方法
_packaging.prototype = {
    init: function () {
        // ...
    }
}
```

### 继承

在 JavaScript 想要实现继承有两种实现方式，分别是类式继承和原型式继承。

#### 类式继承

```js
// 先声明一个超类
function Person (name) {
    this.name = name;
}
// 给这个超类的原型对象上添加方法 getName
Person.prototype.getName = function () {
    return this.name;
}

// 实例化这个超类
var a = new Person('mertens');
console.log(a.getName());

// 再声明类
function Programmer (name, sex) {
    Person.call(this, name);
    this.sex = sex;
}
// 这个子类的原型对象等于超类的实例
Programmer.prototype = new Person();

// 因为子类的原型对象等于超类的实例
// 所以prototype.constructor这个方法也等于超类构造函数 Person
// 要从新赋值为自己本身
Programmer.prototype.constructor = Programmer;

// 子类本身添加了 getSex 方法
Programmer.prototype.getSex = function () {
    return this.sex;
}

// 实例化这个子类
var _m = new Programmer('mertens1', 'male');

console.dir(_m);
```

类式继承模式是JavaScript继承主要的模式，几乎所有用面向对象方式编写的JavaScript代码中都用到了这种继承，又因为在各种流行语言中只有JavaScript使用原型式继承，因此最好还是使用类式继承。

可是要熟悉JavaScript语言，原型继承也是我们必须所了解的，至于在项目中是否使用就得看个人编码风格了。

#### 原型式继承

```js
// clone() 函数用来创建新的类 Person 对象
 var clone = function (obj) {
    var _f = function () {
        // ...
    };
    // 这句是原型继承最核心的地方
    _f.prototype = obj;
    return new _f;
 }

 // 先声明一个字面量对象
 var Person = {
    name: 'mertens',
    getName: function () {
        return this.name;
    }
 };

 //不需要定义一个Person的子类，只要执行一次克隆即可
 var Programmer = clone(Person);

 console.dir(Programmer);

 //声明子类,执行一次克隆即可
 var Someone = clone(Programmer);

 console.dir(Someone);
```

## JavaScript设计模式的作用

**提高代码的重用性，可读性，使代码更容易的维护和扩展。**

## JavaScript设计模式都有哪些?

### 单体（Singleton）模式

JavaScript 中最基本最有用的模式。

单体在 JavaScript 中有多种用途，可以用来划分命名空间，减少网页中全局变量的数量，可以在多人开发时避免代码的冲突（使用合理的命名空间）等等。

在中小型项目或功能中，单体可以用作命名空间把自己的代码组织在一个全局变量名下；

在稍大型或者复杂的功能中，单体可以用来把相关代码组织在一起以便日后维护。

使用单体的方法就是用一个命名空间包含自己的所有代码的全局对象，示例：

```js
 var functionGroup = {
    name: 'mertens',
    method1: function () {
        // code
    },
    init: function () {
        // code
    }
 }
```

### 工厂（Factory）模式

**提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。**

工厂就是把成员对象的创建工作转交给一个外部对象，好处在于消除对象之间的耦合(何为耦合?就是相互影响)。

通过使用工厂方法而不是`new`关键字及具体类，可以把所有实例化的代码都集中在一个位置，有助于创建模块化的代码，这才是工厂模式的目的和优势。

举个例子：你有一个大的功能要做，其中有一部分是要考虑扩展性的，那么这部分代码就可以考虑抽象出来，当做一个全新的对象做处理。

好处就是将来扩展的时候容易维护 - 只需要操作这个对象内部方法和属性，达到了动态实现的目的。

#### 简单工厂模式

非常有名的一个示例 - XHR工厂：

```js
//这是一个简单工厂模式
var XMLHttpFactory = function(){};
XMLHttpFactory.createXMLHttp = function(){ 
    var XMLHttp = null;
    if (window.XMLHttpRequest){
        XMLHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject){ 
        XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return XMLHttp;
}
//XMLHttpFactory.createXMLHttp()这个方法根据当前环境的具体情况返回一个XHR对象。
var AjaxHander = function(){ 
    var XMLHttp = XMLHttpFactory.createXMLHttp();
    // ...
}
```

#### 抽象工厂模式

工厂模式又区分简单工厂模式和抽象工厂模式，上面介绍的是简单工厂模式，这种模式用的更多也更简单易用。

抽象工厂模式的使用方法就是 - 先设计一个抽象类，这个类不能被实例化，只能用来派生子类，最后通过对子类的扩展实现工厂方法。 示例：

```js
var XMLHttpFactory = function(){};　     //这是一个抽象工厂模式  
XMLHttpFactory.prototype = {  
    //如果真的要调用这个方法会抛出一个错误，它不能被实例化，只能用来派生子类  
    createFactory:function(){  
       throw new Error('This is an abstract class');  
    }  
 }  
//派生子类，文章开始处有基础介绍那有讲解继承的模式，不明白可以去参考原理  
 var XHRHandler = function(){  
    XMLHttpFactory.call(this);  
 };  
XHRHandler.prototype = new XMLHttpFactory();  
XHRHandler.prototype.constructor = XHRHandler;  
//重新定义createFactory 方法  
XHRHandler.prototype.createFactory = function(){  
    var XMLHttp = null;  
    if (window.XMLHttpRequest){  
       XMLHttp = new XMLHttpRequest()  
    }else if (window.ActiveXObject){  
       XMLHttp = new ActiveXObject("Microsoft.XMLHTTP")  
    }  
    return XMLHttp;  
} 
```

### 桥接(bridge)模式

在实现API的时候，桥梁模式灰常有用。在所有模式中，这种模式最容易立即付诸实施。

桥梁模式可以用来弱化它与使用它的类和对象之间的耦合，就是将抽象与其实现隔离开来，以便二者独立变化;

这种模式对于JavaScript中常见的时间驱动的编程有很大益处，桥梁模式最常见和实际的应用场合之一是时间监听器回调函数。

先分析一个不好的示例：

```js
element.onclick = function(){  
    new setLogFunc();  
 }; 
```

为什么说这个示例不好，因为从这段代码中无法看出那个`LogFunc`方法要显示在什么地方，它有什么可配置的选项以及应该怎么去修改它。

换一种说法就是，桥梁模式的要诀就是让接口“可桥梁”，实际上也就是`可配置`。

把页面中一个个功能都想象成模块，接口可以使得模块之间的耦合降低。

桥梁模式目的就是让`API`更加健壮，提高组件的模块化程度，促成更简洁的实现，并提高抽象的灵活性。

一个好的示例：

```js
element.onclick = function(){
    //API可控制性提高了，使得这个API更加健壮  
    new someFunction(element,param,callback);  
} 
```

**注：桥梁模式还可以用于连接公开的API代码和私有的实现代码，还可以把多个类连接在一起。**

特权方法，也是桥梁模式的一种特例。

《JS设计模式》上找的示例，加深大家对这个模式的理解：

```js
// 错误的方式  
// 这个API根据事件监听器回调函数的工作机制
// 事件对象被作为参数传递给这个函数
// 本例中并没有使用这个参数，而只是从this对象获取ID。  
 addEvent(element,'click',getBeerById);  
 function getBeerById(e){  
    var id = this.id;  
    asyncRequest('GET','beer.url?id=' + id,function(resp){  
       //Callback response  
       console.log('Requested Beer: ' + resp.responseText);  
    });  
 }  
   
 // 好的方式  
 // 从逻辑上分析，把id传给getBeerById函数式合情理的
 // 且回应结果总是通过一个毁掉函数返回
 // 这么理解，我们现在做的是针对接口而不是实现进行编程，用桥梁模式把抽象隔离开来。  
 function getBeerById(id,callback){  
    asyncRequest('GET','beer.url?id=' + id,function(resp){  
       callback(resp.responseText)  
    });  
 }  
 addEvent(element,'click',getBeerByIdBridge);  
 function getBeerByIdBridge(e){  
    getBeerById(this.id,function(beer){  
       console.log('Requested Beer: ' + beer);  
    });  
 }　
```

### 装饰者(Decorator)模式

**这个模式就是为对象增加功能(或方法)。**

动态地给一个对象添加一些额外的职责。就扩展功能而言，它比生成子类方式更为灵活。

装饰者模式和组合模式有很多共同点，它们都与所包装的对象实现统一的接口并且会把任何方法调用传递给这些对象。

可是组合模式用于把众多子对象组织为一个整体，而装饰者模式用于在不修改现有对象或从派生子类的前提下为其添加方法。

装饰者的运作过程是透明的，这就是说你可以用它包装其他对象，然后继续按之前使用那么对象的方法来使用，从下面的例子中就可以看出。还是从代码中理解吧：

```js
 //创建一个命名空间为myText.Decorations  
 var myText= {};  
 myText.Decorations={};  
 myText.Core=function(myString){  
    this.show = function(){
        return myString;
    }  
 }  

 //第一次装饰  
 myText.Decorations.addQuestuibMark =function(myString){  
    this.show = function(){
        return myString.show()+'?';
    };  
 }  

 //第二次装饰  
 myText.Decorations.makeItalic = function(myString){  
    this.show = function(){
        return '<li>'+myString.show()+'</li>';
    };  
 } 

 //得到myText.Core的实例  
 var theString = new myText.Core('this is a sample test String');  

 alert(theString.show());
 //output 'this is a sample test String'  
 theString = new myText.Decorations.addQuestuibMark(theString);  
 alert(theString.show());
 //output 'this is a sample test String?'  
 theString = new myText.Decorations.makeItalic (theString);  
 alert(theString.show());
 //output '<li>this is a sample test String</li>'
```
