
# Mysql学习之路（三)

## 创建和操纵表

### CREATE TABLE

````sql
CREATE TABLE customers IF NOT EXISTS
{
  cust_id int NOT NULL AUTO_INCREMENT,
  cust_name char(50) NOT NULL,
  cust_address char(50) NULL,
  cust_city char(50) NULL,
  quantity int NOT NULL DEFAULT 1,
  PRIMARY KEY (cust_id)
} ENGINE=InnoDB;
-- 返回最后一个AUTO_INCREMENT的值
SELECT last_insert_id()
````

### ALTER TABLE

````sql
-- 新增列
ALTER TABLE customer ADD customer_phone CHAR(20);
-- 删除列
ALTER TABLE customer DROP COLUMN customer_phone;
-- 添加外键
ALTER TABLE customer ADD CONSTRAINT fk_orders_customers FOREIGN KEY(cust_id) REFERENCES customers(cust_id);
````

### DROP TABLE

### RENAME TABLE XXXX TO XXXX

## 使用视图

````sql
-- 创建视图

-- 用视图简化复杂联结
CREATE VIEW student_class AS
SELECT class_id,class_name
FROM students,class WHERE students._class_id = class._class_id

-- 用视图重新格式化检索出的数据
CREATE VIEW new_students AS
SELECT (students_id * 2) AS new_id,name
FROM students

-- 过滤不想要的数据
CREATE VIEW customereamaillist as
SELECT cust_id , cust_name, cust_email
FROM customers
WHERE cust_email IS NOT NULL;
-- 查看创建视图

-- 删除视图

-- 更新视图

````

## 存储过程

### 添加存储过程

````sql
CREATE PROCEDURE productpricing()
BEGIN
  SELECT Avg(pro_price) AS priceaverage
  FROM students;
END

````

### 执行存储过程

````sql
CALL producypricing();
````

### 删除存储过程

````sql
DROP PROCEDURE IF EXISTS productpricing;
````

## 触发器

是发起是MySQL响应一下任意语句而自动执行的一条MySQL语句

1. DELETE
2. INSERT
3. UPDATE

### 创建触发器

创建触发器时，需要给出4条信息

1. 唯一的触发器名
2. 触发器关联的表
3. 触发器应该响应的活动（DELETE、INSERT、UPDATE）
4. 触发器何时执行

````sql
-- 每个表每个时间每次只允许一个触发器
-- 每个表最多支持6个触发器
-- 单一触发器不能与多个时间多个表关联

CREATE TRIGGER newproduct AFTER INSERT ON products
FOR EACH ROW SELECT 'Product added'

````

### 删除触发器

````sql
DROP TRIGGER newproduct;
````

### 使用触发器

#### INSERT 触发器

- 在INSERT触发器代码内，可引用一个名为NEW的虚拟表，访问被插入的行
- 在BEFORE INSERT触发器中，NEW中的值也可以被更新(允许更改被插入的值)
- 对于AUTO_INCREMENT列，NEW在INSERT执行之前包含0，在INSERT执行之后包含新的自动生成值

#### DELETE 触发器

- 在DELETE触发器代码内，可以引用一个名为OLD的虚拟表，访问被删除的行
- OLD中的值全部都是只读，不能更新

#### UPDATE触发器

- 在UPDATE触发器代码中，可以引用一个名为OLD的虚拟表访问以前(UPDATE语句前)的值，引用一个名为NEW的虚拟表访问新更新的值
- 在BEDORE UPDATE 中，NEW中的值可能也被更新(允许更改将要用于UPDATE语句中的值)
- OLD中的值全部都是只读，不能更新

## 事务处理

事务处理可以用来维护数据库的完整性，它保证成批的MySQL操作要么完全执行，要么完全不执行

- 事务（transaction） 指一组SQL语句
- 回退（rollback） 指撤销指定SQL语句的过程
- 提交（commit） 指将未存储的SQL语句结果写入数据库表
- 保留点（savepoint） 指事务处理中设置的临时占位符（placeholder）

### 使用ROLLBACK

````sql
SELECT * FROM ordertotals;
START TRANSACTION;
DELETE FROM ordertotals;
SELECT * FROM ordertotals;
ROLLBACK;
SELECT * FROM ordertotals;

-- INSERT、UPDATE和DELETE语句可以回退
-- SELECT 、 CREATE和DROP不能回退
`````

### 使用COMMIT

````sql
START TRANSCATION;
DELETE FROM orderitems WHERE order_num = 20010;
DELETE FROM orders WHERE order_num = 20010;
COMMIT;

-- 当COMMIT或者ROLLBACK语句执行后，事务会自动关闭(将来的更改会隐含提交)
````

### 使用保留点

````sql
SAVEPOINT delete1;
-- 每个保留点都取识别它的唯一名字，以便在回退时，MySQL知道回退到何处。

ROLL BACK TO delete1;

````

### 更改默认提交行为

````sql
SET autocommit = 0
````
