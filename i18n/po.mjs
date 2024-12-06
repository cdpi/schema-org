
import { readFileSync, writeFileSync } from "node:fs";

let po = readFileSync("fr.po", "utf-8");

let messages = [...po.matchAll(/msgid \"(.+)\"\nmsgstr \"(.+)?\"/mg)];

messages = messages.map(message =>
	{
	let msgid = message[1];

	let msgstr = (message[2] === undefined) ? null : message[2];

	return [msgid, msgstr];
	});

messages = messages.reduce((previous, current) => { previous[current[0]] = current[1]; return previous; }, {});

//console.log(messages);

writeFileSync("fr.json", JSON.stringify(messages, null, 1));
