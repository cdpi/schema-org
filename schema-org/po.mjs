
import { writeFileSync } from "node:fs";
import { parseProperties } from "./parser/csv/parse.mjs";

// Thing ou Property
const label = object => object.label;

const msg = label => `msgid "${label}"
msgstr ""

`;

/*
const msg = property => `msgid "${property.label}.label"
msgstr "${property.label}"

msgid "${property.label}.comment"
msgstr "${property.comment.replaceAll("\"", "\\\"")}"

`;
*/

const po = path => parseProperties(path).map(label).map(msg).join("");

//let properties = parseProperties("parser/csv/schemaorg-all-https-properties.csv").map(label).map(msg);
//writeFileSync("fr.po", properties.join(""));

writeFileSync("properties.po", po("parser/csv/schemaorg-all-https-properties.csv"));
