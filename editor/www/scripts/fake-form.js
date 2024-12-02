
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
