
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
