
class Parser
	{
	async properties()
		{

		let map = {};

		properties.forEach(property =>
			{
			let id = property.id;

			delete property.id;

			map[id] = property;
			});

		return map;
		}

	async types()
		{

		let map = {};

		types.forEach(type =>
			{
			let id = type.id;

			delete type.id;

			map[id] = type;
			});

		return map;
		}

	async all()
		{
		let types = await this.types();

		let enumerationMembers = [];

		for (let id in types)
			{
			let type = types[id];

			if (type.enumerationMemberOf != null)
				{
				type.id = id;

				enumerationMembers.push(type);

				delete types[id];
				}
			}

		let enumerationTypes = new Set();

		enumerationMembers.forEach(enumerationMember =>
			{
			enumerationTypes.add(enumerationMember.enumerationMemberOf);
			});

		let enumerations = {};

		enumerationTypes.forEach(enumerationType =>
			{
			let enumeration = types[enumerationType];

			delete enumeration.enumerationMemberOf;

			enumeration.enumerationMembers = [];

			enumerations[enumerationType] = types[enumerationType];

			delete types[enumerationType];
			});

		enumerationMembers.forEach(enumerationMember =>
			{
			enumerations[enumerationMember.enumerationMemberOf].enumerationMembers.push(enumerationMember);
			});

		let all = {};

		all.properties = await this.properties();
		all.types = types;
		all.enumerations = enumerations;

		return all;
		}

