
import { DatabaseSync as SQLite } from "node:sqlite";
import { downloadProperties, downloadTypes } from "../parser/csv/downloader.mjs";
import { parse } from "../parser/csv/parser.mjs";

const column = key => `${key} TEXT`;

const columns = (object, mapper) => Object.keys(object).map(mapper).join(",");

const table = (name, object) => `CREATE TABLE ${name} (${columns(object, column)})`;

const parameter = key => `:${key}`;

const insert = (name, object) => `INSERT INTO ${name} VALUES (${columns(object, parameter)})`;

/**
 * @param {String} path
 * @param {String} release
 */
async function createDatabaseFromCSV(path, release)
	{
	let properties = parse(await downloadProperties(release));
	let types = parse(await downloadTypes(release));

	let database = new SQLite(path);

	database.exec(table("property", properties[0]));
	database.exec(table("type", types[0]));

	database.exec("BEGIN TRANSACTION;");

	let insertProperty = database.prepare(insert("property", properties[0]));

	properties.forEach(property => insertProperty.run(property));

	let insertType = database.prepare(insert("type", types[0]));

	types.forEach(type => insertType.run(type));

	database.exec("COMMIT;");

	database.close();
	}

function columnStatistics(database, table, columns)
	{
	let tableStatistics = {};

	columns.forEach(column =>
		{
		let records = database.prepare(`SELECT ${column} FROM ${table};`).all().map(record => record[column]);

		let statistics =
			{
			count: 0,
			blank: 0,
			comma: false,
			unique: null
			};

		let values = new Set();

		records.forEach(record =>
			{
			statistics.count++;

			if (record.trim().length === 0)
				{
				statistics.blank++;
				}
			else
				{
				if (!statistics.comma)
					{
					statistics.comma = record.indexOf(",") >= 0;
					}
				}

			values.add(record);
			});

		statistics.unique = values.size === statistics.count;

		tableStatistics[column] = statistics;
		});

	return tableStatistics;
	}

/**
 * @param {String} path
 */
function statistics(path)
	{
	let database = new SQLite(path);

	let property = ["id", "label", "comment", "subPropertyOf", "equivalentProperty", "subproperties", "domainIncludes", "rangeIncludes", "inverseOf", "supersedes", "supersededBy", "isPartOf"];
	let type = ["id", "label", "comment", "subTypeOf", "enumerationtype", "equivalentClass", "properties", "subTypes", "supersedes", "supersededBy", "isPartOf"];

	//let columns = Object.keys(database.prepare("SELECT * FROM property LIMIT 1;").all()[0]).join(",");
	//let fields = property.join(",");
	//console.log(columns === fields);

	//let columns = Object.keys(database.prepare("SELECT * FROM type LIMIT 1;").all()[0]).join(",");
	//let fields = type.join(",");
	//console.log(columns === fields);

	let statistics = {};

	statistics.property = columnStatistics(database, "property", property);
	statistics.type = columnStatistics(database, "type", type);

	database.close();

	return statistics;
	}

export
	{
	createDatabaseFromCSV,
	statistics
	};
