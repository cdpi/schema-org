
SELECT 'LocalBusiness';
SELECT '--------------------------------------------------------';

SELECT `id`, `label`, `parent`
FROM `things_hierarchy`
WHERE `id` = 13;

SELECT '';
SELECT 'LocalBusiness';
SELECT '--------------------------------------------------------';

SELECT DISTINCT `id`, `label`, `parent`
FROM `things_hierarchy`
WHERE `id` = 13;

SELECT '';
SELECT 'LocalBusiness';
SELECT '--------------------------------------------------------';

SELECT `id`, `label`, JSON_GROUP_ARRAY(`parent`)
FROM `things_hierarchy`
WHERE `id` = 13
GROUP BY `id`, `label`;

SELECT '';
SELECT 'LocalBusiness';
SELECT '--------------------------------------------------------';

SELECT DISTINCT `id`, `label`, JSON_GROUP_ARRAY(`parent`)
FROM `things_hierarchy`
WHERE `id` = 13
GROUP BY `id`, `label`;
SELECT 'FAIL';

SELECT '';
SELECT 'LocalBusiness';
SELECT '--------------------------------------------------------';

SELECT `id`, `label`, JSON_GROUP_ARRAY(DISTINCT `parent`)
FROM `things_hierarchy`
WHERE `id` = 13
GROUP BY `id`, `label`;
SELECT 'OK';

SELECT '';
SELECT 'LocalBusiness';
SELECT '--------------------------------------------------------';

SELECT `id`, `label`, JSON_GROUP_ARRAY(DISTINCT `parent`)
FROM `things_hierarchy`
WHERE `id` = 13
GROUP BY `id`, `label`
ORDER BY `parent` ASC;
SELECT 'FAIL';

SELECT '';
SELECT 'LocalBusiness';
SELECT '--------------------------------------------------------';

SELECT DISTINCT `id`, `label`, `parent`
FROM `things_hierarchy`
WHERE `id` = 13
ORDER BY `parent` ASC;



SELECT '--------------------------------------------------------';

SELECT DISTINCT
	`things_hierarchy`.`id`,
	`things_hierarchy`.`label`,
	`things_hierarchy`.`parent`,
	`thing`.`label`
FROM
	`things_hierarchy`
INNER JOIN
	`thing` ON (`thing`.`id` = `things_hierarchy`.`parent`)
WHERE
	`things_hierarchy`.`id` = 14
ORDER BY
	`things_hierarchy`.`parent` ASC
;

SELECT '--------------------------------------------------------';

-- EXPLAIN QUERY PLAN
SELECT `things_hierarchy`.`label`, COUNT(DISTINCT `things_hierarchy`.`parent`), GROUP_CONCAT(DISTINCT `thing`.`label`)
FROM `things_hierarchy` INNER JOIN `thing` ON (`thing`.`id` = `things_hierarchy`.`parent`)
GROUP BY `things_hierarchy`.`label`
ORDER BY 1;

SELECT '--------------------------------------------------------';

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
