
let form = document.querySelector("form");

async function insert(thing)
	{
	try
		{
		let options =
			{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(thing)
			};

		let response = await fetch("/api/thing/1", options);

		//let json = await response.json();
		//console.log(json);

		let text = await response.text();

		console.log(text);
		}
	catch (error)
		{
		console.error(error);
		}
	}

form.addEventListener("submit", e =>
	{
	e.preventDefault();

	let thing = {};

	let inputs = e.target.elements;

	for (let i = 0; i < inputs.length; i++)
		{
		let input = inputs[i];

		if (input.name.length > 0)
			{
			thing[input.name] = input.value;
			}
		}

	console.debug(thing);

	insert(thing);
	});
