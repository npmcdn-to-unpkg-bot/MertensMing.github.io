---
title: 类型识别的四个方法
date: 2016-03-06 22:26:07
categories: JavaScript
tags: 类型识别
---
## 标准类型和对象类型
- 标准类型有：`undefined` `Null` `Boolean` `Date` `Number` `Object`
- 对象类型（构造器类型）：`Boolean` `Date` `Number` `Object` `Array` `Date` `Error` `Function` `RegExp`

## 类型识别
- `typeof`
- `Object.prorotype.toString`
- `constructor`
- `instanceof`

<!--more-->

## typeof
- 可以是标准类型
- 不可识别具体的对象类型（Function 除外）
### 语法
```javascript
typeof operand
// operand 是一个表达式，表示对象或原始值，其类型被返回
```
### `typeof` 可能的返回值

类型 | 结构
:---------|:------------
Undefined | "undefined"
Null | "object"
布尔值 | "boolean"
数值 | "number"
字符串 | "string"
Symbol (ECMAScript 6 新增) | "symbol"
宿主对象(JS环境提供的，比如浏览器) | Implementation-dependent
函数对象 (implements [[Call]] in ECMA-262 terms)  | "function"
任何其他对象 | "object"

### 常规用法

```javascript
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写,意思是"不是一个数字"
typeof Number(1) === 'number'; // 不要这样使用!

// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof返回的肯定是一个字符串
typeof String("abc") === 'string'; // 不要这样使用!

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // 不要这样使用!

// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';

// Undefined
typeof undefined === 'undefined';
typeof blabla === 'undefined'; // 一个未定义的变量,或者一个定义了却未赋初值的变量

// Objects
typeof {a:1} === 'object';

// 使用Array.isArray或者Object.prototype.toString.call方法可以从基本的对象中区分出数组类型
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';

// 下面的容易令人迷惑，不要这样使用！
typeof new Boolean(true) === 'object';
typeof new Number(1) ==== 'object';
typeof new String("abc") === 'object';

// 函数
typeof function(){} === 'function';
typeof Math.sin === 'function';
```
### 关于 null
```javascript
typeof null === 'object';
```
### 关于正则，在某些浏览器中不符合标准
```javascript
typeof /s/ === 'function'; // Chrome 1-12 , 不符合 ECMAScript 5.1
typeof /s/ === 'object'; // Firefox 5+ , 符合 ECMAScript 5.1
```

## Object.prototype.toString
- `toString()` 方法返回一个代表该对象的字符串。
- 可以识别标准类型及内置对象类型（例如，Object, Date, Array）
- 不能识别自定义对象类型

### 语法

```javascript
object.toString()
```
- 当对象需要转换为字符串时，会调用它的 `toString()` 方法。
- 默认情况下，每个对象都会从 `Object`上继承到 `toString()` 方法，如果这个方法没有被这个对象自身或者更接近的上层原型上的同名方法覆盖(遮蔽)，则调用该对象的 `toString()` 方法时会返回 `"[object type]"` ，这里的字符串 `type` 表示了一个对象类型。
- 下面的代码演示了这一点：

```javascript
var o = new Object();
o.toString();           // 返回了[object Object]
```

### 使用 `toString()` 方法来检测对象类型

```javascript
var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]

//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
```

## Object.prototype.constructor
- 可以识别标准类型（Undefined/Null 除外）
- 可识别内置对象类型
- 可识别自定义对象类型
```javascript
function getConstructiorName(obj) {
  return obj && obj.constructor && obj.constructor.toString().match(/function\s*([^(]*)/)[1];
}
getConstructiorName([]) === "Array"; // true
```

## instanceof
- 不可判别原始类型
- 可判别内置对象类型
- 可判别自定义对象类型
###语法
- `object instanceof constructor`
- `instanceof` 运算符用来检测 `constructor.prototype` 是否存在于参数 `object` 的原型链上。

