
CREATE TABLE `thing`
	(
	`id` INTEGER NOT NULL PRIMARY KEY,
	`label` TEXT NOT NULL
	);

CREATE UNIQUE INDEX `unique_thing_label` ON `thing` (`label`);
