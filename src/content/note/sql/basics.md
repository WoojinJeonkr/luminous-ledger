# SQL 기본 문법

## SELECT 문

```sql
-- 모든 컬럼 선택
SELECT * FROM table_name;

-- 특정 컬럼 선택
SELECT column1, column2 FROM table_name;

-- WHERE 조건
SELECT * FROM table_name WHERE condition;

-- ORDER BY 정렬
SELECT * FROM table_name ORDER BY column_name ASC/DESC;
```

## INSERT 문

```sql
-- 모든 컬럼에 대한 값 삽입
INSERT INTO table_name VALUES (value1, value2, ...);

-- 특정 컬럼에 대한 값 삽입
INSERT INTO table_name (column1, column2) VALUES (value1, value2);
```

## UPDATE 문

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

## DELETE 문

```sql
DELETE FROM table_name WHERE condition;

-- 주의: WHERE 절 없이 실행하면 모든 데이터가 삭제됨
DELETE FROM table_name;
```
