
import { parseProperties } from "./new-parser.mjs";

let properties = parseProperties("schemaorg-all-https-properties.csv");

console.log(JSON.stringify(properties, null, 4));
