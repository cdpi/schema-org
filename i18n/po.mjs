
import { downloadProperties, downloadTypes } from "../parser/csv/downloader.mjs";
import { parseProperties, parseTypes } from "../parser/csv/parser.mjs";

const label = object => object.label;

const msg = label => `msgid "${label}"
msgstr ""

`;

/**
 * @param {[]} array un tableau d'objet properties ou types qui contient un champs label.
 */
function po(array)
	{
	return array.map(label).map(msg).join("");
	}

/**
 * @param {String} release
 */
async function properties(release)
	{
	return po(parseProperties(await downloadProperties(release)));
	}

/**
 * @param {String} release
 */
async function types(release)
	{
	return po(parseTypes(await downloadTypes(release)));
	}

/**
 * @param {String} po
 */
function poToObject(po)
	{
	// TODO: fuzzy
	/*
	#, fuzzy
	msgid "additionalName"
	msgstr "nom supplémentaire"
	*/
	let messages = [...po.matchAll(/msgid \"(.+)\"\nmsgstr \"(.+)?\"/mg)];

	messages = messages.map(message =>
		{
		let msgid = message[1];
	
		let msgstr = (message[2] === undefined) ? null : message[2];
	
		return [msgid, msgstr];
		});

	return messages.reduce((previous, current) => { previous[current[0]] = current[1]; return previous; }, {});
	}

export
	{
	po,
	properties,
	types,
	poToObject
	};
