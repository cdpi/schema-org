
import { readFileSync } from "node:fs";
import { DatabaseSync as SQLite } from "node:sqlite";
import { arrayAsObject, downloadAndParseProperties, downloadAndParseTypes } from "../parser/csv/parser.mjs";
import { getEnumerations } from "../parser/csv/enumerations.mjs";

// node --experimental-sqlite database.mjs

let read = path => readFileSync(path, "utf-8");

let release = "28.1";

let properties = arrayAsObject(await downloadAndParseProperties(release));
//let types = arrayAsObject(await downloadAndParseTypes(release));
//let enumerations = getEnumerations(types);

let path = "things.sqlite";

let database = new SQLite(path);

database.exec(read("schema.sql"));

database.exec("BEGIN TRANSACTION;");

let insertProperty = database.prepare(read("insert-property.sql"));

Object.values(properties).forEach(property =>
	{
	delete property.subPropertyOf;
	delete property.subproperties;
	delete property.domainIncludes;
	delete property.rangeIncludes;
	delete property.supersedes;

	insertProperty.run(property);
	});

database.exec("COMMIT;");

database.close();
