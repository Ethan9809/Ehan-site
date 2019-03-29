# MySql学习之路（一）

## 入门篇学习资料

1. 廖雪峰Sql入门
2. MySql必知必会

## SQL入门

### 数据检索

students
<table>
  <tr>
    <td>id</td>
    <td>name</td>
  </tr>
  <tr>
    <td>1</td>
    <td>小明</td>
  </tr>
  <tr>
    <td>2</td>
    <td>小红</td>
  </tr>
  <tr>
    <td>3</td>
    <td>小红</td>
  </tr>
  <tr>
    <td>4</td>
    <td>小方</td>
  </tr>
</table>

#### SELECT 检索

````sql
SELECT id,name FROM students;

SELECT * FROM students;
````

#### DISTINCT 去重

````sql
// 去掉 name 重复的name检索
SELECT DISTINCT name FROM students;

// 去掉 name，id 同时重复检索
SELECT DISTINCT id,name FROM students;

````

#### LIMIT 截取

````sql
// 行数从 0 开始计算

// 从第0行检索1个信息  
SELECT id FROM students LIMIT 1;

// 从第0行检索2个信息
SELECT id FROM students LIMIT 0,2;

// 从第0行检索2个信息
SELECT id FROM students LIMIT 2 OFFSET 0;


````

#### 完全限定表名

````sql

// school 为数据库名，students为school数据库中一个表

SELECT students.id FROM school.students;

````

#### 排序检索数据（ORDER BY）

- ORDER BY
- DESC
- ASC

````sql
// 使用选择列排序
SELECT id FROM students ORDER BY id;
// 使用非选择列排序
SELECT id FROM students ORDER BY name;


// 多列排序
// 先按照name排序，再在多个行具有相同name的值按照id排序
SELECT id,name FROM students ORDER BY name,id;

// 升序降序
// 先按照name降序排序，再在多个行具有相同name的值按照id升序排序(默认)
SELECT id,name FROM students ORDER BY name DESC,id;


// 寻找最大id
SELECT id FROM students ORDER BY id DESC LIMIT 1;
````

#### 过滤数据

- where
- between ... and ...
- or
- and
- in
- not

````sql
SELECT * FROM students WHERE name = '小明';
SELECT * FROM students WHERE id BETWEEN 1 AND 2;

// 空值检查
SELECT * FROM students WHERE id IS NULL;

/*
  NULL具有特殊含义，在通过过滤选择出不具有特定值的行时，NULL不会被过滤掉。
*/
// or
SELECT * FROM students WHERE name = '小明' OR name = '小红';

// and
SELECT * FROM students WHERE name = '小红' AND id = 2;

// in
SELECT * FROM students WHERE id IN (1,2);

// not
// mysql 支持 not 对 in、between、exists 取反
SELECT * FROM students WHERE id NOT IN (1,2);

````

#### 通配符

- like
- %
- _

````sql
// % 匹配任意数量[0,]的任意字符
// % 不能匹配NULL
SELECT * FROM students WHERE name LIKE '小%'

// _ 匹配单个字符
SELECT * FROM students WHERE name LIKE '_红'


````

#### 正则表达式

- REGEXP

````sql
// 不会返回数据
SELECT * FROM students WHERE name LIKE '小红'
// 会返回数据
SELECT * FROM students WHERE name REGEXP '小红'
SELECT * FROM students WHERE name REGEXP '小红|小明'

````

#### 计算字段

- Concat 连接
- Rtrim/Ltrim/Trim  去除右/左/左右空格
- AS
- `+ - * /`

````sql
SELECT Concat(name,'(',id,')') FROM students ORDER BY id

SELECT id * 2 AS new_id FROM students
````

#### 数据处理函数

##### 文本处理函数

- Left
- Length
- Locate
- Lower
- Ltrim Rtrim Trim
- Right
- Soundex
- SubString
- Upper

##### 日期处理函数

##### 数值处理函数

#### 聚集函数

- AVG
- COUNT
- MAX
- MIN
- SUM
- DISTINCT

````sql
SELECT COUNT(*) AS students_num,MIN(id) AS min_id,MAX(id) AS max_id,AVG(DISTINCT id) FROM students

````