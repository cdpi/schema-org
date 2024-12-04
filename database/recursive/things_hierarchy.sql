
CREATE VIEW `things_hierarchy` AS

WITH RECURSIVE `parents` (`id`, `label`, `parent`) AS
	(
	SELECT
		`id`,
		`label`,
		`parent`
	FROM
		`thing_hierarchy`

	UNION ALL

	SELECT
		`thing_hierarchy`.`id`,
		`thing_hierarchy`.`label`,
		`parents`.`parent`
	FROM
		`thing_hierarchy`
	INNER JOIN
		`parents` ON (`thing_hierarchy`.`parent` = `parents`.`id`)
	WHERE
		`parents`.`parent` IS NOT NULL
	)

SELECT `id`, `label`, `parent` FROM `parents`;
