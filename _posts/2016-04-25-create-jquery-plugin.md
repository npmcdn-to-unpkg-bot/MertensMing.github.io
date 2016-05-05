---
title: 开发一个 jQuery 插件
date: 2016-04-25 19:51:06
categories: JavaScript
tags: [jQuery, JavaScript]
---

参考：

[慕课网 - 全屏切换效果](http://www.imooc.com/learn/374)

# jQuery 插件开发

## 基础知识整理

这篇笔记是我学习慕课网的[全屏切换效果](http://www.imooc.com/learn/374)教程写的一篇笔记，笔记的大部分内容来源于慕课网上老师讲的知识点，本文整理了一下老师讲课的思路，将视频上的知识点根据本人的理解，分好目录记录了下来。

本人学习这个课程，对制作插件的思路，如何暴露接口等，都有了进一步的理解和体会，希望有缘看到这篇文章的同学，也能收获自己想要的知识。

<!-- more -->

### 闭包的作用

```javascript
(function($){
    // do something
})(jQuery)

/**
* 闭包的作用
* 1. 避免全局依赖
* 2. 避免第三方破坏
* 3. 兼容 jQuery 操作符 '$' 和 JQuery
*/
```

### 开发方式

#### 类级别组件开发（静态方法）

给 jQuery 命名空间下添加新的全局函数，也称为静态方法。

```javascript
jQuery.myPlugin = function(){
    // do something
}
```

例如 `$ajax()` `$extend()` 等方法

#### 对象级别组件开发（动态方法）

挂在 jQuery 原型下的方法，这样通过选择器获取的 jQuery 对象实例也能共享该方法，也称为动态方法。

```javascript
$.fn.myPlugin = function(){
    // do something
}
// $.fn === $.prototype
```

例如： `addClass()` `attr()`，需要创建实例来调用

#### 链式调用

```javascript
// 链式调用
$('div').next().addClass();

// return this 返回当前对象，来维护插件的链式调用
// each 实现每个元素的循环访问
$.fn.myPlugin = function(){
    return this.each(function(){
        // do something
    });
}
```

#### 单例模式

```javascript
$.fn.myPlugin = function(){
    var me = $(this);
    var instance = me.data('myPlugin');
    if(!instance){
        me.data('myPlugin', (instance = new myPlugin()));
    }
}

// 如果实例存在，则不重新创建实例
// 利用 data() 来存放插件对象的实例
```

## 开发插件的框架

接下来，我们采用动态的开发方式，开发一个全屏切换的插件

### 在原型上创建一个方法

```javascript
(function($) {
    $.fn.pageSwitch = function() {

    };
})(jQuery);
```

### 添加默认配置参数

<div style="overflow: hidden;"><img style="float: left" src="1.jpg"></div>

```javascript
(function($) {
    $.fn.pageSwitch = function() {

    };
    // 添加默认的配置参数
    $.fn.pageSwitch.default = {
        selectors: {
            sections: '.sections',
            section: '.section',
            page: '.pages', // 分页
            active: '.active' // 分页被选中时添加的 class
        },
        index: 0, // 对应页面开始的索引值
        easing: 'ease', // 动画的效果
        duration: 500, // 动画执行的时间
        loop: false, // 是否循环播放
        pagination: true, // 是否进行分页处理
        keyboard: true, // 是否触发键盘事件
        direction: 'vertical',
        callback: '' // 实现完滑屏动画之后，调用的回调函数
    }
})(jQuery);
```

### 插件的主体

```javascript
(function($) {
    $.fn.pageSwitch = function(options) {
        // 实现循环调用
        return this.each(function() {
            // 单例模式
            var me = $(this);
            var instance = me.data('PageSwitch');
            if(!instance){
                instance = new PageSwitch(me, options);
                me.data('PageSwitch', instance);
            }
        });
    };
    // 添加默认的配置参数
    $.fn.pageSwitch.default = {
        // 默认配置参数
    }
})(jQuery);
```

### 实现 PageSwitch 对象

#### 创建一个造函数

```javascript
(function($) {
    // 1. 创建这个对象
    var PageSwitch = (function() {
        // 2. 定义一个与对象名相同的方法
        function PageSwitch(element, options) {
            // 3. 合并参数
            this.settings = $.extend(true, $.fn.pageSwitch.default, options || {});
            // 4. 存放这个参数
            this.element = element;
            // 6.初始化插件
            this.init();
        }
        // 在构造函数的原型上定义一些列的方法
        pageSwitch.prototype = {
            init: function(){}
        }
        return PageSwitch;
    })();

    $.fn.pageSwitch = function(options) {
        // do something
    };
    
    $.fn.pageSwitch.default = {
        // 添加默认的配置参数
    }
})(jQuery);
```

### 暴露插件上方法的接口

```javascript
(function($) {
    // 1. 创建这个对象
    var PageSwitch = (function() {})();
    $.fn.pageSwitch = function(options) {
        // 1. 实现循环调用
        return this.each(function() {
            // 2. 单例模式
            var me = $(this);
            var instance = me.data('PageSwitch');
            if (!instance) {
                instance = new PageSwitch(me, options);
                me.data('PageSwitch', instance);
            }
            // 3. 如果传入字符串，则调用插件上的方法
            if($.type(options) === 'string') return instance[options]();

        });
    };
    // 添加默认的配置参数
    $.fn.pageSwitch.default = {}
})(jQuery);
```

### 初始化插件

插件内部的初始化函数，在创建实例的时候就被调用

```javascript
PageSwitch.prototype = {
    /*初始化 DMO 结构，布局，分页以及绑定事件*/
    init: function() {
        var me = this;
        me.selectors = me.settings.selectors;

        // 1. 获取页面结构
        me.sections = $(me.selectors.sections);
        me.section = $(me.selectors.section);

        // 2. 初始化方向
        me.direction = me.settings.direction === 'vertical' ? true : false;

        // 3. 获取页面的数量
        me.pagesCount = me.pagesCount();

        // 4. 获取 index 值
        me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ?
            me.settings.index : 0;

        // 5. 如果是横屏，初始化布局
        if (!me.direction) {
            me._initLayout();
        }

        // 6. 绑定事件
        me._initEvent();

        // 7. 动画锁
        me.canScroll = true;
    }
}
```

### 调用插件

初始化插件有两种方法：

#### 在插件外部调用

一种方法是在插件外部调用，这样的优点是可以自定义插件的参数。

```html
<script>
    $('div').pageSwitch();
</script>
```

#### 在插件内部调用

另一种方法是在插件的内部调用。

首先，在 HTML 上设置一个 `data-` 属性

```html
<div data-PageSwitch></div>
```

```javascript
(function($) {
    // 1. 创建这个对象
    var PageSwitch = (function() {})();
    $.fn.pageSwitch = function(options) {};
    // 添加默认的配置参数
    $.fn.pageSwitch.default = {}

    // 在插件内部，通过之前设置的属性，找到该元素，调用插件
    (function(){
        $(['data-Pageswitch']).pageSwitch();
    })();
})(jQuery);
```













