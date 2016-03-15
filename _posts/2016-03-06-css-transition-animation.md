---
title: CSS3 动画
date: 2016-03-06 10:40:20
categories: CSS
tags: CSS3 动画
---
## transition

### 语法

```html
transition：<single-transition>[,<single-transition>]*
<single-transition> = [ none | <single-transition-property> ] || <time> || <single-transition-timing-function> || <time>
```

如果只提供一个`<time>`参数，则为 `<' transition-duration '>` 的值定义；如果提供二个`<time>`参数，则第一个为 `<' transition-duration '> `的值定义，第二个为 `<' transition-delay '>` 的值定义

### 使用示例

```css
.demo {
    transition: none;
    transition: left 2s ease 1s,
                color 2s;
    transition: 2s;
}
```

<!-- more -->

### transition-property 检索或设置对象中的参与过渡的属性

#### 语法

```html
transition-property：none | <single-transition-property>[ ,<single-transition-property> ]*
<single-transition-property> = all | <IDENT>
```

#### 取值

`none`：不指定过渡的css属性
`all`：所有可以进行过渡的css属性
`<IDENT>`：指定要进行过渡的css属性

#### 说明

**检索或设置对象中的参与过渡的属性。**

默认值为：`all`。

1. 默认为所有可以进行过渡的`css`属性。
2. 如果提供多个属性值，以逗号进行分隔。
3. 对应的脚本特性为`transitionProperty`。

#### 使用示例

```css
.demo {
    transition-property: none;
    /*默认值*/
    transition-property: all;
    /*所有的属性都可以发生过渡*/
    transition-property: left;
    /*当 left 有变化的时候，就会做一个过渡的效果，而不是瞬间变化*/
    transition-property: left, color;
    /*写两个值*/
}
```

### transition-duration 检索或设置对象过渡的持续时间

#### 语法

```html
transition-duration：<time>[ ,<time> ]*
```

#### 取值

`<time>`：指定对象过渡的持续时间

#### 说明

1. 检索或设置对象过渡的持续时间。
2. 如果提供多个属性值，以逗号进行分隔。
3. 对应的脚本特性为`transitionDuration`。

#### 使用示例

```css
.demo {
    transition-duration: 0s;
    /*不作动画*/
    transition-duration: 1s;
    /*这个动画持续一秒钟时间*/
    transition-duration: 1s, 2s, 3s;
    /*可以写多个*/
}
```

### transition-timing-function 检索或设置对象中过渡的动画类型

可以改变动画运动的速率

#### 语法

```html
transition-timing-function：<single-transition-timing-function>[,<single-transition-timing-function>]*
```

#### 取值

`linear`：
线性过渡。等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0)

`ease`：平滑过渡，两端慢，中间快。等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0)

`ease-in`：由慢到快。等同于贝塞尔曲线(0.42, 0, 1.0, 1.0)

`ease-out`：由快到慢。等同于贝塞尔曲线(0, 0, 0.58, 1.0)

`ease-in-out`：由慢到快再到慢。等同于贝塞尔曲线(0.42, 0, 0.58, 1.0)

`step-start`：等同于 steps(1, start)

`step-end`：等同于 steps(1, end)

`steps(<integer>[, [ start | end ] ]?)`：接受两个参数的步进函数。第一个参数必须为正整数，指定函数的步数。第二个参数取值可以是start或end，指定每一步的值发生变化的时间点。第二个参数是可选的，默认值为end。

`cubic-bezier(<number>, <number>, <number>, <number>)`：特定的贝塞尔曲线类型，4个数值需在[0, 1]区间内

#### 说明

1. 检索或设置对象中过渡的动画类型。
2. 如果提供多个属性值，以逗号进行分隔。
3. 对应的脚本特性为`transitionTimingFunction`

#### 使用示例

```css
.demo {
    transition-timing-function: ease;
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.0);
    transition-timing-function: linear;
    transition-timing-function: cubic-bezier(0, 0, 1, 1);
    transition-timing-function: ease, linear;
}
```

### transition-delay 检索或设置对象延迟过渡的时间

#### 语法

```html
transition-delay：<time>[ ,<time> ]*
```

#### 取值

`<time>`：指定对象过渡的延迟时间

#### 说明

1. 检索或设置对象延迟过渡的时间。
2. 如果提供多个属性值，以逗号进行分隔。
3. 对应的脚本特性为`transitionDelay`。

#### 使用示例

```css
.demo {
    transition-delay: 0s;
    transition-delay: 1s;
    transition-delay: 2s;
}
```

