
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
