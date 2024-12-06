
import { readFileSync } from "node:fs";

let po = readFileSync("fr1.po", "utf-8");

//console.log(po);

//msgid "abridged"
//let msgid = new RegExp("^msgid \".+\"$", "m");
let msgid = new RegExp("msgid \".+\"");

let all = [...po.matchAll()];

console.log(all);
