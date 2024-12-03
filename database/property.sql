
CREATE TABLE `property`
	(
	`id` TEXT NOT NULL PRIMARY KEY,
	`label` TEXT NOT NULL,
	`comment` TEXT NOT NULL,
	`superseded` TEXT,
	`schema` TEXT
	);

CREATE UNIQUE INDEX `unique_property_label` ON `property` (`label`);
