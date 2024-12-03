
CREATE TABLE `type`
	(
	`id` TEXT NOT NULL PRIMARY KEY,
	`label` TEXT NOT NULL,
	`comment` TEXT NOT NULL,
	`superseded` TEXT,
	`schema` TEXT
	);

CREATE UNIQUE INDEX `unique_type_label` ON `type` (`label`);
