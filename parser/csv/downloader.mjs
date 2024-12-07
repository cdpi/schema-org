
/**
 * @param {String} what
 * @param {String} release
 */
function url(what, release)
	{
	return `https://github.com/schemaorg/schemaorg/raw/refs/heads/main/data/releases/${release}/schemaorg-all-https-${what}.csv`;
	}

/**
 * @param {String} url
 */
async function download(url)
	{
	let request = await fetch(url);

	let text = await request.text();

	return text;
	}

/**
 * @param {String} release
 */
async function downloadProperties(release)
	{
	return await download(url("properties", release));
	}

/**
 * @param {String} release
 */
async function downloadTypes(release)
	{
	return await download(url("types", release));
	}

export
	{
	downloadProperties,
	downloadTypes
	};