## @keyframes 关键帧定义

### 语法

```css
@keyframes abc {
    from {opacit:1; height: 100px;}
    to {opacity: 0.5; height: 200px;}
}

@keyframes abc {
    0% {opacit:1; height: 100px;}
    100% {opacity: 0.5; height: 200px;}
}

@keyframes flash {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0; }
}
/*还可以把关键帧合起来写*/
.demo {
    animation: abc .5s both;
    animation: flash .5s both;
    animation: abc .5s both, flash .5s both;
}
```

## animation

用 `transition` 都是从一个关键帧过渡到另外一个关键帧，如果我们希望在两个关键帧中间插入一个关键帧，而且不是鼠标 `hover` 上去才执行，是让它自动执行动画，那就需要用到 `animation`。

```html
animation：<single-animation>[,<single-animation>]*
<single-animation> = <single-animation-name> || <time> || <single-animation-timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state>
```

### animation-name

#### 语法

```html
animation-name：<single-animation-name>[,<single-animation-name>]*
<single-animation-name> = none | <identifier>
```

#### 取值

`none`：不引用任何动画名称
`<identifier>`：定义一个或多个动画名称(identifier标识)

#### 说明

1. 检索或设置对象所应用的动画名称，必须与规则`@keyframes`配合使用，因为动画名称由`@keyframes`定义
2. 如果提供多个属性值，以逗号进行分隔。
3. 对应的脚本特性为`animationName`。

#### 使用示例

```css
.demo {
    animation-name: none;
    animation-name: abc;
    animation-name: abc, abcd;
    /*名字是自定义的*/
}
```

### animation-duration

#### 语法

```html
animation-duration：<time>[,<time>]*
```

#### 取值

`<time>`：指定对象动画的持续时间

#### 说明

1. 检索或设置对象动画的持续时间
2. 如果提供多个属性值，以逗号进行分隔。
3. 对应的脚本特性为`animationDuration`。

#### 使用示例

```css
.demo {
    animation-duration: 0s;
    animation-duration: 1s;
    animation-duration: 1s, 2s, 3s;
}
```

### animation-timing-function

跟前面 transition-timing-function一样

### animation-delay 

跟前面 transition 一样

### animation-iteration-count 设置对象动画的循环次数

#### 语法

```html
animation-iteration-count：<single-animation-iteration-count>[,<single-animation-iteration-count>]*
<single-animation-iteration-count> = infinite | <number>
```

#### 取值

`infinite`：无限循环
`<number>`：指定对象动画的具体循环次数

#### 说明

1. 检索或设置对象动画的循环次数
2. 如果提供多个属性值，以逗号进行分隔。
3. 对应的脚本特性为`animationIterationCount`。

#### 使用示例

```css
.demo {
    animation-iteration-count: 1;
    animation-iteration-count: infinite;
    animation-iteration-count: 1, 2, infinite;
    /*第一个动画执行一次，第二个动画执行两次，第三个动画执行无限次*/
}
```

### animation-direction 设置对象动画在循环中是否反向运动

#### 语法

```html
animation-direction：<single-animation-direction>[,<single-animation-direction>]*
<single-animation-direction> = normal | reverse | alternate | alternate-reverse
```

#### 取值

`normal`：正常方向
`reverse`：反方向运行
`alternate`：动画先正常运行再反方向运行，并持续交替运行
`alternate-reverse`：动画先反运行再正方向运行，并持续交替运行

#### 使用示例

```css
.demo {
    animation-direction: reverse;
    animation-direction: alternate;
    animation-direction: alternate-reverse;
}
```

### animation-play-state

#### 语法

```html
animation-play-state：<single-animation-play-state>[,<single-animation-play-state>]*
<single-animation-play-state> = running | paused
```

#### 取值

`running`：运动
`paused`：暂停

#### 使用示例

```css
.demo {
    animation-play-state: running;
    animation-play-state: pau;
}
```

### animation-fill-mode

#### 语法

```html
animation-fill-mode：<single-animation-fill-mode>[,<single-animation-fill-mode>]*
<single-animation-fill-mode> = none | forwards | backwards | both
```

#### 取值

`none`：默认值。不设置对象动画之外的状态
`forwards`：设置对象状态为动画结束时的状态
`backwards`：设置对象状态为动画开始时的状态
`both`：设置对象状态为动画结束或开始的状态

#### 使用示例

```css
.demo {
    animation-fill-mode: none;
    animation-fill-mode: forwords;
    animation-fill-mode: forwords, backwards;
}
```

