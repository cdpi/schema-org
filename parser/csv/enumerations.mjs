
import { arrayAsObject } from "./parser.mjs";

/**
 * @param {[]} types
 */
function getEnumerationMembers(types)
	{
	let enumerationMembers = [];

	for (let id in types)
		{
		let type = types[id];

		if (type.enumerationtype != null)
			{
			enumerationMembers.push(type);
			}
		}

	return enumerationMembers;
	}

/**
 * @param {[]} enumerationMembers
 */
function getEnumerationTypes(enumerationMembers)
	{
	let enumerationTypes = new Set();

	enumerationMembers.forEach(enumerationMember =>
		{
		enumerationTypes.add(enumerationMember.enumerationtype);
		});

	return enumerationTypes;
	}

/**
 * @param {[]} types
 */
function getEnumerations(types)
	{
	return arrayAsObject(types);

	let enumerations = {};

	let enumerationMembers = getEnumerationMembers(types);

	let enumerationTypes = getEnumerationTypes(enumerationMembers);

	enumerationTypes.forEach(enumerationType =>
		{
		let enumeration = types[enumerationType];

		enumeration.enumerationMembers = [];

		enumerations[enumerationType] = enumeration;
		});

	enumerationMembers.forEach(enumerationMember =>
		{
		//enumerations[enumerationMember.enumerationMemberOf].enumerationMembers.push(enumerationMember);
		});

	return enumerations;
	}

export
	{
	getEnumerations
	};
