
// --experimental-sqlite

//import { readFileSync } from "node:fs";
import { DatabaseSync as SQLite } from "node:sqlite";

// let json = readFileSync("schema-org.json", {encoding: "utf-8"});
// let schema = JSON.parse(json);

let database = new SQLite("sql/schema-org.sqlite");

database.exec("DELETE FROM `type`;");

let insert = database.prepare("INSERT INTO `type` (`id`, `label`, `comment`, `superseded`, `schema`) VALUES (:id, :label, :comment, :superseded, :schema);");

database.exec("BEGIN TRANSACTION;");

let keys = Object.keys(schema.types);

for (let i = 0; i < keys.length; i++)
	{
	let type = schema.types[keys[i]];

	let parameters =
		{
		id: type.id,
		label: type.label,
		comment: type.comment,
		superseded: (type.superseded === undefined) ? null : type.superseded,
		schema: (type.schema === undefined) ? null : type.schema
		};

	try
		{
		//insert.run(type.id, type.label, type.comment, type.superseded, type.schema);
		//insert.run(type.id, type.label, type.comment, "superseded", "schema");
		insert.run(parameters);
		}
	catch (error)
		{
		console.log(parameters);
		console.log(error);
		throw error;
		}
	}

database.exec("COMMIT;");

let query = database.prepare("SELECT * FROM `type` LIMIT 5;");

console.log(query.all());
