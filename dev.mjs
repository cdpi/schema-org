
import { readFileSync, writeFileSync } from "node:fs";
import { Parser } from "./parser/parser.mjs";

let parser = new Parser();

let all = await parser.all();

writeFileSync("all.json", JSON.stringify(all, null, 4));
