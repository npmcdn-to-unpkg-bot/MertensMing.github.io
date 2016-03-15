---
title: HTML5 语义化标签
date: 2016-03-01 13:24:17
categories: HTML
tags: HTML5
---
参考：
<a href="http://www.html5jscss.com/html5-semantics-section.html#5">HTML 5的革新——语义化标签(一)</a>
<a href="http://www.html5jscss.com/html5-semantics-rich.html">HTML 5的革新——语义化标签(二)</a>

## HTML 5的革新

在`HTML 5`出来之前，我们用`div`来表示页面章节，但是这些div都没有实际意义（即使我们用`css`样式的`id`和`class`形容这块内容的意义）。这些标签只是我们提供给浏览器的指令，只是定义一个网页的某些部分。但现在，那些之前没`“意义”`的标签因为因为`html5`的出现消失了，这就是我们平时说的`“语义”`。

看下图没有用 `div` 标签来布局:

<!-- more -->

<img src="1.jpg" alt="采用`html5`语义标签布局">

嗯，如上图那个页面结构没有一个`div`，都是采用`html5`语义标签（用哪些标签，关键取决于你的设计目标）。

但是也不要因为`html5`新标签的出现，而随意用之，错误的使用肯定会事与愿违。所以有些地方还是要用`div`的，就是因为`div`没有任何意义的元素，他只是一个标签，仅仅是用来构建外观和结构。因此是 **最适合做容器的标签**。

`W3C`定义了这些语义标签，不可能完全符合我们有时的设计目标，就像制定出来的法律不可能流传100年都不改变，更何况它才制定没多久，不可能这些语义标签对所以设计目标的适应。只是一定程度上的“通用”，我们的目标是让爬虫读懂重要的东西就够了。

**结论：不能因为有了`HTML 5`标签就弃用了`div`，每个事物都有它的独有作用的。**

节点元素标签因使用的地方不同，我将他们分为：`节元素标签`、`文本元素标签`、`分组元素标签` 分开来讲解HTML5中新增加的语义化标签和使用总结。

## header 元素

`header` 元素代表`“网页”`或`“section”`的`页眉`。

通常包含`h1-h6元素`，作为整个页面或者一个内容块的`标题`。也可以包裹`一节的目录部分`，一个`搜索框`，一个`nav`，或者任何相关`logo`。

整个页面`没有限制header元素的个数`，可以拥有多个，可以为每个内容块增加一个header元素。

```html
<header>
    <h1>网站标题</h1>
</header>
```

### header 使用注意：

1.可以是`“网页”`或任意`“section”`的`头部`部分；
2.`没有个数限制`。
3.如果`h1-h6`自己就能工作的很好，那就`不要`用 header。

## footer 元素

`footer`元素代表`“网页”`或`“section”`的页脚，通常含有该节的一些基本信息，譬如：`作者`，`相关文档链接`，`版权资料`。

如果footer元素`包含了整个节`，那么它们就代表`附录`，`索引`，`提拔`，`许可协议`，`标签`，`类别`等一些其他类似信息。

```html footer 的示例代码
<footer>
    COPYRIGHT@小北
</footer>
```


### footer使用注意：

1. 可以是“网页”或任意“section”的底部部分；
2. 没有个数限制，除了包裹的内容不一样，其他跟header类似。

## nav 元素

`HTML` 导航栏 (`<nav>`) 描绘一个含有多个超链接的区域，这个区域包含转到其他页面，或者页面内部其他部分的链接列表.

### nav使用注意：

1. 并不是所有的链接都必须使用`<nav>`元素,它只用来将一些热门的链接放入导航栏,例如`<footer>`元素就常用来在页面底部包含一个不常用到,没必要加入`<nav>`的链接列表.
2. 一个网页也可能含有多个`<nav>`元素,例如一个是网站内的导航列表,另一个是本页面内的导航列表.

```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

## aside元素

`<aside>` 元素中连接到页面中其他部分的内容，被认为是 **独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响**。 

其通常表现为`侧边栏`或者`被插入在该内容里`。

他们通常包含在`工具条`，例如`来自词汇表的定义`。

也可能有其他类型的信息，例如`相关的广告`、`笔者的传记`、`web 应用程序`、`个人资料信息`，或在`博客上的相关链接`。

### 使用注意

不要将 `<aside>` 元素去标记括号中的文字，因为这种类型的文本被认为是其内容流的一部分。

```html
<article>
  <p>
    The Disney movie <em>The Little Mermaid</em> was
    first released to theatres in 1989.
  </p>
  <aside>
    The movie earned $87 million during its initial release.
  </aside>
  <p>
    More info about the movie...
  </p>
</article>
```

## section 元素

`section`元素代表文档中的`“节”`或`“段”`，“段”可以是指一篇文章里按照主题的分段；“节”可以是指一个页面里的分组。

`section`通常还带标题，虽然html5中section会自动给标题h1-h6降级，但是最好手动给他们降级。如下：

```html
<section>
    <h1>section是啥？</h1>
    <article>
        <h2>关于section</h1>
        <p>section的介绍</p>
        <section>
            <h3>关于其他</h3>
            <p>关于其他section的介绍</p>
        </section>
    </article>
