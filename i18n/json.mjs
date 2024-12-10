
import { readFileSync, writeFileSync } from "node:fs";
import { poToObject } from "./po.mjs";

let properties = poToObject(readFileSync("fr/properties.po", "utf-8"), true);

writeFileSync("fr/properties.json", JSON.stringify(properties, null, 2));
