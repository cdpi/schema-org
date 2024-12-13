
-------------------------------------------------------------------------------------------------------------------

CREATE TABLE `property`
	(
	`id` TEXT NOT NULL PRIMARY KEY,
	`label` TEXT NOT NULL,
	`comment` TEXT NOT NULL,

	`equivalentProperty` TEXT,

	`inverseOf` TEXT,

	`supersededBy` TEXT,
	`isPartOf` TEXT
	);

CREATE UNIQUE INDEX `unique_property_label` ON `property` (`label`);

CREATE INDEX `index_property_isPartOf` ON `property` (`isPartOf`);

/*
CREATE TABLE `property`
	(
	`subPropertyOf` TEXT,
	
	subproperties
	domainIncludes
	rangeIncludes

	supersedes
	);

*/

-------------------------------------------------------------------------------------------------------------------

CREATE TABLE `property_hierarchy`
	(
	`property` TEXT NOT NULL,
	`parent` TEXT,
	PRIMARY KEY (`property`, `parent`)
	FOREIGN KEY (`property`) REFERENCES `property` (`id`),
	FOREIGN KEY (`parent`) REFERENCES `property` (`id`)
	);

CREATE INDEX `index_property_hierarchy_property` ON `property_hierarchy` (`property`);
CREATE INDEX `index_property_hierarchy_parent` ON `property_hierarchy` (`parent`);

-------------------------------------------------------------------------------------------------------------------

CREATE VIEW `properties_hierarchy` AS

WITH RECURSIVE `parents` (`id`, `parent`) AS
	(
	SELECT
		`property`,
		`parent`
	FROM
		`property_hierarchy`

	UNION ALL

	SELECT
		`property_hierarchy`.`property`,
		`parents`.`parent`
	FROM
		`property_hierarchy`
	INNER JOIN
		`parents` ON (`property_hierarchy`.`parent` = `parents`.`id`)
	WHERE
		`parents`.`parent` IS NOT NULL
	)

SELECT `id`, `parent` FROM `parents`;

-------------------------------------------------------------------------------------------------------------------

CREATE TABLE `enumeration`
	(
	`id` TEXT NOT NULL PRIMARY KEY,
	`label` TEXT NOT NULL,
	`comment` TEXT NOT NULL,
	`isPartOf` TEXT
	);

CREATE UNIQUE INDEX `unique_enumeration_label` ON `enumeration` (`label`);

CREATE INDEX `index_enumeration_isPartOf` ON `enumeration` (`isPartOf`);

-------------------------------------------------------------------------------------------------------------------

CREATE TABLE `enumeration_member`
	(
	`id` TEXT NOT NULL PRIMARY KEY,
	`label` TEXT NOT NULL,
	`comment` TEXT NOT NULL,
	`supersededBy` TEXT,
	`isPartOf` TEXT
	);

CREATE UNIQUE INDEX `unique_enumeration_member_label` ON `enumeration_member` (`label`);

CREATE INDEX `index_enumeration_member_isPartOf` ON `enumeration_member` (`isPartOf`);

-------------------------------------------------------------------------------------------------------------------

CREATE TABLE `type`
	(
	`id` TEXT NOT NULL PRIMARY KEY,
	`label` TEXT NOT NULL,
	`comment` TEXT NOT NULL,

	`equivalentClass` TEXT,

	`supersededBy` TEXT,
	`isPartOf` TEXT
	);

CREATE UNIQUE INDEX `unique_type_label` ON `type` (`label`);

CREATE INDEX `index_type_isPartOf` ON `type` (`isPartOf`);

-------------------------------------------------------------------------------------------------------------------

/*
CREATE TABLE `type`
	(
	`supersedes` TEXT,
	`supersededBy` TEXT,
	);

*/

/*
CREATE TABLE `domain`
	(
	`property` TEXT NOT NULL,
	`type` TEXT NOT NULL,
	FOREIGN KEY (`property`) REFERENCES `property` (`id`),
	FOREIGN KEY (`type`) REFERENCES `type` (`id`),
	PRIMARY KEY (`property`, `type`)
	);

CREATE INDEX `index_domain_property` ON `domain` (`property`);
CREATE INDEX `index_domain_type` ON `domain` (`type`);
*/

/*
CREATE TABLE `schema`
	(
	`id` INTEGER NOT NULL PRIMARY KEY,
	`url` TEXT NOT NULL
	);

CREATE UNIQUE INDEX `unique_schema_url` ON `schema` (`url`);

INSERT INTO `schema` VALUES (1, 'https://schema.org');
INSERT INTO `schema` VALUES (2, 'https://attic.schema.org');
INSERT INTO `schema` VALUES (3, 'https://auto.schema.org');
INSERT INTO `schema` VALUES (4, 'https://bib.schema.org');
INSERT INTO `schema` VALUES (5, 'https://meta.schema.org');
INSERT INTO `schema` VALUES (6, 'https://pending.schema.org');
*/
