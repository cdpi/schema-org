
String.prototype.isBlank = function()
	{
	return (this.trim().length === 0);
	};

String.prototype.ifBlank = function(blank, notBlank = this)
	{
	return this.isBlank() ? blank : notBlank;
	};

String.prototype.nullIfBlank = function()
	{
	return this.ifBlank(null, this);
	};

String.prototype.splitAndTrim = function(separator = ",")
	{
	return this.split(separator).map(value => value.trim());
	};

String.prototype.nullOrSplitAndTrim = function(separator = ",")
	{
	return this.ifBlank(null, this.splitAndTrim(separator));
	};

///////////////////////////////////////////////////////////////////////////////////////////////////////

function isNull(value)
	{
	return value === null;
	}

export { isNull };
