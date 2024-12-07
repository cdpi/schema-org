
import { DatabaseSync as SQLite } from "node:sqlite";
import { parseProperties, propertiesFilename, parseTypes, typesFilename } from "../parser/csv/new-parser.mjs";

// node --experimental-sqlite import-to-database.mjs

let insertPropertySQL = "INSERT INTO property VALUES (:id, :label, :comment, :subPropertyOf, :equivalentProperty, :inverseOf, :supersedes, :supersededBy, :isPartOf);";
let insertTypeSQL = "INSERT INTO type VALUES (:id, :label, :comment, :enumerationtype, :equivalentClass, :supersedes, :supersededBy, :isPartOf);";

let database = new SQLite("dev.sqlite");

database.exec("BEGIN TRANSACTION;");

let insertProperty = database.prepare(insertPropertySQL);

parseProperties("../" + propertiesFilename).forEach(property =>
	{
	delete property.subproperties;
	delete property.domainIncludes;
	delete property.rangeIncludes;

	insertProperty.run(property);
	});

let insertType = database.prepare(insertTypeSQL);

parseTypes("../" + typesFilename).forEach(type =>
	{
	delete type.subTypeOf;
	delete type.properties;
	delete type.subTypes;

	insertType.run(type);
	});

database.exec("COMMIT;");
