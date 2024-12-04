
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
