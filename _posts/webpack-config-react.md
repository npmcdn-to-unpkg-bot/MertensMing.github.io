---
title: 举一反三 —— Webpack 配置
date: 2016-08-20 07:38:39
categories: Javascript
tags: [React, 前端工程]
---
## 前言
这篇文章是我看教程整理的一些笔记，原文在[这里](http://jpsierens.com/tutorial-react-redux-webpack/)，这里将向你展示，如果需要使用 React、React-router 和 Redux 开发前端应用，webpack 应该如何配置，[这里](https://github.com/jpsierens/webpack-react-redux-react-router)是整片文章所使用的一个例子。看完这个你应该明白 webpack 是怎么配置的，配置文件里的每个属性都是做什么用的，以及多个配置文件怎么用，这里我自己的理解可能不太好，如果这个看不明白的话敬请阅读[原文](http://jpsierens.com/tutorial-react-redux-webpack/)。

## React, Redux, React-Router

假定你已经知道这三个东西是什么了（如果不知道赶紧去谷歌查文档）。
- [React 中文文档](https://www.gitbook.com/book/chenyitian/react-docs/details)
- [Redux 中文文档](http://cn.redux.js.org/index.html)
- [React Router 中文文档](https://react-guide.github.io/react-router-cn/)

## Webpack Config 
下面，我们就来开始我们应用最核心的一部分：webpack 的配置文件。

有两个配置文件，一个配置文件用于开发环境，另外一个用于生产环境，它们唯一的区别就是用于生产环境的那份配置表会压缩你的文件。

```js
'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'app/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
};
```

o(╯□╰)o，配置好多，不过莫慌，我们来一点点分析这个文件。

```js
'use strict';
 
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
```

这里，我们获取到依赖。
- path 这是一个模块，帮助我们调整文件的路径。
- HtmlWebpackPlugin 这是一个自动生成 html 的插件

```js
module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    }
}
```

正式的配置从这里开始。

### devtool
devtool 的属性被设置为 "eval-source-map"，这是调试相关的，[查看更多](https://webpack.github.io/docs/configuration.html#devtool)。

### entry
entry 属性定义入口文件。入口文件的意思就是，webpack 会使用这些文件，收集整个应用所有的依赖。

#### 多个入口文件
entry 属性的值也可以是一个包含多个文件的数组。
上面的例子中，还有两个跟 webpack-dev-server 相关的入口文件，在稍后会详细讲解。

### output
output 属性指定你输出的文件需要放在哪里。类似于 `[name].js` 这样的文件名将动态输出。

### plugins
```js
plugins: [
        new HtmlWebpackPlugin({
          template: 'app/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
```

任何人都可以构建 `webpack`，这也是 `React` 社区活力的源泉。

## Plugins

### HtmlWebpackPlugin
简单的来说，这个插件会生成一个 `html` 文件，这个 `html` 文件包含一个或者多个 `script` 标签，这些标签引入你已经打包好的文件，就是这么简单。

### OccurrenceOrderPlugin
这个东西是优化打包文件的，然而具体我也不知道它是怎么优化的。

### HotModuleReplacementPlugin
据说这个小宝贝是有史以来开发 `web app` 最好的插件？它能让你更改代码保存之后不用刷新，就能在浏览器上马上看到变化，更牛逼的是它会保存你应用的 `state`。

### NoErrorsPlugin
当你使用命令行工具时，启动这个 `plugin`，就算报错也不会终止当前进程。

### DefinePlugin
这个插件让你可以在编译的时候创建一个全局变量，这个东西在你想在开发环境和生产环境中定义不同的行为的时候，将非常有用。[查看更多](https://webpack.github.io/docs/list-of-plugins.html#defineplugin)

## Loaders
配置文件最后的一部分是有关于 loader 的。

```js
module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, 
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
```

这个其实比较简单，就类似于 gulp 的 task 一样，webpack 的 loaders 让匹配到的文件，从管道的右到左经过一个一个的 loader 的编译，每个 loader 还可以配置参数。
这样的解释有点意识流，不理解的话去 google 一下就可以了，比较简单。

## Webpack-dev-server

**注意**：

```js
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
```

这个 server 需要 webpack、webpack-dev-server 还有我们之前定义好的配置文件（webpack.config.js）

```js
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}).listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
 
  console.log('Listening at localhost:3000');
});
```









