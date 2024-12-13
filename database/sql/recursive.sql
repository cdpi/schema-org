
PRAGMA foreign_keys = ON;

-----------------------------------------------------------------------------------------------------------

CREATE TABLE `thing`
	(
	`id` INTEGER NOT NULL PRIMARY KEY,
	`label` TEXT NOT NULL
	);

CREATE UNIQUE INDEX `unique_thing_label` ON `thing` (`label`);

-----------------------------------------------------------------------------------------------------------

CREATE TABLE `hierarchy`
	(
	`thing` INTEGER NOT NULL,
	`parent` INTEGER,
	PRIMARY KEY (`thing`, `parent`)
	FOREIGN KEY (`thing`) REFERENCES `thing` (`id`),
	FOREIGN KEY (`parent`) REFERENCES `thing` (`id`)
	);

CREATE INDEX `index_hierarchy_thing` ON `hierarchy` (`thing`);
CREATE INDEX `index_hierarchy_parent` ON `hierarchy` (`parent`);

-----------------------------------------------------------------------------------------------------------

CREATE VIEW `thing_hierarchy` AS
SELECT
	`thing`.`id`,
	`thing`.`label`,
	`hierarchy`.`parent`
FROM
	`thing`
INNER JOIN
	`hierarchy` ON (`hierarchy`.`thing` = `thing`.`id`);

-----------------------------------------------------------------------------------------------------------

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

-----------------------------------------------------------------------------------------------------------

INSERT INTO `thing` VALUES (1, 'Thing');
INSERT INTO `thing` VALUES (2, 'Person');
INSERT INTO `thing` VALUES (3, 'CreativeWork');
INSERT INTO `thing` VALUES (4, 'Painting');
INSERT INTO `thing` VALUES (5, 'Photograph');
INSERT INTO `thing` VALUES (6, 'MediaObject');
INSERT INTO `thing` VALUES (7, 'AudioObject');
INSERT INTO `thing` VALUES (8, 'ImageObject');
INSERT INTO `thing` VALUES (9, 'VisualArtwork');
INSERT INTO `thing` VALUES (10, 'CoverArt');
INSERT INTO `thing` VALUES (11, 'Organization');
INSERT INTO `thing` VALUES (12, 'Place');
INSERT INTO `thing` VALUES (13, 'LocalBusiness');
INSERT INTO `thing` VALUES (14, 'FoodEstablishment');

-----------------------------------------------------------------------------------------------------------

INSERT INTO `hierarchy` VALUES (1, NULL);
INSERT INTO `hierarchy` VALUES (2, 1);
INSERT INTO `hierarchy` VALUES (3, 1);
INSERT INTO `hierarchy` VALUES (4, 3);
INSERT INTO `hierarchy` VALUES (5, 3);
INSERT INTO `hierarchy` VALUES (6, 3);
INSERT INTO `hierarchy` VALUES (7, 6);
INSERT INTO `hierarchy` VALUES (8, 6);
INSERT INTO `hierarchy` VALUES (9, 3);
INSERT INTO `hierarchy` VALUES (10, 9);
INSERT INTO `hierarchy` VALUES (11, 1);
INSERT INTO `hierarchy` VALUES (12, 1);

INSERT INTO `hierarchy` VALUES (13, 11); -- Thing > Organization > LocalBusiness
INSERT INTO `hierarchy` VALUES (13, 12); -- Thing > Place > LocalBusiness

INSERT INTO `hierarchy` VALUES (14, 13); -- Thing > Organization > LocalBusiness > FoodEstablishment
                                         -- Thing > Place > LocalBusiness > FoodEstablishment

-----------------------------------------------------------------------------------------------------------