```javascript
// 定义构造函数
function C(){} 
function D(){} 

var o = new C();

// true，因为 Object.getPrototypeOf(o) === C.prototype
o instanceof C; 

// false，因为 D.prototype不在o的原型链上
o instanceof D; 

o instanceof Object; // true,因为Object.prototype.isPrototypeOf(o)返回true
C.prototype instanceof Object // true,同上

C.prototype = {};
var o2 = new C();

o2 instanceof C; // true

o instanceof C; // false,C.prototype指向了一个空对象,这个空对象不在o的原型链上.

D.prototype = new C(); // 继承
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true
```
 
## 下面我们写一个HTML来检验一下：

![js 类型检测的四个方法][1]

```html
<html>
<head>
    <title>JavaScript类型判断</title>
    <meta charset="utf-8">
    <style type="text/css">
        .red{
            background-color:red;
        }
    </style>
</head>
<body>
    <script type="text/javascript">
        /* Standard Type */
        var a;    //undefined
        var b = document.getElementById("no_exist_element"); //null
        var c = true;    //Boolean
        var d = 1;    //Number
        var e = "str";     //String
        var f = {name : "Tom"};    //Object

        /* Object Type */
        var g = new Boolean(true);    //Boolean Object
        var h = new Number(1);    //Number Object
        var i = new String("str");    //String Object
        var j = new Object({name : "Tom"}); //Object Object
        var k = new Array([1, 2, 3, 4]);    //Array Object
        var l = new Date();    //Date Object
        var m = new Error();
        var n = new Function();
        var o = new RegExp("\\d");

        /* Self-Defined Object Type */
        function Point(x, y) {
          this.x = x;
          this.y = y;
        }

        Point.prototype.move = function(x, y) {
          this.x += x;
          this.y += y;
        }

        var p = new Point(1, 2);

        /* Use the Prototype.toString() to judge the type */
        function type(obj){
            return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        }
    </script>
    <table border="1" cellspacing="0">
        <tr>
            <td></td>
            <td>typeof</td>
            <td>toString</td>
            <td>constructor</td>
            <td>instanceof</td>
        </tr>
        <tr>
            <td>undefined</td>
            <td><script type="text/javascript">document.write(typeof a)</script></td>
            <td><script type="text/javascript">document.write(type(a))</script></td>
            <td class="red"><script type="text/javascript">document.write(a.constructor)</script></td>
            <td class="red"><script type="text/javascript">document.write(a instanceof "undefined")</script></td>
        </tr>
        <tr>
            <td>Null</td>
            <td class="red"><script type="text/javascript">document.write(typeof b);</script></td>
            <td><script type="text/javascript">document.write(type(b));</script></td>
            <td class="red"><script type="text/javascript">document.write(b.constructor);</script></td>
            <td class="red"><script type="text/javascript">document.write(b instanceof "null");</script></td>
        </tr>
        <tr>
            <td>Boolean</td>
            <td><script type="text/javascript">document.write(typeof c);</script></td>
            <td><script type="text/javascript">document.write(type(c));</script></td>
            <td><script type="text/javascript">document.write(c.constructor);</script></td>
            <td class="red"><script type="text/javascript">document.write(c instanceof "boolean");</script></td>
        </tr>
        <tr>
            <td>Number</td>
            <td><script type="text/javascript">document.write(typeof d);</script></td>
            <td><script type="text/javascript">document.write(type(d));</script></td>
            <td><script type="text/javascript">document.write(d.constructor);</script></td>
            <td class="red"><script type="text/javascript">document.write(d instanceof "number");</script></td>
        </tr>
        <tr>
            <td>String</td>
            <td><script type="text/javascript">document.write(typeof e);</script></td>
            <td><script type="text/javascript">document.write(type(e));</script></td>
            <td><script type="text/javascript">document.write(e.constructor);</script></td>
            <td class="red"><script type="text/javascript">document.write(e instanceof "string");</script></td>
        </tr>
        <tr>
            <td>Object</td>
            <td><script type="text/javascript">document.write(typeof f);</script></td>
            <td><script type="text/javascript">document.write(type(f));</script></td>
            <td><script type="text/javascript">document.write(f.constructor);</script></td>
            <td class="red"><script type="text/javascript">document.write(f instanceof "object");</script></td>
        </tr>
        <tr><td colspan="5">-----------------------</td></tr>
        <tr>
            <td>Boolean Object</td>
            <td class="red"><script type="text/javascript">document.write(typeof g);</script></td>
            <td><script type="text/javascript">document.write(type(g));</script></td>
            <td><script type="text/javascript">document.write(g.constructor);</script></td>
            <td><script type="text/javascript">document.write(g instanceof Boolean);</script></td>
        </tr>
        <tr>
            <td>Number Object</td>
            <td class="red"><script type="text/javascript">document.write(typeof h);</script></td>
            <td><script type="text/javascript">document.write(type(h));</script></td>
            <td><script type="text/javascript">document.write(h.constructor);</script></td>
            <td><script type="text/javascript">document.write(h instanceof Number);</script></td>
        </tr>
        <tr>
            <td>String Object</td>
            <td class="red"><script type="text/javascript">document.write(typeof i);</script></td>
            <td><script type="text/javascript">document.write(type(i));</script></td>
            <td><script type="text/javascript">document.write(i.constructor);</script></td>
            <td><script type="text/javascript">document.write(i instanceof String);</script></td>
        </tr>
        <tr>
            <td>Object Object</td>
            <td class="red"><script type="text/javascript">document.write(typeof j);</script></td>
            <td><script type="text/javascript">document.write(type(j));</script></td>
            <td><script type="text/javascript">document.write(j.constructor);</script></td>
            <td><script type="text/javascript">document.write(j instanceof Object);</script></td>
        </tr>
        <tr>
            <td>Array Object</td>
            <td class="red"><script type="text/javascript">document.write(typeof k);</script></td>
            <td><script type="text/javascript">document.write(type(k));</script></td>
            <td><script type="text/javascript">document.write(k.constructor);</script></td>
            <td><script type="text/javascript">document.write(k instanceof Array);</script></td>
        </tr>
        <tr>
            <td>Date Object</td>
            <td class="red"><script type="text/javascript">document.write(typeof l);</script></td>
            <td><script type="text/javascript">document.write(type(l));</script></td>
            <td><script type="text/javascript">document.write(l.constructor);</script></td>
            <td><script type="text/javascript">document.write(l instanceof Date);</script></td>
        </tr>
        <tr>
            <td>Error Object</td>
            <td class="red"><script type="text/javascript">document.write(typeof m);</script></td>
            <td><script type="text/javascript">document.write(type(m));</script></td>
            <td><script type="text/javascript">document.write(m.constructor);</script></td>
            <td><script type="text/javascript">document.write(m instanceof Error);</script></td>
        </tr>
        <tr>
            <td>Function Object</td>
            <td><script type="text/javascript">document.write(typeof n);</script></td>
            <td><script type="text/javascript">document.write(type(n));</script></td>
            <td><script type="text/javascript">document.write(n.constructor);</script></td>
            <td><script type="text/javascript">document.write(n instanceof Function);</script></td>
        </tr>
        <tr>
            <td>RegExp Object</td>
            <td class="red"><script type="text/javascript">document.write(typeof o);</script></td>
            <td><script type="text/javascript">document.write(type(o));</script></td>
            <td><script type="text/javascript">document.write(o.constructor);</script></td>
            <td><script type="text/javascript">document.write(o instanceof RegExp);</script></td>
        </tr>
        <tr><td colspan="5">-----------------------</td></tr>
        <tr>
            <td>Point Objct</td>
            <td class="red"><script type="text/javascript">document.write(typeof p);</script></td>
            <td class="red"><script type="text/javascript">document.write(type(p));</script></td>
            <td><script type="text/javascript">document.write(p.constructor);</script></td>
            <td><script type="text/javascript">document.write(p instanceof Point);</script></td>
        </tr>
    </table>
</body>
</html>
```

[1]: http://static.zybuluo.com/mertens/mwr1va7r59qbn7f3lf4szcpk/pic.jpg