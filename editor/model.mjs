
import express from "express";
import { select, insert } from "./database.mjs";

let model = express.Router();

model.get("/:model", (request, response) =>
	{
	select((error, types) =>
		{
		response.json(types);
		});
	});

/*
model.get("/:model/:id", (request, response) =>
	{
	//response.send("GET: " + request.params.model + " - " + request.params.id);
	response.json({sdd: 2343});
	});
*/

model.post("/:model/:id", (request, response) =>
	{
	let thing = request.body;

	thing.superseded = null;
	thing.schema = null;

	insert(thing, (error) =>
		{
		if (error)
			{
			response.send("Error: " + error);
			}
		else
			{
			response.send("OK");
			}
		});
	});

/*
model.put("/:model/:id", (request, response) =>
	{
	response.send("PUT: " + request.params.model + " - " + request.params.id);
	});

model.delete("/:model/:id", (request, response) =>
	{
	response.send("DELETE: " + request.params.model + " - " + request.params.id);
	});
*/

export { model };
