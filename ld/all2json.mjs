
import { writeFileSync } from "node:fs";
import { Parser } from "../schema-org/parser/csv/parser.mjs";

let parser = new Parser();

let all = await parser.all();

writeFileSync("all.json", JSON.stringify(all, null, 4));
