
import { DatabaseSync as SQLite } from "node:sqlite";
import { downloadProperties, downloadTypes } from "../../parser/csv/downloader.mjs";
import { parseProperties, parseTypes } from "../../parser/csv/parser.mjs";

let release = "28.1";

let insertPropertySQL = "INSERT INTO property VALUES (:id, :label, :comment, :subPropertyOf, :equivalentProperty, :inverseOf, :supersedes, :supersededBy, :isPartOf);";
let insertTypeSQL = "INSERT INTO type VALUES (:id, :label, :comment, :enumerationtype, :equivalentClass, :supersedes, :supersededBy, :isPartOf);";

let database = new SQLite("from-csv.sqlite");

database.exec("BEGIN TRANSACTION;");

let insertProperty = database.prepare(insertPropertySQL);

parseProperties(await downloadProperties(release)).forEach(property =>
	{
	delete property.subproperties;
	delete property.domainIncludes;
	delete property.rangeIncludes;

	insertProperty.run(property);
	});

let insertType = database.prepare(insertTypeSQL);

parseTypes(await downloadTypes(release)).forEach(type =>
	{
	delete type.subTypeOf;
	delete type.properties;
	delete type.subTypes;

	insertType.run(type);
	});

database.exec("COMMIT;");
