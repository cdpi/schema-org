
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

			delete types[id];
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
	let enumerations = {};

	let enumerationMembers = getEnumerationMembers(types);

	let enumerationTypes = getEnumerationTypes(enumerationMembers);

	enumerationTypes.forEach(enumerationType =>
		{
		let enumeration = types[enumerationType];

		enumeration.enumerationMembers = [];

		enumerations[enumerationType] = enumeration;

		delete types[enumerationType];
		});

	enumerationMembers.forEach(enumerationMember =>
		{
		enumerations[enumerationMember.enumerationtype].enumerationMembers.push(enumerationMember);
		});

	return enumerations;
	}

export
	{
	//getEnumerationMembers,
	//getEnumerationTypes,
	getEnumerations
	};
