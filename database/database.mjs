
import { DatabaseSync as SQLite } from "node:sqlite";
import { arrayAsObject, downloadAndParseProperties, downloadAndParseTypes } from "../parser/csv/parser.mjs";
import { getEnumerations } from "../parser/csv/enumerations.mjs";

// node --experimental-sqlite database.mjs

let release = "28.1";

let properties = arrayAsObject(await downloadAndParseProperties(release));
let types = arrayAsObject(await downloadAndParseTypes(release));
let enumerations = getEnumerations(types);
