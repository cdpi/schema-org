
import { readFileSync } from "node:fs";
import { parse as parseCSV } from "csv-parse/sync";

const propertiesFilename = "schemaorg-all-https-properties.csv";
const typesFilename = "schemaorg-all-https-types.csv";

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

const parseTypes = path =>
	{
	let csv = readFileSync(path, "utf-8");

	let records = parse(csv);

	return records.map(record =>
		{
		let type = {};

		type.id = columnAsString(record.id);
		type.label = columnAsString(record.label);
		type.comment = columnAsString(record.comment);

		type.supersedes = columnAsString(record.supersedes);
		type.supersededBy = columnAsString(record.supersededBy);
		type.isPartOf = columnAsString(record.isPartOf);

		return type;
		});
	};

export
	{
	propertiesFilename,
	typesFilename,

	columnAsArray,
	columnAsString,

	parseProperties,
	parseTypes
	};
