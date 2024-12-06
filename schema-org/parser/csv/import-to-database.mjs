
import { DatabaseSync as SQLite } from "node:sqlite";
import { parseProperties } from "./new-parser.mjs";

// node --experimental-sqlite import-to-database.mjs

let insertPropertySQL = "INSERT INTO property VALUES (:id, :label, :comment, :subPropertyOf, :equivalentProperty, :inverseOf, :supersedes, :supersededBy, :isPartOf);";

let database = new SQLite("dev.sqlite");

let insertProperty = database.prepare(insertPropertySQL);

database.exec("BEGIN TRANSACTION;");

parseProperties("schemaorg-all-https-properties.csv").forEach(property =>
	{
	delete property.subproperties;
	delete property.domainIncludes;
	delete property.rangeIncludes;

	insertProperty.run(property);
	});

database.exec("COMMIT;");
