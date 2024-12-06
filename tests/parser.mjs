
import { columnAsArray, columnAsString } from "../schema-org/parser/csv/new-parser.mjs";

console.assert(columnAsArray("") === null);
console.assert(columnAsArray("   \t   \n   ") === null);
console.assert(columnAsArray("abc").join("") === "abc");

console.assert(columnAsString("") === null);
console.assert(columnAsString("   \t   \n   ") === null);
console.assert(columnAsString("abc") === "abc");
