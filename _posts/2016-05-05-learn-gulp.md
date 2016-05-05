---
title: Gulp 入门 —— 安装到运行
date: 2016-05-05 15:40:12
tags: [前端自动化]
---
**学习资料**

[Gulp详细入门教程](http://www.ydcss.com/archives/18)

## 简介

`Gulp`是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；

1. 她不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；
2. 使用她，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率。

`Gulp`是基于`Nodejs`的自动任务运行器， 她能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的`测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成`，`并监听文件在改动后重复指定的这些步骤`。

本示例以`Gulp-less`为例（`将less编译成css的Gulp插件`）展示`Gulp`的常规用法，只要我们学会使用一个Gulp插件后，其他插件就差看看其帮助文档了。

## 使用Gulp的步骤

1. 首先`安装nodejs`，通过nodejs的`npm全局安装`和`项目安装Gulp`
2. 其次`在项目里安装所需要的Gulp插件`
3. 然后`新建Gulp的配置文件Gulpfile.js`并`写好配置信息`（定义Gulp任务）
4. 最后`通过命令提示符运行Gulp任务`即可。

**`安装nodejs` -> `全局安装Gulp` -> `项目安装Gulp以及Gulp插件` -> `配置Gulpfile.js` -> `运行任务`**

## 安装 Node.js 

**说明：**

Gulp是基于nodejs，理所当然需要安装nodejs；

**安装：**

打开nodejs官网，点击硕大的绿色Download按钮，它会根据系统信息选择对应版本（.msi文件）。然后像安装QQ一样安装它就可以了（安装路径随意）。

## 使用命令行

什么是命令行？

比较推荐用 Git Bash 

- `node -v`查看安装的nodejs版本，出现版本号，说明刚刚已正确安装nodejs。
- `npm -v`查看`npm的版本号`，npm是在`安装nodejs时一同安装的nodejs包管理器`；
- `cd`定位到目录，用法：`cd + 路径 `；
- `dir`列出文件列表；
- `cls`清空命令提示符窗口内容。

<img src="1.jpg">

## npm介绍

**说明：**

`npm（node package manager）`nodejs的包管理器，用于`node插件管理（包括安装、卸载、管理依赖等）`；

### 使用npm安装插件

命令提示符执行

```html
npm install <name> [-g] [--save-dev]
```

`<name>`：node插件名称。

例：

```html
npm install Gulp-less --save-dev
```

- `-g`：全局安装。将会安装在`C:\Users\Administrator\AppData\Roaming\npm`，并且写入系统环境变量；  
- `非全局安装`：将会安装在当前定位目录
- `全局安装`可以通过命令行在任何地方调用它，`本地安装`将安装在`定位目录的node_modules文件夹`下，通过`require()调用`；
- `--save`：将保存配置信息至`package.json`（package.json是 **nodejs项目配置文件**）；
- `-dev`：保存至package.json的`devDependencies节点`，`不指定-dev将保存至dependencies节点`；

**为什么要保存至package.json？**

因为node插件包相对来说非常庞大，所以不加入版本管理，将配置信息写入`package.json`并将其加入版本管理，其他开发者对应下载即可（命令提示符执行`·`，则会根据`·`下载所有需要的包）。

### 使用npm卸载插件

```html 
npm uninstall <name> [-g] [--save-dev]
```

PS：不要直接删除本地插件包

### 使用npm更新插件

```html
npm update <name> [-g] [--save-dev]
```

更新全部插件：

```html
npm update [--save-dev]
```

查看npm帮助：

```html
npm help
```

当前目录已安装插件：

```html
npm list
```

## 选装cnpm

因为`npm`安装插件是从国外服务器下载，受网络影响大，可能出现异常，如果npm的服务器在中国就好了，所以我们乐于分享的淘宝团队干了这事。

> 来自官网：“这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。”；

[淘宝镜像](http://npm.taobao.org)

**安装：**

命令提示符执行 

```html
npm install cnpm -g --registry=https://registry.npm.taobao.org
```

**注意：**

安装完后最好查看其版本号`cnpm -v`或关闭命令提示符重新打开，安装完直接使用有可能会出现错误；

**注** ：cnpm跟npm用法完全一致，只是在`执行命令`时`将npm改为cnpm`（以下操作将以cnpm代替npm）。

## 新建`package.json`文件

`package.json`是基于nodejs项目必不可少的配置文件，它是`存放在项目根目录`的普通`json`文件；

它是这样一个`json`文件（**注意：`json`文件内是不能写注释的，复制下列内容请删除注释**）：

```js
{
  "name": "test",   //项目名称（必须）
  "version": "1.0.0",   //项目版本（必须）
  "description": "This is for study gulp project !",   //项目描述（必须）
  "homepage": "",   //项目主页
  "repository": {    //项目资源库
    "type": "git",
    "url": "https://git.oschina.net/xxxx"
  },
  "author": {    //项目作者信息
    "name": "surging",
    "email": "surging2@qq.com"
  },
  "license": "ISC",    //项目许可协议
  "devDependencies": {    //项目依赖的插件
    "gulp": "^3.8.11",
    "gulp-less": "^3.0.0"
  }
}
```

我们可以`手动新建这个配置文件`，但是作为一名有志青年，我们应该使用更为效率的方法：

**命令提示符执行**

```html 
cnpm init
```

<img src="2.jpg">

## 本地安装Gulp插件

1、`定位目录`命令后提示符执行

```html 
cnpm install --save-dev
```

<img src="3.jpg">

2、本示例以`gulp-less为例（编译less文件）`，命令提示符执行

```html
cnpm install gulp-less --save-dev
```

3、将会安装在`node_modules`的`gulp-less目录`下，该目录下有一个`gulp-less的使用帮助文档`README.md；

4、为了能正常使用，我们还得本地安装 Gulp 

```html
cnpm install gulp --save-dev
```

PS：细心的你可能会发现，**我们全局安装了gulp**，**项目也安装了gulp**，`全局安装gulp是为了执行gulp任务`，`本地安装gulp则是为了调用gulp插件的功能`。

## 新建gulpfile.js文件（重要）

gulpfile.js是gulp项目的配置文件，是位于项目`根目录的普通js文件`（其实将gulpfile.js放入其他文件夹下亦可）。

它大概是这样一个js文件

```js 
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less');
 
//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});
 
gulp.task('default',['testLess', 'elseTask']); //定义默认任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径
```

## 运行gulp

说明：命令提示符执行 `gulp` 任务名称；

编译less：

```html 
gulp testLess
```

当执行 **`gulp default`**或 **`gulp`**将会调用 **`default`** 任务里的所有任务 **`[‘testLess’,’elseTask’]`**。

