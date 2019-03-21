# React 和 Vue 面试问题

## React 和 Vue差异

1. 社区，Vue官方指导，React社区多元

2. 相同 推崇单项数据流 ， 但React限制更加严格，无法直接修改其他组件数据，调用方法；Vue可以，往往Vue可以以组件为单位，多叉树遍历，拿到组件

3. React更接近底层，Vue提供更多的模板方法

4. React朝向函数式编程、函数式组件靠拢；Vue模板化 清晰明了

5. React组件模式,聪明/傻瓜组件，reanderProps，高阶组件，函数化

6. Vue组件更加独立化

7. Vue降低开发门槛，React的JSX是一种全新的开发理念

## Virtual Dom

JS模拟dom，通过diff算法，对比出差异，进行patch实现dom局部更新

1. 直接对比dom，js线程和渲染线程通信，而且dom属性很多，比较消耗性能

2. 可以实现跨端 Virtual DOM 作为一个兼容层 ，隐匿具体实现，提供统一的virtualdom接口

3. 通过VIrtual 操作js dom可以渲染到其他平台，node 实现SSR

## Vue生命周期

### new Vue 阶段

- 初始化生命周期，事件、Render函数 触发 `beforeCreat`

- 初始化Provide、State、Injection 触发 `created`

### $mounted

- 进行必要的属性判断,如果将模板转化成`需要传入render函数` 触发`beforeMount`

- `new Watcher`  在回调函数里面 触发 `updateComponent` , 进行组件递归挂载，先挂载子组件，最后挂载自己

- 子组件挂载完毕，挂载自己执行`mounted`

### 更新阶段

- 触发`beforeUpdate`

- 执行`updateComponent`，这个函数触发的过程是，先执行render函数，得到新的virtualdom，再将新旧虚拟dom进行patch，通过diff算法寻找差异，更新dom，最后执行`updated`

### keep-alive

- 命中缓存，`actived`

- 切换,`deactived`
