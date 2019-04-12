# MySql学习之路(二)

## 入门篇学习资料

1. 廖雪峰Sql入门
2. MySql必知必会

## SQL进阶

### 数据检索

customers
<table>
  <tr>
    <td>cust_id</td>
    <td>cust_name</td>
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
</table>

orderitems

<table>
  <tr>
    <td>order_num</td>
    <td>prod_id</td>
  </tr>
  <tr>
    <td>o1</td>
    <td>TNT2</td>
  </tr>
  <tr>
    <td>o2</td>
    <td>TNT1</td>
  </tr>
  <tr>
    <td>o3</td>
    <td>TNT3</td>
  </tr>
    <tr>
    <td>o4</td>
    <td>TNT2</td>
  </tr>
  <tr>
    <td>o5</td>
    <td>TNT2</td>
  </tr>
  <tr>
    <td>o6</td>
    <td>TNT4</td>
  </tr>
</table>

orders
<table>
  <tr>
    <td>order_num</td>
    <td>cust_id</td>
  </tr>
  <tr>
    <td>o1</td>
    <td>1</td>
  </tr>
  <tr>
    <td>o2</td>
    <td>2</td>
  </tr>
  <tr>
    <td>o3</td>
    <td>1</td>
  </tr>
    <tr>
    <td>o4</td>
    <td>2</td>
  </tr>
  <tr>
    <td>o5</td>
    <td>3</td>
  </tr>
  <tr>
    <td>o6</td>
    <td>3</td>
  </tr>
</table>

#### 使用子查询

`````sql
-- 利用子查询进行过滤
SELECT cust_name FROM customers WHERE cust_id IN(
  SELECT cust_id FROM orders WHERE orders WHERE order_num IN (
    SELECT order_num FROM orderitems WHERE prod_id = 'TNT2'
  ))
--
SELECT cust_name,(
  SELECT COUNT(*) FROM orders WHERE orders.cust_id = customers.cust_id
  ) AS orders FROM customers ORDER BY cust_name

`````

#### 联结表

##### 笛卡儿积

检索出的行的数目将是第一个表中行数乘以第二个表中的行数

````sql
// customers表的每一行和orders表的每一行进行配对

SELECT * FROM customers,orders


````

##### 等值联结/内部联结

````sql
// 利用where进行过滤
SELECT * FROM customers,orders WHERE customers.cust_id = orders.cust_id

// 其他语法
SELECT * FROM customers INNER JOIN orders ON customers.cust_id = orders.cust_id

````

#### 高级联结

##### 自联结

````sql
// 表别名
SELECT * FROM customers AS c1,customers AS c2 WHERE c1.cust_id = c2.cust_id AND p2.cust_id = 2

````

##### 自然联结

##### 外联结

#### 组合查询

- UNION
- UNION ALL

#### 全文本检索

- Match
- Against

````sql
-- 查询扩展
-- 首先，进行一个基于全文本搜索，找出与搜索条件匹配的所有行
-- 其次，MYSQL检查这些匹配行并选择所有有用的词
-- 最后，MYSQL再次进行全文本搜索，这次不仅使用原来的条件还会使用所有有用的词
SELECT prod_id FROM orderitems WHERE MATCH(prod_name) Against('TNT' WITH QUERY EXPANSION)



-- 布尔文本搜索
-- 即使没有索引也可以使用，操作缓慢

SELECT prod_id FROM orderitems WHERE MATCH(prod_name) Against('TNT -TNT1*' IN BOOLEAN MODE)

````

### 数据插入

- 插入完整的行
- 插入行的一部分
- 插入多行
- 插入某些查询结果

````sql
-- INSERT INTO
-- INSERT LOW_PRIORITY INTO

-- 插入完整行

-- 不提供列名，必须给每个表列提供一个值

INSERT INTO customers VALUE(
  NULL,
  'TTT10'
)

-- 插入行一部分
INSERT INTO customers(
  cust_name
) VALUE(
  'TNT10'
)
-- 插入多个行
INSERT INTO customers(
  cust_name
) VALUE(
  'TNT10'
),
(
  'TNT11'
)

-- 插入检索出的数据

INSERT INTO customers(
  cust_name
) SELECT cust_name FROM custnew;
````

### 更新与删除

#### 更新

- 更新表中特定行
- 更新表中所有行

- UPDATE SET

````sql
UPDATE customers
SET cust_name = '小王'
WHERE cust_id = 2
````

#### 删除

- 从表中删除特定行
- 从表中删除所有行

````sql
DELETE FROM customers
WHERE cust_id = 1
````