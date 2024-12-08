
import { createDatabaseFromCSV } from "./database.mjs";

// node --experimental-sqlite x.mjs

let release = "28.1";

createDatabaseFromCSV("schema-org-csv.sqlite", release);

/*
const _ATTIC = "https://attic.schema.org";
const _AUTO = "https://auto.schema.org";
const _BIB = "https://bib.schema.org";
const _META = "https://meta.schema.org";
const _PENDING = "https://pending.schema.org";
*/
