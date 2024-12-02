
import { DatabaseSync as SQLite } from "node:sqlite";

const SELECT = "SELECT `id`, `label`, `comment`, `superseded`, `schema` FROM `type`;";

const INSERT = "INSERT INTO `type` (`id`, `label`, `comment`, `superseded`, `schema`) VALUES (:id, :label, :comment, :superseded, :schema);";

let database = new SQLite("things.sqlite");

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

export
	{
	insert,
	select
	};
