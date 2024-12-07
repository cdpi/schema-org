
CREATE TABLE `type`
	(
	`id` TEXT NOT NULL PRIMARY KEY,
	`label` TEXT NOT NULL,
	`comment` TEXT NOT NULL,
	`supersedes` TEXT,
	`supersededBy` TEXT,
	`isPartOf` TEXT
	);

CREATE UNIQUE INDEX `unique_type_label` ON `type` (`label`);

CREATE INDEX `index_type_isPartOf` ON `type` (`isPartOf`);
