
const isBlank = text => (text.trim().length === 0);

const asString = text => text;

const asArray = text => text.split(",").map(part => part.trim());

const parseColumn = (text, ifNotBlank) => isBlank(text) ? null : ifNotBlank(text);

const parseColumnAsString = text => parseColumn(text, asString);
const parseColumnAsArray = text => parseColumn(text, asArray);

const parseProperty = record =>
	{
	let property = {};

	property.id = parseColumnAsString(record.id);
	property.label = parseColumnAsString(record.label);
	property.comment = parseColumnAsString(record.comment);
	property.subPropertyOf = parseColumnAsString(record.subPropertyOf);
	property.equivalentProperty = parseColumnAsString(record.equivalentProperty);
	property.subproperties = parseColumnAsArray(record.subproperties);
	property.domainIncludes = parseColumnAsArray(record.domainIncludes);
	property.rangeIncludes = parseColumnAsArray(record.rangeIncludes);
	property.inverseOf = parseColumnAsString(record.inverseOf);
	property.supersedes = parseColumnAsString(record.supersedes);
	property.supersededBy = parseColumnAsString(record.supersededBy);
	property.isPartOf = parseColumnAsString(record.isPartOf);

	return property;
	};

export
	{
	parseProperty
	};
