
import { writeFileSync } from "node:fs";
import { properties, types } from "./po.mjs";

let release = "28.1";

writeFileSync("properties.po", await properties(release));
writeFileSync("types.po", await types(release));
