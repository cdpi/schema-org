
import { readFileSync } from "node:fs";
import { DatabaseSync as SQLite } from "node:sqlite";
import { downloadProperties, downloadTypes } from "../../parser/csv/downloader.mjs";
import { parseProperties, parseTypes } from "../../parser/csv/parser.mjs";

// node --experimental-sqlite from-csv.mjs

const arrayAsString = array => (array === null) ? null : array.join(",");

let release = "28.1";

let properties = parseProperties(await downloadProperties(release));
//let types = parseTypes(await downloadTypes(release));

let database = new SQLite("from-csv.sqlite");

database.exec(readFileSync("create-table-property.sql", "utf-8"));
//database.exec(readFileSync("create-table-type.sql", "utf-8"));

let insertProperty = database.prepare(readFileSync("insert-property.sql", "utf-8"));
//let insertType = database.prepare(readFileSync("insert-type.sql", "utf-8"));

database.exec("BEGIN TRANSACTION;");

properties.forEach(property =>
	{
	property.subPropertyOf = arrayAsString(property.subPropertyOf);
	property.subproperties = arrayAsString(property.subproperties);
	property.domainIncludes = arrayAsString(property.domainIncludes);
	property.rangeIncludes = arrayAsString(property.rangeIncludes);

	insertProperty.run(property);
	});

//types.forEach(type => {});

database.exec("COMMIT;");
