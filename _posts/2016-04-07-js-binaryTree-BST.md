---
title: 二叉树和二叉查找树的 JavaScript 描述
date: 2016-04-07 18:31:22
categories: 算法
tags: 二叉树
---

## 树的定义

### 根节点

一棵树最上面的节点称为`根节点`。

### 父节点

如果一棵树下面连接一个或多个节点，那么该节点就被称为`父节点`。

### 子节点

父节点下面的节点被称为`子节点`。

### 叶子节点

没有任何子节点的节点被称为`叶子节点`。

<!-- more -->

<img src="1.jpg" alt="一棵树">

## 二叉树

### 特点

1. 子节点个数`不超过两个`。
2. 二叉树中每一个节点都是一个对象，每一个数据节点`都有三个指针`，分别是指向父节点、左节点和右节点的指针。
3. 每一个节点都是通过指针相互连接的。相连指针的关系`都是父子关系`。（就是说左右节点不可以连接在一起）

### 二叉树节点的定义

我们来定义一个对象 Node。

```js
/**
 * 生成二叉树节点的构造函数
 *
 * @param {object} data 储存在节点里的数据
 * @param {object} left 存放在左节点的数据
 * @param {object} left 存放在右节点的数据
 */
function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show= show;

    /**
     * 返回储存在节点的数据
     * 
     * @return {object} 返回保存在节点里面的数据
     */
    function show(){
        return this.data;
    }
}
```

<img src="3.jpg" title="二叉树">

## 二叉查找树

二叉查找树是一种特殊的二叉树，`相对较小的值`保存在`左节点`中，`相对较大的值`保存在`右节点`中。

### 实现二叉查找树

#### 创建 BST

现在可以创建一个类，用来表示`二叉查找树`（`BST`）。
该类的构造函数将根节点初始化为 `null`，以此创建一个空节点。

```js
function BST() {
    this.root = null;
}
```

#### 增加 insert() 方法

`BST` 需要有一个 `insert()` 方法，用来向树中间加入新节点。

1. 首先，需要`创建`一个 `Node` 对象，将`数据传入该对象`保存。
2. 下一步就要决定将节点`放在哪个位置`，用一个变量储存当前节点，一遍一遍地遍历 `BST`。
3. 找到了正确的插入点时，会`跳出循环`。

```js
/**
 * 实现 BST 类
 */
function BST() {
    this.root = null;
    this.insert = insert;

    /**
     * 插入节点
     * 
     * @param {object} data 需要保存在 BST 里面的数据
     */
    function insert(data) {
        var node = new Node(data, null, null); // 创建一个节点
        // 如果没有根节点，就设置待插入节点为根节点
        if (this.root == null) {
            this.root = node;
        } else {
            var current = this.root; // 设置根节点为当前节点
            var parent;
            while (true) {
                parent = current;
                if (data < current.data) { // 如果待插入节点保存的数据小于当前节点的数据
                    current = current.left; // 设置新的当前节点为原节点的左节点
                    if (current == null) { // 循环出口
                        parent.left = node; // 将节点插入这个位置
                        break; // 跳出循环
                    }
                } else {
                    current = current.right;
                    if (current == null) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    }
}
```

下面，创建一个 BST 实例：

```js
var nums = new BST();

nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
```

<img src="2.jpg" title="一个 BST 实例">

### 遍历二叉查找树

有三种方式遍历 `BST`： `中序遍历`、`先序遍历` 和 `后续遍历`。

#### 中序遍历

按照节点上的键值，以升序（`由小到大`）访问 `BST` 上的所有节点。

中序遍历使用递归的方式最容易实现。先访问`左节点`，再访问`根节点`，最后访问`右节点`。

代码如下：

```js
/**
* 中序遍历 BST
* 
* @param {object} node 根节点
*/
function inOrder(node){
    if(!(node == null)){
        inOrder(node.left);
        // 处理这个节点的代码
        console.log(node.show());
        inOrder(node.right);
    }
}
```

<img src="5.jpg" title="中序遍历的访问路径">

#### 先序遍历

先访问根节点，然后以同样的方式访问左子树和右子树。

`inOrder()` 方法和 `preOrder()` 方法的唯一区别，就是 `if` 语句中代码的顺序。

