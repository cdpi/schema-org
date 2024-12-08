
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

/**
 * @param {String} path
 */
function statistics(path)
	{
	let database = new SQLite(path);

	/*
	let tables = database.prepare("SELECT name FROM sqlite_master WHERE type = 'table';").all();

	tables.forEach(table =>
		{
		console.log(table.name);

		let columns = database.prepare(`SELECT * FROM pragma table_info(${table.name});`).all();

		columns.forEach(column =>
			{
			console.log(column);
			});
		});
	*/

	database.close();
	}

export
	{
	createDatabaseFromCSV,
	statistics
	};