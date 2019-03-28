
# Vue源码分析

## new Vue() 的过程中发生了什么？

在Vue进行实例初始化的时候，会进行`_init`

1. initLifecycle
2. initEvents
3. initRender
4. callHook("beforeCreate")
5. initInjections
6. initState
7. initProvide
8. callHook("created")

进行一系列初始化操作，看函数的名字就能直到，进行了初始化生命周期、时间中心、Render方法，injection，props/data，provide等

然后生命周期走到了`created`这里

## 在mounted发生了什么？

进行Vue实例挂载的时候，会进行判断传入的是`template字符出`还是`render函数`

### 如果是template字符串

如果是teplate字符串，则进行编译生成render函数

### 执行`render函数`

在执行`render函数`的时候，会读取所需对象的值，此时进行依赖收集

## diff算法

### 封装操作dom api 供不同平台调用

### diff过程(oldVnode,newVnode)

#### 旧oldVnode不存在

进行批量添加dom

### newVonode 不存在

进行批量删除dom

### sameNode

评定标准：

1. key
2. tag
3. data同时存在或不存在
4. input 再进行type判断

#### patchVnode(oldVnode,newVnode) 比对

- 新老相同返回
- isStatic、key 从老vnode上拿componentInstance
- 文本节点 重新设置文本
- 非文本节点，更新孩子
  - oldStartIdx,newEndIdx;newStartIdx,newEndIdx;
  - 两端索引比较
    相同
      1. oldStartIdx 与 newStartIdx 为sameNode 则patchVnode 并各向后移动
      2. 尾巴sameNode 则 pathVnode 并向前移动
      3. oldStartIdx 和 newEndIdx 为sameNode 则patchVnode
    不同
      1. 根据key 寻找相同的 ，进行patchVnode，并将oldVnode设置成undifiend,并将新的插入到旧的start前面
      2. 没有就创建并插入
    结束：
      oldStartIdx > oldEndIdx ，新节点多，插入
      反之，老节点多，删除
### !sameNode

1. 批量删除node
2. 批量添加node
