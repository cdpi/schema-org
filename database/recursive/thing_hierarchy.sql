
CREATE VIEW `thing_hierarchy` AS
SELECT
	`thing`.`id`,
	`thing`.`label`,
	`hierarchy`.`parent`
FROM
	`thing`
INNER JOIN
	`hierarchy` ON (`hierarchy`.`thing` = `thing`.`id`)
;
