
import { writeFileSync } from "node:fs";
import { parseProperties } from "./parser/csv/parse.mjs";

const label = object => object.label;

const msg = label => `msgid "${label}"
msgstr ""

`;

const po = path => parseProperties(path).map(label).map(msg).join("");

writeFileSync("properties.po", po("parser/csv/schemaorg-all-https-properties.csv"));
