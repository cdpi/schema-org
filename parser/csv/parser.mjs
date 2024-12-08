
import { parse as parseCSV } from "csv-parse/sync";
import { downloadProperties, downloadTypes } from "./downloader.mjs";

const isBlank = text => (text.trim().length === 0);

const asArray = text => text.split(",").map(value => value.trim());

const asString = text => text;

const column = (text, next) => isBlank(text) ? null : next(text);

const columnAsArray = text => column(text, asArray);

const columnAsString = text => column(text, asString);

const parse = csv => parseCSV(csv, {columns: true, skipEmptyLines: true});

const parseProperty = record =>
	{
	let property = {};

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

	return property;
	};

const parseProperties = csv =>
	{
	return parse(csv).map(parseProperty);
	};

/**
 * @param {String} release
 */
async function downloadAndParseProperties(release)
	{
	return parseProperties(await downloadProperties(release));
	}

const parseType = record =>
	{
	let type = {};

	type.id = columnAsString(record.id);
	type.label = columnAsString(record.label);
	type.comment = columnAsString(record.comment);
	type.subTypeOf = columnAsArray(record.subTypeOf);
	type.enumerationtype = columnAsString(record.enumerationtype);
	type.equivalentClass = columnAsArray(record.equivalentClass);
	type.properties = columnAsArray(record.properties);
	type.subTypes = columnAsArray(record.subTypes);
	type.supersedes = columnAsString(record.supersedes);
	type.supersededBy = columnAsString(record.supersededBy);
	type.isPartOf = columnAsString(record.isPartOf);

	return type;
	};

const parseTypes = csv =>
	{
	return parse(csv).map(parseType);
	};

/**
 * @param {String} release
 */
async function downloadAndParseTypes(release)
	{
	return parseTypes(await downloadTypes(release));
	}

const arrayAsObject = array =>
	{
	let object = {};

	array.forEach(item =>
		{
		object[item.id] = item;
		});

	return object;
	};

export
	{
	arrayAsObject,
	parse,
	parseProperty,
	parseProperties,
	downloadAndParseProperties,
	parseType,
	parseTypes,
	downloadAndParseTypes
	};
