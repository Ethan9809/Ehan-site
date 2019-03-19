<!-- ---
title: "JS常见编程问题(一)"
date: "2019-03-08"
cover: "01cover.jpg"
summary: "最近由于准备春招，复习了一些js常见的编程问题，为了不让自己手生，所以手敲了一遍作为复习"
---   -->

# JS常见编程问题(一)

## Promise

### 简易Promise实现

1. 状态转换
2. resolve
3. reject
4. then
````js
const PENDING = "pending"
const RESOLVED = "fullfilled"
const REJECTED = "rejected"
class Promise {
	constructor(fn) {
		this.state  =  PENDING
		this.resolvedCallback = []
		this.rejectedCallback = []  
		this.resolve = this.resolve.bind(this)
		this.reject = this.reject.bind(this)
		fn(this.resolve,this.reject)
	}
	resolve(val){
		if(this.state = PENDDING){	
			this.state = RESOLVED
			this.resolvedCallback
				.forEach(
					cb => cb(val)
				)
		}
	}
	reject(val){
		if(this.state = PENDDING){	
			this.state = REJECTED
			this.rejectedCallback
				.forEach(
					cb => cb(val)
				)
		}
	}
	then(fn1,fn2){
		this.resolvedCallback.push(fn1)
		this.rejectedCallback.push(fn2)
	}
}
````

### PromiseA+规范
#### Promise 的状态  

1. 等待态（Pending）
2. 执行态（Fulfilled）
3. 拒绝态（Rejected）  

#### Then 方法  

1. 一个 promise 必须提供一个 then 方法以访问其当前值、终值和据因
2. then 方法必须返回一个 promise 对象 

#### onFulfilled 特性
1. 当 promise 执行结束后其必须被调用，其第一个参数为 promise 的终值
2. 在 promise 执行结束前其不可被调用
3. 其调用次数不可超过一次

#### onRejected 特性
1. 当 promise 被拒绝执行后其必须被调用，其第一个参数为 promise 的据因
2. 在 promise 被拒绝执行前其不可被调用
3. 其调用次数不可超过一次



## 防抖

在一段时间内，不管触发多少次回调，只执行最后一次回调。

```js
// 第一个传入需要防抖的函数，第二个传入时间间隔，即在多长时间内触发会进行防抖操作
function debounce(fn,delay){
	let timer = null

	return function (...args) {
		let that = this
		if(timer)
			clearTimeout(timer)

		timer = setTimeout(
			()=>{
				fn.apply(that,args)
			},
			delay
		)


	}	

}


```

## 节流   

在某段时间内，不管触发了多少次回调，只执行第一次回调，并在计时结束时给予响应1。

```js
function throttle(fn,interval){

	let last = 0
	
	return function(...arg){
		let that = this
		let now = Date.now()
		if(now - last > interval){
			last = now
			fn.applay(that,arg)
		}

	}
}

```


## 利用requsetAnimationFrame封装setInterval
  
原生setInterval被阻塞时,不会执行,但当阻塞结束时，会连续重复执行,会带来性能影响，而原生的`requestAnimation`每隔16ms执行一次，而且自带节流功能，可以利用`requestAnimation`封装一个setInterval。

```js
function setInterval(fn,interval){

	let start = Date.now()
	let loop = () => {
		
		let now = Date.now()
		let timer = window.requestAnimation(
			loop
		)
		if(now - start>= interval)
			fn(timer),start=now
	}

	window.requestAnimation(
		loop
	)

}

```



## 数组flat
```js

function flatMap(array){

	let ret = []
	__flatMap(array,ret)

	return ret
}

function __flatMap(array,ret){

	array.forEach((i)=>{

		if(i instanceof Array)
			__flatMap(i,ret)
		else
			ret.push(i)
	})
}


```

## 对象深拷贝

```js
function copyObject(obj){

	let copy = {}

	__copyObject(copy,obj)

	return copy
}


function __copyObject(copy,obj){
	for(let [key,val] of Object.entries(obj)){
		if(typeof val === "object"){
			copy[key] = {}
			__copyObject(copy[key],val)
		}else{
			copy[key] = val
		}
	}

```

## 实现apply

```js

function apply(context,arg){

	var fu = context.fun
	context.fn = this
	var ret = context.fn(...arg)
	that.context = fn

	return ret
}

Function.prototype.apply = apply

```
## 实现bind

````js
function bind(context){


	return (...arg) = > {

		this.apply(context,arg)				
	}
}

````














