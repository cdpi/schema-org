
-- https://use.expensify.com/blog/the-simplest-sqlite-common-table-expression-tutorial



-----------------------------------------------------------------------------------

SELECT 1;
1

-----------------------------------------------------------------------------------

SELECT * FROM ( SELECT 1 );
1

-----------------------------------------------------------------------------------

WITH one AS ( SELECT 1 ) SELECT * FROM one;
1

-----------------------------------------------------------------------------------

WITH two (a, b) AS ( SELECT 1, 2 ) SELECT a, b FROM two;
1|2

-----------------------------------------------------------------------------------

CREATE TABLE foo ( bar INTEGER );

INSERT INTO foo VALUES (1);
INSERT INTO foo VALUES (2);

SELECT * FROM foo;
1
2

WITH foo_cte AS (SELECT * FROM foo) SELECT * FROM foo_cte;
1
2

-----------------------------------------------------------------------------------

WITH a_cte AS (SELECT 'a'), b_cte AS (SELECT 'b') SELECT * FROM a_cte, b_cte;
a|b

-----------------------------------------------------------------------------------

SELECT 1, 2 UNION ALL SELECT 3, 4;
1|2
3|4

-----------------------------------------------------------------------------------

WITH RECURSIVE infinite AS ( SELECT 1 UNION ALL SELECT * FROM infinite) SELECT * FROM infinite;

-----------------------------------------------------------------------------------

WITH RECURSIVE finite AS ( SELECT 1 UNION ALL SELECT * FROM finite LIMIT 2 ) SELECT * FROM finite;
1
1

-----------------------------------------------------------------------------------

-- WITH RECURSIVE ten(x) AS ( SELECT 1 UNION ALL SELECT x + 1 FROM ten WHERE x < 10 ) SELECT * FROM ten;
WITH RECURSIVE ten(x) AS ( SELECT 1 UNION ALL SELECT x + 1 FROM ten WHERE x < 10 ) SELECT x FROM ten;
1
...
10

-----------------------------------------------------------------------------------

-- x < '2016-01-01') ne fonctionne pas bien ???

WITH RECURSIVE dates(x) AS ( SELECT '2015-01-01' UNION ALL SELECT DATE(x, '+1 MONTHS') FROM dates WHERE x < '2016-01-01') SELECT x FROM dates;
2015-01-01
...
2016-01-01 -- <-- pourquoi ??

-----------------------------------------------------------------------------------

-- Copier/Coller marche pô: sqlite3 :memory: < list.sql

WITH RECURSIVE list(element, remainder) AS
	(
	SELECT
		NULL AS element,
		'1,2,3,4,5' AS remainder
	UNION ALL
	SELECT
		CASE WHEN INSTR(remainder, ',') > 0 THEN
			SUBSTR(remainder, 0, INSTR(remainder, ','))
		ELSE
			remainder
		END AS element,
		CASE WHEN INSTR(remainder, ',') > 0 THEN
			SUBSTR(remainder, INSTR(remainder, ',' ) + 1)
		ELSE
			NULL
		END AS remainder
	FROM list
	WHERE remainder IS NOT NULL
	)
SELECT element
FROM list
WHERE element IS NOT NULL;

-----------------------------------------------------------------------------------

-- Copier/Coller marche pô non plus: sqlite3 :memory: < company.sql

CREATE TABLE company ( name, approver );

INSERT INTO company VALUES 
	( 'David', NULL ),
	( 'Matt', 'David' ), 
	( 'Jason', 'David' ),
	( 'Ryan', 'David' ),
	( 'Mike', 'Matt' ),
	( 'Carlos', 'Matt' ),
	( 'Garrett', 'Jason' ),
	( 'Puneet', 'Jason' ),
	( 'Joanie', 'Ryan' );

WITH RECURSIVE approvers(x) AS
	(
	SELECT
		'Joanie'
	UNION ALL
	SELECT
		company.approver
	FROM
		company, approvers
	WHERE
		company.name = approvers.x
	AND
		company.approver IS NOT NULL
	)
SELECT x FROM approvers;

Joanie
Ryan
David

-----------------------------------------------------------------------------------
