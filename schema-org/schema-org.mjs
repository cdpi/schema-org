
/*
const _RELEASE = "28.1";

const _ATTIC = "https://attic.schema.org";
const _AUTO = "https://auto.schema.org";
const _BIB = "https://bib.schema.org";
const _META = "https://meta.schema.org";
const _PENDING = "https://pending.schema.org";
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////

class Schema
	{
	constructor(name, uri)
		{
		this.name = name;
		this.uri = uri;
		}
	}

const _Schema = Schema;

///////////////////////////////////////////////////////////////////////////////////////////////////////

class SchemaOrg
	{
	constructor()
		{
		}

	static get RELEASE()
		{
		return "28.1";
		}

	static get SCHEMAS()
		{
		let core = new Schema("core", "https://schema.org");
		let attic = new Schema("attic", "https://attic.schema.org");
		let auto = new Schema("auto", "https://auto.schema.org");
		let bib = new Schema("bib", "https://bib.schema.org");
		let meta = new Schema("meta", "https://meta.schema.org");
		let pending = new Schema("pending", "https://pending.schema.org");

		return [core, attic, auto, bib, meta, pending];
		}
	}

const _SchemaOrg = SchemaOrg;

///////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	_Schema as Schema,
	_SchemaOrg as SchemaOrg
	};
