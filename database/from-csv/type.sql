
CREATE TABLE type
	(
	id TEXT NOT NULL,
	label TEXT NOT NULL,
	comment TEXT NOT NULL,
	enumerationtype TEXT,
	equivalentClass TEXT,
	supersedes TEXT,
	supersededBy TEXT,
	isPartOf TEXT
	);
