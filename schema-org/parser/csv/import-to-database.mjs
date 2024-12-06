
import { DatabaseSync as SQLite } from "node:sqlite";
import { parseProperties, parseTypes } from "./new-parser.mjs";

// node --experimental-sqlite import-to-database.mjs

let insertPropertySQL = "INSERT INTO property VALUES (:id, :label, :comment, :subPropertyOf, :equivalentProperty, :inverseOf, :supersedes, :supersededBy, :isPartOf);";
let insertTypeSQL = "INSERT INTO type VALUES (:id, :label, :comment, :supersedes, :supersededBy, :isPartOf);";

let database = new SQLite("dev.sqlite");

database.exec("BEGIN TRANSACTION;");

let insertProperty = database.prepare(insertPropertySQL);

parseProperties("schemaorg-all-https-properties.csv").forEach(property =>
	{
	delete property.subproperties;
	delete property.domainIncludes;
	delete property.rangeIncludes;

	insertProperty.run(property);
	});

let insertType = database.prepare(insertTypeSQL);

parseTypes("schemaorg-all-https-types.csv").forEach(type =>
	{
	insertType.run(type);
	});

database.exec("COMMIT;");