</section>
```

### section使用注意

一张页面可以用`section`划分为简介、文章条目和联系信息。

不过在文章内页，最好用`article`。

`section`不是一般意义上的容器元素，如果想作为样式展示和脚本的便利，可以用`div`。

`article`、`nav`、`aside`可以理解为特殊的`section`，所以如果可以用`article`、`nav`、`aside`就不要用`section`，没实际意义的就用`div`。

## article 元素

`article`元素最容易跟`section`和`div`容易混淆，其实`article`代表一个在文档，页面或者网站中自成一体的内容，其目的是为了让开发者独立开发或重用。

譬如论坛的帖子，博客上的文章，一篇用户的评论，一个互动的`widget`小工具。（特殊的`section`）

除了它的内容，`article`会有一个标题（通常会在`header`里），会有一个`footer`页脚。我们举几个例子介绍一下`article`，好更好区分`article`、`section`、`div`

```html
<article>
    <h1>一篇文章</h1>
    <p>文章内容..</p>
    <footer>
        <p><small>版权：html5jscss网所属，作者：小北</small></p>
    </footer>
</article>
```

上例是最好简单的`article`标签使用情况，如果在`article`内部再嵌套`article`，那就代表内嵌的`article`是与它外部的内容有关联的，如博客文章下面的评论，如下：

```html
<article>
    <header>
        <h1>一篇文章</h1>
        <p><time pubdate datetime="2012-10-03">2012/10/03</time></p>
    </header>
    <p>文章内容..</p>
    <article>
        <h2>评论</h2>
        <article>
            <header>
                <h3>评论者: XXX</h3>
                <p><time pubdate datetime="2012-10-03T19:10-08:00">~1 hour ago</time></p>
            </header>
            <p>哈哈哈</p>
        </article>
        <article>
            <header>
                <h3>评论者: XXX</h3>
                <p><time pubdate datetime="2012-10-03T19:10-08:00">~1 hour ago</time></p>
            </header>
            <p>哈？哈？哈？</p>
        </article>
    </article>
</article>
```

`article`内部嵌套`article`，有可能是评论或其他跟文章有关联的内容。那`article`内部嵌套`section`一般是什么情况呢。如下：

```html
<article>

    <h1>前端技术</h1>
    <p>前端技术有那些</p>

    <section>
        <h2>CSS</h2>
        <p>样式..</p>
    </section>

    <section>
        <h2>JS</h2>
        <p>脚本</p>
    </section>

</article>
```

因为文章内`section`部分虽然也是独立的部分，但是它门只能算是组成整体的一部分，从属关系，`article`是大主体，`section`是构成这个大主体的一部分。本网站的全部文章都是`article`嵌套一个个`section`章节，这样能让浏览器更容易区分各个章节所包括的内容。

那`section`内部嵌套`article`又有哪些情况呢，如下:

```html
<section>
    
    <h1>介绍: 网站制作成员配备</h1>

    <article>
        <h2>设计师</h2>
        <p>设计网页的...</p>
    </article>

    <article>
        <h2>程序员</h2>
        <p>后台写程序的..</p>
    </article>

    <article>
        <h2>前端工程师</h2>
        <p>给楼上两位打杂的..</p>
    </article>

</section>
```

设计师、程序员、前端工程师都是一个独立的整体，他们组成了网站制作基本配备，当然还有其他成员~~。设计师、程序员、前端工程师就像`article`，是一个个独立的整体，而`section`将这些自成一体的`article`包裹，就组成了一个团体。

`article`和`section`和例子就例举这么多了，具体情况具体分析，不易深究。漏了`div`，其实`div`就是只是想用来把元素组合或者给它们加样式时使用。

### article使用注意

1. 自身独立的情况下：用article
2. 是相关内容：用section
3. 没有语义的：用div

## HTML5其他结构元素标签

`HTML5`节元素标签包括`body article nav aside section header footer hgroup `，还有`h1-h6` `address`。

`address` 代表区块容器，必须是作为联系信息出现，邮编地址、邮件地址等等,一般出现在`footer`。

## 文本字体元素

文字对SEO影响很大，而HTML5对一些文本字体元素的语义又重新定义了一遍，也增加了一些新的。那我们就来重新认识他们。

`a`（anchor 的缩写）： 用于定义超链接

`em`(emphasis 的缩写)：em 是句意强调，加与不加会引起语义变化，也可以理解为局部强调，用在语句某个单词上来改变句子的侧重。

`strong`：strong表示重要，strong 的强调则是一种随意无顺序的，看见某文时，立刻就凸显出来的关键词句。

`p`：p元素

`b`（bold 的缩写）：b 元素原本就是加粗，现在表示“文体突出”文字，通俗将是用来在文本中高亮显示某个或者几个字符，旨在引起用户的特别注意，无强调作用。譬如文档概要中的关键字，评论中的产品名，以及分类名。

`i`（italic 的缩写）：i 元素原本只是倾斜，现在描述为在普通文章中突出不同意见或语气或其他的一段文本，就像剧本里的话外音（外语、译音），或也可以用做排版的斜体文字。

`code`：定义计算机代码文本。

`q`（quote 的缩写）：用于定义一段引用的内容（短内容）

`cite` ：用于定义引用内容出自书籍或杂志等的标题，不允许其他信息，如作者，日期等。

`u` （underline 的缩写）：定义下划线文本

`abbr` （abbreviation 的缩写）：定义一个缩写文本，建议在 abbr 的 title 属性中描述缩写的全称

`dfn `（defining instance 的缩写）：用于定义一个术语

`var` ：定义计算机代码中的变量

`samp` （sample 的缩写）：由程序输出的示例文本

`kbd` （keyboard 的缩写）：定义由键盘输入的文本

`wbr` (word break)的缩写：定义换行的时机

`span` ：没有任何语义

`br` ：定义一个换行符

***表重要的 strong ，表强调的 em ，表标题的 h1–h6，表高亮或标记文本的 p 等，就用 b 来表示。***

**em 的强调是用在语句某个单词上来改变句子的侧重，可以说是局部的，而strong 和局部还是全局无关，局部强调用strong也可以，strong强调的是重要性，不会改变句意。**









