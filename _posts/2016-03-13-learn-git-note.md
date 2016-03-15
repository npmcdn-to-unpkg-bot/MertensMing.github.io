---
title: Git 学习笔记
date: 2016-03-13 23:17:02
categories: Git
tags: Git
---
**参考**
[Git教程 - 廖雪峰的官方网站](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
[Pro Git](http://git.oschina.net/progit/index.html)

## 创建版本库

**什么是版本库呢？**
版本库又名仓库，英文名`repository`，可以简单理解成一个目录，这个目录里面的所有文件都可以被`Git`管理起来，每个文件的修改、删除，`Git`都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

<!-- more -->

### 创建一个版本库

首先，选择一个合适的地方，创建一个空目录。

打开 `Git Bash`：

<img src="1.jpg" alt="">

```html
$ mkdir public  创建一个目录
$ cd public  进入该目录
$ pwd 显示当前目录
```

<!-- more -->

第二步，通过 `git init` 命令把这个目录变成 `Git` 可以管理的仓库。

```html
$ git init 
```

### 把文件添加到版本库

第一步，用命令 `git add` 告诉Git，把文件添加到仓库：

可反复多次使用，添加多个文件

```html
$ git add * 一次性添加这个文件夹下所有的文件到仓库
$ git add readme1.txt 也可以只添加一个文件
$ git add readme2.txt readme3.txt 添加多个文件
```

执行上面的命令，没有任何显示，说明添加成功。

工作目录下面的所有文件都不外乎这两种状态：**已跟踪或未跟踪**。

已跟踪的文件：是指本来就被纳入版本控制管理的文件，在上次快照中有它们的记录，工作一段时间后，它们的状态可能是 **未更新，已修改或者已放入暂存区**。

而所有其他文件都属于未跟踪文件。它们既没有上次更新时的快照，也不在当前的暂存区域。

初次克隆某个仓库时，工作目录中的所有文件都属于已跟踪文件，且状态为未修改。

<img src="1.jpg" title="文件的状态变化周期">

### 检查当前文件状态

要确定哪些文件当前处于什么状态，可以用 `git status` 命令。

```html
On branch master
Changes to be committed:
<!-- 只要在 “Changes to be committed” 这行下面的，就说明是已暂存状态。 -->
  (use "git reset HEAD <file>..." to unstage)

        modified:   index.html
        modified:   page/2/index.html
        modified:   page/3/index.html
        modified:   page/4/index.html
        modified:   page/5/index.html
        modified:   page/6/index.html
        new file:   post/learn-git-note/1.jpg
        new file:   post/learn-git-note/2.jpg
        new file:   post/learn-git-note/3.jpg
        new file:   post/learn-git-note/4.jpg
        new file:   post/learn-git-note/5.jpg
        modified:   post/learn-git-note/index.html

Changes not staged for commit:
<!-- 出现在 “Changes not staged for commit” 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。 -->
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   post/learn-git-note/index.html
        deleted:    readme.txt

Untracked files:
<!-- 未跟踪文件 -->
  (use "git add <file>..." to include in what will be committed)
    
        post/learn-git-note/6.jpg

```

已跟踪文件的内容发生了变化，但还没有放到暂存区。要暂存这次更新，需要运行 `git add` 命令（这是个多功能命令，根据目标文件的状态不同，此命令的效果也不同：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等）。

### 查看已暂存和未暂存的更新

`git diff` 命令可以查看具体修改了文件的哪些地方。

不加参数直接输入 `git diff`，此命令比较的是工作目录中当前文件和暂存区域快照之间的差异，也就是修改之后还没有暂存起来的变化内容。

若要看已经暂存起来的文件和上次提交时的快照之间的差异，可以用 `git diff --cached` 命令。（Git 1.6.1 及更高版本还允许使用 `git diff --staged`，效果是相同的，但更好记些。）

```html
$ git diff
$ git diff --cached
$ git diff --staged
```

### 提交更新

用命令 `git commit` 告诉Git，把文件提交到仓库：

```html
$ git commit -m "输入的是本次提交的说明，可以输入任意内容"
```

`git commit` 命令执行成功后会告诉你，什么文件被改动过了。

#### 跳过使用暂存区域

Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，给 `git commit` 加上 `-a` 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 `git add` 步骤

## 版本穿梭

### 查看提交历史

`git log` 命令显示从最近到最远的提交日志

如果嫌输出信息太多，看得眼花缭乱的，可以试试加上 `--pretty=oneline` 参数

```html
$ git log
$ git log --pretty=oneline
```

一大串类似`3628164...882e1e0`的是`commit id`（版本号）

### 穿梭过去

在Git中，用`HEAD`表示当前版本，也就是最新的提交，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个^比较容易数不过来，所以写成`HEAD~100`。

把当前版本回退到上一个版本，就可以使用`git reset`命令：

```html
$ git reset --hard HEAD^
```

### 回到未来

周星驰《上海滩赌圣》里面的一个梗，在这里就可以用上：“穿梭过去，回到未来！”

以指定回到未来的某个版本:

```html
$ git reset --hard 123456 <!-- commit id -->
```

用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

```html
$ git reflog
```

### 撤销修改

#### 情况一

`git checkout -- fileName`可以丢弃工作区的修改：

命令`git checkout -- fileName`意思就是，把`fileName`文件在工作区的修改全部撤销，这里有两种情况：

**一种是`fileName`自修改后还没有被放到暂存区**，现在，撤销修改就回到和版本库一模一样的状态；

**一种是`fileName`已经添加到暂存区后，又作了修改**，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

#### 情况二

在`commit`之前，你发现了这个问题。用`git status`查看一下，修改只是添加到了暂存区，还没有提交：

用命令`git reset HEAD file`可以把暂存区的修改撤销掉（`unstage`），重新放回工作区：

```html
$ git reset HEAD fileName
```

### 删除文件

Git知道你删除了文件，因此，工作区和版本库就不一致了，`git status`命令会立刻告诉你哪些文件被删除了：

#### 选择一：删除文件

确实要从版本库中删除该文件，那就用命令`git rm`删掉，并且`git commit`

```html
$ git rm fileName
$ git commit -m "提交说明"
```

#### 选择二：

把误删的文件恢复到最新版本

```html
$ git checkout -- fileName
```

`git checkout` 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

## 远程仓库

### 添加远程仓库

远程仓库是指托管在网络上的项目仓库，可能会有好多个，其中有些你只能读，另外有些可以写。同他人协作开发某个项目时，需要管理这些远程仓库，以便推送或拉取数据，分享各自的工作进展。管理远程仓库的工作，包括添加远程库，移除废弃的远程库，管理各式远程库分支，定义是否跟踪这些分支，等等。

要添加一个新的远程仓库，可以指定一个简单的名字，以便将来引用，运行 `git remote add [shortname] [url]`：

```html
$ git remote add shortname url
```

下一步，就可以把本地库的所有内容推送到远程库上：

```html
$ git push -u origin master
```

第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

第二次推送开始，就可以简化命令：

```html
$ git push origin master
```

把本地`master`分支的最新修改推送至GitHub，现在，就拥有了真正的分布式版本库！

### 从远程库克隆

要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone`命令克隆

```html
$ git clone url
```

## 分支管理

现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。

### 创建与合并分支

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`

创建+切换分支：`git checkout -b <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`

### 解决冲突

合并产生冲突的时候，必须手动解决冲突之后再提交。

```html
$ git merge feature1
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.
```

`git status` 可以告诉我们冲突的文件：

```html
$ git status
# On branch master
# Your branch is ahead of 'origin/master' by 2 commits.
#
# Unmerged paths:
#   (use "git add/rm <file>..." as appropriate to mark resolution)
#
#       both modified:      readme.txt
#
no changes added to commit (use "git add" and/or "git commit -a")
```

可以直接查看冲突文件的内容：

```html
Git is a distributed version control system.
Git is free software distributed under the GPL.
Git has a mutable index called stage.
Git tracks changes of files.
<<<<<<< HEAD
Creating a new branch is quick & simple.
=======
Creating a new branch is quick AND simple.
>>>>>>> feature1
```

Git用`<<<<<<<`，`=======`，`>>>>>>`>标记出不同分支的内容。

修改之后，保存,`add` `commit`:

```html
$ git add fileName
$ git commit -m "提交说明"
```

用带参数的 `git log` 也可以看到分支的合并情况

```html
$ git log --graph --pretty=oneline --abbrev-commit
```

最后删除分支，工作完成！

### 分支管理策略

通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用`Fast forward`模式，Git就会在`merge`时生成一个新的`commit`，这样，从分支历史上就可以看出分支信息。

`--no-ff`参数，表示禁用`Fast forward`

```html
$ git merge --no-ff -m "merge with no-ff" dev
```

因为本次合并要创建一个新的`commit`，所以加上`-m`参数，把`commit`描述写进去。

#### 分支策略

在实际开发中，我们应该按照几个基本原则进行分支管理：

1. `master`分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活
2. 干活都在`dev`分支上，也就是说，`dev`分支是不稳定的，到某个时候，比如`1.0`版本发布时，再把dev分支合并到`master`上，在`master`分支发布`1.0`版本；
3. 你和你的小伙伴们每个人都在`dev`分支上干活，每个人都有自己的分支，时不时地往`dev`分支上合并就可以了。

<img src="2.jpg" title="团队合作的分支看起来就像这样">

### Bug分支

有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

Git还提供了一个`stash`功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：

```html
$ git stash
```

现在，用`git status`查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。

首先确定要在哪个分支上修复bug，假定需要在`master`分支上修复，就从`master`创建临时分支：

```html
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 6 commits.
$ git checkout -b issue-101
Switched to a new branch 'issue-101'
```

现在修复bug，然后提交：

```html
$ git add readme.txt 
$ git commit -m "fix bug 101"
[issue-101 cc17032] fix bug 101
 1 file changed, 1 insertion(+), 1 deletion(-)
```

修复完成后，切换到`master`分支，并完成合并，最后删除`issue-101`分支：

```html
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 2 commits.
$ git merge --no-ff -m "merged bug fix 101" issue-101
Merge made by the 'recursive' strategy.
 readme.txt |    2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
$ git branch -d issue-101
Deleted branch issue-101 (was cc17032).
```

现在，是时候接着回到dev分支干活了！

```html
$ git checkout dev
Switched to branch 'dev'
$ git status
# On branch dev
nothing to commit (working directory clean)
```

工作区是干净的，刚才的工作现场存到哪去了？用`git stash list`命令看看：

```html
$ git stash list
stash@{0}: WIP on dev: 6224937 add merge
```

工作现场还在，Git把`stash`内容存在某个地方了，但是需要恢复一下，有两个办法：

1. 一是用`git stash apply`恢复，但是恢复后，`stash`内容并不删除，你需要用`git stash drop`来删除；
2. 另一种方式是用git stash pop，恢复的同时把stash内容也删了：

```html
$ git stash pop
```

再用`git stash list`查看，就看不到任何`stash`内容了：

你可以多次`stash`，恢复的时候，先用`git stash list`查看，然后恢复指定的`stash`，用命令：

```html
$ git stash apply stash@{0}
```

### Feature分支

添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个`feature`分支，在上面开发，完成后，合并，最后，删除该`feature`分支。

一切顺利的话，`feature`分支和`bug`分支是类似的，合并，然后删除。

但是，

就在此时，接到上级命令，因经费不足，新功能必须取消！

虽然白干了，但是这个分支还是必须就地销毁：

```html
$ git branch -d feature-vulcan
error: The branch 'feature-vulcan' is not fully merged.
If you are sure you want to delete it, run 'git branch -D feature-vulcan'.
```

销毁失败。Git友情提醒，`feature-vulcan`分支还没有被合并，如果删除，将丢失掉修改，如果要强行删除，需要使用命令`git branch -D feature-vulcan`。

现在我们强行删除

```html
$ git branch -D feature-vulcan
Deleted branch feature-vulcan (was 756d4af).
```










































