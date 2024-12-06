
import { readFileSync } from "node:fs";
import { parse as parseCSV } from "csv-parse/sync";

const isBlank = text => (text.trim().length === 0);

const asArray = text => text.split(",").map(value => value.trim());

const asString = text => text;

const column = (text, next) => isBlank(text) ? null : next(text);

const columnAsArray = text => column(text, asArray);

const columnAsString = text => column(text, asString);

const parse = csv => parseCSV(csv, {columns: true, skipEmptyLines: true});

const parseProperties = path =>
	{
	let csv = readFileSync(path, "utf-8");

	let records = parse(csv);

	return records.map(record =>
		{
		let property = {};

		property.id = columnAsString(record.id);
		property.label = columnAsString(record.label);
		property.comment = columnAsString(record.comment);
		property.subPropertyOf = columnAsString(record.subPropertyOf);
		property.equivalentProperty = columnAsString(record.equivalentProperty);
		property.subproperties = columnAsArray(record.subproperties);
		property.domainIncludes = columnAsArray(record.domainIncludes);
		property.rangeIncludes = columnAsArray(record.rangeIncludes);
		property.inverseOf = columnAsString(record.inverseOf);
		property.supersedes = columnAsString(record.supersedes);
		property.supersededBy = columnAsString(record.supersededBy);
		property.isPartOf = columnAsString(record.isPartOf);

		return property;
		});
	};

export
	{
	columnAsArray,
	columnAsString,
	parseProperties
	};
