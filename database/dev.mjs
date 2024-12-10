
import { writeFileSync } from "node:fs";
import { createDatabaseFromCSV, statistics } from "./csv-database.mjs";

// node --experimental-sqlite dev.mjs

//let release = "28.1";

let path = "schema-org-csv.sqlite";

//createDatabaseFromCSV(path, release);

//console.debug(statistics(path));
writeFileSync("statistics.json", JSON.stringify(statistics(path), null, 2));
