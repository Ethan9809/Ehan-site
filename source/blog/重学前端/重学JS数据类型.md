---
title: "重学JS数据类型"
date: "2019-02-26"
cover: "01cover.jpg"
summary: "最近看了winter老师的专栏中对于Javascript中数据类型的解读，结合以前学习到的知识，有种恍然大悟的感觉，印象深刻,故在此整理记录，以备遗忘。"
---

# 重学JS数据类型

> 最近看了winter老师的专栏中对于Javascript中数据类型的解读，结合以前学习到的知识，有种恍然大悟的感觉，印象深刻,故在此整理记录，以备遗忘。

## 数据类型

1. Undefined
2. Null
3. Boolean
4. String
5. Number
6. Symbol
7. Object

## Null 和 Undefined

### null是js内置的关键字，undefined是一个无法被修改的全局变量  

虽然undefined是一个无法被修改的变量，但是可以通过作用域将其覆盖,为避免undefined被篡改，一般使用`void 0` 来代替undefined

```js
function coverUndefined(){
  let undefined = 10
  console.log(undefined) // 10
}

let x = void 0 // undefined
```

### 表意差别
  
通常null表示定义了，但故意置空;   
而undefined往往是定义了，而未赋值的自然状态。  
我们也应当尽量保持这个习惯。

## Boolean

### true 和 false 都是关键字, 表真假

## String

- 值类型，无法更改
- String意义并非“字符串”，而是字符串的UTF16编码，把每个UTF-16单元当一个字符进行处理

## Number

- 值类型，无法更改
- 采用IEEE754-2008规定的双精度规则，但为了不让处以0出错，引入了无穷大的概念
- `0.1 + 0.2 != 0.3` 由于浮点数运算精度问题导致，应这样比较`Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON`
- Infinity/-Infinity
- 存在±0，`1/x` 检测正负0，+0则为Inifinity反之为-Infinty

## Symbol

### 一切非字符串的对象key的集合

```js
var o = {}
// 定义迭代器 for ... of在对象中的行为
o[Symble.iterator] = function(){
  var v = 0
  return {
    next:function(){
      return {value:v++,done:v>10}
    }
  }
}

for(var v of o)
  console.log(v)

```

### 可以具有字符串类型的描述，但是描述相等，Symbol也不会相等

```js
var mySymbol1 = Symbol("mySymbol")
var mySymbol2 = Symbol("mySymbol")
mySymbol1 === mySymbol2 // false

```

## Object

### 对象定义是属性集合，属性分为`数据属性`和`访问器属性`

### 数据属性:具有`value,writable,enumerable,configurable`特征

### 访问器属性:具有 `getter,setter,enmerable,configureable`特征

### 跟Number，String，Boolean,Symbol关系

```js

(10).toString() // "10"
"10".charAt(0)  // "1"
(true).toString() // "true"
Symbol(10).toString() // "Symbol(10)"

// 之所以这些类型拥有方法，是因为"."运算符提供了装箱操作。  
// 它根据基础类型构造一个临时对象，使得我们能在基础类型上调用对应对象的方法


var num1 = 10 // 数字
var num2 = new Number(10) // 对象

```

## 装箱与拆箱

### 装箱转换
  
每一种基本类型Number，String，Boolean，Stybol在对象中都有对应的类。  
装箱转换，即把基本类型转换为对应的对象。

#### 强制装箱

```js

// 等同于 var symbolObject = Object(Symbol("a"))
var symbolObject = (function(){return this}).call(Symbol("a"))

typeof SymbolObject //object
symbolObject instanceof Symbol //true
symbolObject.constructor === Symbol // true
```

#### 识别对象对应的基本类型

```js
Object.prototype.toString() // 读取私有[[class]]属性，无法被修改，可准确识别对象对应的基本类型

Object.prototype.toString.call(Symbol(10))// [object Symbol]


// 定义[[class]]属性
var o = { [Symbol.toStringTag]:"myobject"}



```

### 拆箱转换
  
将对象转为基本类型

- Symbol.toPrimitive(优先级最高)
- valueOf
- toString

```js
const object1 = {
  [Symbol.toPrimitive](hint) {
    if (hint == 'number') {
      return 42;
    }
    return null;
  }
}
+object1 // 43
"" + object1 // "null"
Number(object1) // 43
String(object1) // "null"



const object2 = {
  valueOf:()=>10,
  toString:()=>"object2"
}

+object2 // 10
"" + object2 // "10"
Number(object2) // 10
String(object2) // "object2"
```
   
若对象Symbol.ToPrimitive是`函数`,则类型转换结果为`此函数`返回值。  
否则类型转换内部实现通过`ToPrimitive(input,[,PreferredType])`方法进行转换。这个方法将`input`转换成非对象类型。参数`preferredType`可选，作用是指出了将`input`被期待转成的类型，不传，默认`number`，即调用`valueOf`进行类型转换；若传`string`，则调用`toString`进行类型转换。  

[ToPrimitive原文连接](http://www.ecma-international.org/ecma-262/#sec-toprimitive)