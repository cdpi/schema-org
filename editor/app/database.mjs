
import { readFileSync } from "node:fs";
import { DatabaseSync as SQLite } from "node:sqlite";

const read = path => readFileSync(path, "utf-8");

//const SELECT = "SELECT `id`, `label`, `comment`, `superseded`, `schema` FROM `type`;";
//const INSERT = "INSERT INTO `type` (`id`, `label`, `comment`, `superseded`, `schema`) VALUES (:id, :label, :comment, :superseded, :schema);";

function getAllProperties()
	{
	let fr = JSON.parse(read("../i18n/fr/properties.json"));

	let database = new SQLite("../database/things.sqlite");

	let selectPropertySQL = read("select-property.sql");

	let properties = database.prepare(selectPropertySQL).all();

	return {labels: fr, records: properties};
	}

/*

function insert(type, callback)
	{
	try
		{
		database.prepare(INSERT).run(type);

		callback(null);
		}
	catch (error)
		{
		callback(error);
		}
	}

function select(callback)
	{
	try
		{
		let types = database.prepare(SELECT).all();

		callback(null, types);
		}
	catch (error)
		{
		callback(error);
		}
	}
*/

export
	{
	getAllProperties
	};
