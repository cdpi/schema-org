
WITH RECURSIVE `parents` AS
	(
	SELECT `thing`, `parent`
	FROM `hierarchy`

	UNION ALL

	SELECT
		`hierarchy`.`thing`,
		`parents`.`parent`
	FROM `hierarchy`
	INNER JOIN `parents` ON (`hierarchy`.`parent` = `parents`.`thing`)
	WHERE `parents`.`parent` IS NOT NULL
	)
SELECT
	`thing`,
	JSON_GROUP_ARRAY(DISTINCT `parent`)
	-- GROUP_CONCAT(`parent`, '.')
FROM
	`parents`
GROUP BY
	`thing`
--WHERE
--	`thing` = 5
;

--SELECT json_group_array(TypeId) FROM Pets;
