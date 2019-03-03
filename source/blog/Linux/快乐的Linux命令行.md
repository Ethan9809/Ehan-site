---
title: "快乐的Linux命令行"
date: "2019-2-28"
cover: "linuxcover.jpg"
summary: "2019.2.28开始阅读《快乐的Linux命令行》（THE LINUX COMMAND LINE）一书进行Linux命令行系统学习。由于Liux命令行多而杂，所以将书中所出现命令行简要记录下来，定期回顾实践，以方便记忆"
---

# 快乐的Linux命令行

根据[快乐的命令行](https://github.com/zhan741965531/TCLC-CN)一书进行Linux命令行系统学习。由于Liux命令行多而杂，所以将书中所出现命令行简要记录下来，定期回顾实践，以方便记忆。

以前对linux命令行掌握程度完全是半吊子水平，从未有系统的学习过。

平时遇到一些操作也都是借助搜索引擎，而且不会进行命令行的相关记录。这样导致的后果就是十分容易忘记,当时写着没问题，可是隔了几天忘记了，又得借助搜索引擎。

为什么会萌生系统学习linux命令行想法呢，最大原因可能就是新鲜感。

写此篇文章的时候我正在上海实习，实习期间由于被分配到的任务比较少而简单，所以一天之中大量的时间，我都会看`前端`技术文章。看的多了就有些`疲倦`了。这时候就需要一些对我来说`新鲜`的知识来让我保持一定的学习动力。而这时我正在准备向`python爬虫`方向拓展兴趣，所以在大致的学完`python`,`sql`之后,便萌生了系统学习`linux命令行`的想法。

## 文件系统

### 查看文件和目录

1. ls / ls -a / ls -l (list directory contents)
2. file (determin file type)
3. less (view file contents)
4. wc file (打印行数，字数，字节数)
5. grep pattern [file...] 找到文件中匹配文本
6. head / tail － 打印文件开头部分/结尾部分

### 操作文件和目录

1. cp(-a, -i ,-u ,-r,-v)—— 复制文件和目录  
2. mv(-i,-u,-v) —— 移动/重命名文件和目录
3. mkdir —— 创建目录
4. rm(-i,-r,-f,-v) —— 删除文件和目录
5. ln (-s)—— 创建硬链接和符号(软)链接

## 有关命令的操作

### 命令种类

- 可执行程序
- shell内建命令  
- shell函数  
- 命令别名  

1. type command —— 查看命令类型

2. which command —— 显示可执行程序的位置

3. help command —— 得到shell内建命令的帮助文档

4. man —— 显示程序手册页

5. apropos —— 显示适当的指令

6. whatis —— 显示非常简洁的命令说明

7. info —— 显示程序 Info 条目

8. alias（alias name='string'/unalias —— 创建自己命令(随shell会话结束消失)

## I/O重定向

### 重定向标准输出 ls -l /usr/bin > ls-output.txt

1. >
2. >>
3. /dev/null

### 重定向标准错误 ls -l /bin/usr 2> ls-error.txt

### 重定向标准输出和错误到同一个文件 (标准错误重定向必须总是出现在标准输出重定向之后)

1. ls -l /bin/usr > ls-output.txt 2>&1
2. ls -l /bin/usr &> ls-output.txt

### 重定向标准输入 cat

1. cat > lazy.txt
2. cat < lazy.txt

### 管道线 |

> 一个命令的标准输出可以通过管道送至另一个命令的标准输入

1. ls -l /usr/bin | less
2. ls /bin /usr/bin | sort | uniq (-d)| less
3. ls /bin /usr/bin | sort | uniq | grep zip
4. ls /usr/bin | tail -n 5
5. ls /usr/bin | tee ls.txt | grep zip （从 Stdin 读取数据，并同时输出到 Stdout 和文件）

## Shell 眼中看世界

### echo

1. echo this is a test
2. echo */ echo D*
3. echo ~用户
4. `echo $((2 + 2)) / echo $(($((5**2)) * 3)) / echo $(((5**2) * 3))`
5. echo -e "\a" （解释转义序列）


### 花括号展开

1. echo Front-{A,B,C}-Back / echo {Z..A}

2. echo a{A{1,2},B{3,4}}b

3. mkdir {2007..2009}-0{1..9} {2007..2009}-{10..12}

### 参数展开 echo $user

### 命令替换

1. echo $(ls)

2. ls -l $(which cp)

3. file $(ls /usr/bin/* | grep zip)

### 双引号

1. 阻止单词分割 `ls -l "two words.txt"`
2. 双引号中，参数展开、算术表达式展开和命令替换仍然有效`echo "$USER $((2+2)) $(cal)"`

### 单引号 禁止所有展开

### 转义字符 \ (单引号中失去特殊含义，被看作普通字符)

1. sleep 10; echo -e "Time's up\a"

2. sleep 10; echo "Time's up" $'\a'





## 键盘高级操作技巧

### 相关命令

1. clear
2. history

### 命令行编辑

#### 移动光标
1. ctrl a
2. ctrl e
3. ctrl f
4. ctrl b
5. alt f
6. alt b
7. ctrl l

#### 修改文本
1. ctrl d
2. ctrl t
3. alt t
4. alt l
5. alt -u 

#### 复制粘贴文本
1. ctrl k
2. ctrl u
3. alt d
4. alt backspace
5. ctrl y

#### 历史命令展开
1. !!
2. !number
3. !string
4. !?string



## 权限

1. id
2. chmode
3. umask
4. su
5. sudo
6. chown
7. chgrp
8. passwd

### 用户，用户组

### 读取，写入和执行
-rw-r--r-- 1 root root 0
1. 文件类型 -，d,l,c,b
2. 文件模式
        - r 文件可打开可读，目录则可列出其中内容（必须设x）
        - w 文件可写可改，目录则可在其下移动修改新建文件(必须设置x)
        - x 文件可执行，（必须设r），目录允许进入
> 符号连接权限都是虚拟的，真是权限应该以符号连接符指向的文件为准

### chmod 
> 更改文件或目录的模式（权限），可以利用 chmod 命令。注意只有文件的所有者或者超级用户才 能更改文件或目录的模式。
1. 八进制表示 chmod 600 foo.txt
2. 字母表示 u,g,r  chmod u+x,g-x,ug=rw
3. umask (设置默认权限)
4. setuid ,setgid ,sticky  (位)

### 更改用户
1. 注销系统，以其他用户身份登录
2. su
3. sudo（/etc/sudoers）

### chown － 更改文件所有者和用户组（需要超级用户权限）
> chown [owner][:[group]] file

### passwd

### addusr/useradd/groupadd



## 进程

### 查看进程
1. ps  / ps -x
2. top

### 控制进程
1. jobs
2. &
3. fg %`jobspec` / bg %`jobspec` (移动到后台)
4. ctrl c
5. ctrl z
6. kill `PID` / kill %`jobspec` `HUB/INT/KILL/TERM/COUNT/STOP`
7. killall