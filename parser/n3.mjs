
import { readFileSync } from "node:fs";
import N3 from "n3";

async function parse(path, subjects)
	{
	let prefix = "@prefix id: <> .\n@prefix so: <https://schema.org/> .\n";

	let n3 = prefix + readFileSync(path, {encoding: "utf-8"});

	await new N3.Parser().parse(n3,
		{
		onQuad: function(error, quad)
			{
			if (error)
				{
				throw error;
				}

			if (!!quad)
				{
				let subject = quad._subject.id;
				let predicate = quad._predicate.id;
				let object = quad._object.id;

				if (!subjects.hasOwnProperty(subject))
					{
					subjects[subject] = {};
					}

				subjects[subject][predicate] = object;
				}
			}
		});
	}

export { parse };
