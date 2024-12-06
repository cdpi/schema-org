
import { readFileSync } from "node:fs";
import { parse as parseCSV } from "csv-parse/sync";
import { parseProperty } from "./record-parser.mjs";

function parse(path)
	{
	let csv = readFileSync(path, "utf-8");

	return parseCSV(csv, {columns: true, skipEmptyLines: true});
	}

function parseProperties(path = "./schemaorg-all-https-properties.csv")
	{
	return parse(path).map(parseProperty);
	}

export
	{
	parseProperties
	};