在 `inOrder()` 方法中， `show()` 函数像三明治一样夹在两个递归调用之间，在 `preOrder()` 方法中，`show()` 函数放在两个递归调用之前。

```js
function preOrder(node) {
    if (!(node == null)) {
        console.log(node.show());
        preOrder(node.left);
        preOrder(node.right);
    }
}
```

<img src="4.jpg" title="先序遍历的访问路径">

#### 后序遍历

后序遍历先访问叶子节点，从左子树到右子树，再到根节点。

postOrder() 方法的实现代码如下：

```js
function postOrder(node){
    if (!(node == null)) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.show());
    }
}
```

<img src="6.jpg" title="后序遍历的访问路径">

### 在二叉查找树上进行查找

对 BST 通常有下列三种类型的查找：
(1) 查找给定值；
(2) 查找最小值；
(3) 查找最大值。

#### 查找最小值和最大值

查找 BST 上的最小值和最大值非常简单。因为较小的值总是在左子节点上， 在 BST 上查找最小值， 只需要遍历左子树， 直到找到最后一个节点。

##### getMin() 方法

`getMin()` 方法查找 `BST` 上的最小值，该方法的定义如下：

```js
function getMin() {
    var current = this.root;
    while (!(current.left == null)) {
        current = current.left;
    }
    return current;
}
```

该方法沿着 `BST` 的左子树挨个遍历， 直到遍历到 `BST` 最左边的节点， 该节点的左子树为 `null`（`current. left == null;`），这时， 当前节点上保存的值就是最小值。

##### getMax() 方法

在 `BST` 上查找最大值， 只需要遍历右子树， 直到找到最后一个节点， 该节点上保存的值即为最大值。

`getMax()` 方法的定义如下：

```js
function getMax() {
    var current = this.root;
    while(!(current.right == null)){
        current = current.right;
    }
    return current;
}
```

#### 查找给定值

在 `BST` 上查找给定值， 需要比较该值和当前节点上的值的大小。 通过比较， 就能确定如果给定值不在当前节点时， 该向左遍历还是向右遍历。

##### find() 方法

`find()` 方法用来在 `BST` 上查找给定值， 定义如下：

```js
function find(data){
    var current = this.root;
    while(!(current == null)){
        if(current.data == data){
            return current;
        } else if(current.data > data){
            current = current.right;
        } else {
            current = current.left;
        }
    }
    return null;
}
```

### 从二叉查找树上删除节点

1. 从 BST 中删除节点的第一步是`判断当前节点是否包含待删除的数据`， 
2. 如果包含，则删除该节点； 
3. 如果不包含，则比较当前节点上的数据和待删除的数据。 
4. 如果待删除数据`小于当前节点上的数据`， 则移至当前节点的`左子节点`继续比较； 
5. 如果删除数据`大于当前节点上的数据`， 则移至当前节点的`右子节点`继续比较。
6. 如果待删除节点是叶子节点（没有子节点的节点）， 那么只需要将从父节点指向它的链接指向 null。
7. 如果待删除节点只包含一个子节点， 那么原本指向它的节点就得做些调整， 使其指向它的子节点。
8. 最后，如果待删除节点包含两个子节点，正确的做法有两种： 要么查找待删除节点左子树上的最大值，要么查找其右子树上的最小值。 这里我们选择后一种方式。

整个删除过程由两个方法完成。` remove()` 方法只是简单地接受待删除数据， 调用 `removeNode()`删除它， 后者才是完成主要工作的方法。 

还是看代码吧，两个方法的定义如下：

```js
function remove(data) {
    root = removeNode(this.root, data);
}

function removeNode(node, data) {
    if (node == null) {
        return null;
    }
    if (data == node.data) {
        // 没有子节点的节点
        if (node.left == null && node.right == null) {
            return null;
        }
        // 没有左子节点的节点
        if (node.left == null) {
            return node.right;
        }
        // 没有右节点的节点
        if (node.right == null) {
            return node.left;
        }
        // 有两个子节点的节点
        var tempNode = getSmallest(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
    } else if (data < node.data) {
        node.left = removeNode(node.left, data);
    } else {
        node.right = removeNode(node.right, data);
        return node;
    }
}
```




