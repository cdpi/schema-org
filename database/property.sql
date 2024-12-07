
CREATE TABLE `property`
	(
	`id` TEXT NOT NULL PRIMARY KEY,
	`label` TEXT NOT NULL,
	`comment` TEXT NOT NULL,
	`subPropertyOf` TEXT,
	`equivalentProperty` TEXT,
	`inverseOf` TEXT,
	`supersedes` TEXT,
	`supersededBy` TEXT,
	`isPartOf` TEXT
	);

CREATE UNIQUE INDEX `unique_property_label` ON `property` (`label`);

CREATE INDEX `index_property_isPartOf` ON `property` (`isPartOf`);

/*
property.id = columnAsString(record.id);
property.label = columnAsString(record.label);
property.comment = columnAsString(record.comment);
property.subPropertyOf = columnAsArray(record.subPropertyOf);
property.equivalentProperty = columnAsString(record.equivalentProperty);
property.subproperties = columnAsArray(record.subproperties);
property.domainIncludes = columnAsArray(record.domainIncludes);
property.rangeIncludes = columnAsArray(record.rangeIncludes);
property.inverseOf = columnAsString(record.inverseOf);
property.supersedes = columnAsString(record.supersedes);
property.supersededBy = columnAsString(record.supersededBy);
property.isPartOf = columnAsString(record.isPartOf);
*/
