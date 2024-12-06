
import { DatabaseSync as SQLite } from "node:sqlite";

function importToSQLite(path, properties)
	{
	let database = new SQLite(path);

	let insert = database.prepare("INSERT INTO `property` (`id`, `label`, `comment`) VALUES (:id, :label, :comment);");

	database.exec("BEGIN TRANSACTION;");

	properties.forEach(property =>
		{
		let parameters =
			{
			id: property.id,
			label: property.label,
			comment: property.comment
			};

		insert.run(parameters);
		});

	database.exec("COMMIT;");
	}

export
	{
	importToSQLite
	};
