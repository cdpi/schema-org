
import { createDatabaseFromCSV, statistics } from "./csv-database.mjs";

// node --experimental-sqlite .mjs

//let release = "28.1";

let path = "schema-org-csv.sqlite";

//createDatabaseFromCSV(path, release);

statistics(path);
