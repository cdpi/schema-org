
import { readFileSync } from "node:fs";
import { DatabaseSync as SQLite } from "node:sqlite";
import { arrayAsObject, downloadAndParseProperties, downloadAndParseTypes } from "../parser/csv/parser.mjs";
import { getEnumerations } from "../parser/csv/enumerations.mjs";

// node --experimental-sqlite database.mjs

const read = path => readFileSync(path, "utf-8");

let release = "28.1";

let path = "things.sqlite";

let database = new SQLite(path);

database.exec(read("sql/schema.sql"));

let properties = arrayAsObject(await downloadAndParseProperties(release));
let types = arrayAsObject(await downloadAndParseTypes(release));
let enumerations = getEnumerations(types);

function insertProperties(properties)
	{
	let insertProperty = database.prepare(read("sql/insert-property.sql"));

	properties.forEach(property =>
		{
		delete property.subPropertyOf;
		delete property.subproperties;
		delete property.domainIncludes;
		delete property.rangeIncludes;
		delete property.supersedes;
	
		insertProperty.run(property);
		});
	}

function insertPropertiesHierarchy(properties)
	{
	let insertPropertyHierarchy = database.prepare(read("sql/insert-property-hierarchy.sql"));

	properties.forEach(property =>
		{
		if (property.subproperties !== null)
			{
			property.subproperties.forEach(subProperty =>
				{
				let hierarchy =
					{
					property: subProperty,
					parent: property.id
					};

				insertPropertyHierarchy.run(hierarchy);
				});
			}
		else
			{
			let hierarchy =
				{
				property: property.id,
				parent: null
				};

			insertPropertyHierarchy.run(hierarchy);
			}
		});
	}

function insertTypes(types)
	{
	let insertType = database.prepare(read("sql/insert-type.sql"));

	types.forEach(type =>
		{
		delete type.subTypeOf;
		delete type.enumerationtype;
		delete type.properties;
		delete type.subTypes;
		delete type.supersedes;

		type.equivalentClass = (type.equivalentClass === null) ? null : JSON.stringify(type.equivalentClass);

		insertType.run(type);
		});
	}

database.exec("BEGIN TRANSACTION;");

insertProperties(Object.values(structuredClone(properties)));

insertPropertiesHierarchy(Object.values(structuredClone(properties)));

insertTypes(Object.values(types));

database.exec("COMMIT;");

database.close();
