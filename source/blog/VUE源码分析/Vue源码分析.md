
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


