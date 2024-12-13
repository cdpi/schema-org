
import { getAllProperties } from "./database.mjs";

// node --experimental-sqlite --env-file .env dev.mjs

let p = getAllProperties();

console.debug(p.records[0]);

console.debug(p.records.length);
//console.debug(p.labels.length);

console.debug(process.env.DB);
