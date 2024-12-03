
import { properties as prop } from "./properties.mjs";

function mapProperties(object)
	{
	let entries = Object.entries(object);

	let properties = entries.map(([key, value], index) =>
		{
		if (value.isCore && !value.isSuperseded)
			{
			return [key, value.label];
			}

		return [key, null];
		});

	properties = properties.map(value => value[1]);

	properties = properties.filter(value => (value !== null));

	return properties;
	}

let properties = mapProperties(prop);
//console.debug(p);

let html = "";

for (let i = 0; i < 20; i++)
	{
	let property = properties[i];

	let label = property;
	let value = "";

	html += `<div>
		<span class="label">${label}&nbsp;:</span>
		<span class="input text" contenteditable="true" spellcheck="false">${value}</span>
	</div>`;
	}

//console.log(html);

document.querySelector("#form").innerHTML = html;

let h1 = document.querySelector("h1");

//console.log(h1);

h1.addEventListener("click", e =>
	{
	//let thing = {};

	let inputs = document.querySelectorAll("p");

	for (let i = 0; i < inputs.length; i++)
		{
		let input = inputs[i];

		console.log(input.textContent);
		}

	//console.debug(thing);
	//insert(thing);
	});
