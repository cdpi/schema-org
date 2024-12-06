
CREATE TABLE property
	(
	id TEXT NOT NULL,
	label TEXT NOT NULL,
	comment TEXT NOT NULL,
	subPropertyOf TEXT,
	equivalentProperty TEXT,
	inverseOf TEXT,
	supersedes TEXT,
	supersededBy TEXT,
	isPartOf TEXT
	);
