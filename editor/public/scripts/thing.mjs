
const Thing =
	{
	additionalType: ["Text", "URL"],
	alternateName: ["Text"],
	description: ["Text", "TextObject"],
	disambiguatingDescription: ["Text"],
	identifier: ["PropertyValue", "Text", "URL"],
	image: ["ImageObject", "URL"],
	mainEntityOfPage: ["CreativeWork", "URL"],
	name: ["Text"],
	potentialAction: ["Action"],
	sameAs: ["URL"],
	subjectOf: ["CreativeWork", "Event"],
	url: ["URL"],
	};

let html = "";

for (let [label, types] of Object.entries(Thing))
	{
	types = types.join(", ");

	let value = "";

	html += `<div>
		<span class="label">${label}&nbsp;(${types})&nbsp;:</span>
		<span class="input text" data-property="${label}" contenteditable="true" spellcheck="false">${value}</span>
	</div>`;
	}

//console.log(html);

document.querySelector("#form").innerHTML = html;

let h1 = document.querySelector("h1");

h1.addEventListener("click", e =>
	{
	let thing = {};

	let inputs = document.querySelectorAll("*[contenteditable]");

	for (let i = 0; i < inputs.length; i++)
		{
		let input = inputs[i];

		//console.log(input.dataset.property);
		thing[input.dataset.property] = input.getHTML();
		}

	console.debug(thing);
	//insert(thing);
	});

/*

additionalType
Text  or URL
An additional type for the item, typically used for adding more specific types from external vocabularies in microdata syntax. This is a relationship between something and a class that the thing is in. Typically the value is a URI-identified RDF class, and in this case corresponds to the use of rdf:type in RDF. Text values can be used sparingly, for cases where useful information can be added without their being an appropriate schema to reference. In the case of text values, the class label should follow the schema.org style guide.

alternateName
Text
An alias for the item.

description
Text  or TextObject
A description of the item.

disambiguatingDescription
Text
A sub property of description. A short description of the item used to disambiguate from other, similar items. Information from other properties (in particular, name) may be necessary for the description to be useful for disambiguation.

identifier
PropertyValue  or Text  or URL
The identifier property represents any kind of identifier for any kind of Thing, such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See background notes for more details.

image
ImageObject  or URL
An image of the item. This can be a URL or a fully described ImageObject.

mainEntityOfPage
CreativeWork  or URL
Indicates a page (or other CreativeWork) for which this thing is the main entity being described. See background notes for details.
Inverse property: mainEntity

name
Text
The name of the item.

potentialAction
Action
Indicates a potential Action, which describes an idealized action in which this thing would play an 'object' role.

sameAs
URL
URL of a reference Web page that unambiguously indicates the item's identity. E.g. the URL of the item's Wikipedia page, Wikidata entry, or official website.

subjectOf
CreativeWork  or Event
A CreativeWork or Event about this Thing.
Inverse property: about

url
URL
URL of the item.
*/
