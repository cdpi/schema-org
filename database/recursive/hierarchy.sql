
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
