
import { isNull } from "./util.mjs";

console.assert("".isBlank());
console.assert("   ".isBlank());
console.assert(" \t   \r \n  ".isBlank());

console.assert("   ".ifBlank("blank") === "blank");
console.assert("not blank".ifBlank(null) === "not blank");

console.assert("   ".nullIfBlank() === null);

console.assert("     ".nullOrSplitAndTrim() === null);
console.assert("a,  b,   c   ".nullOrSplitAndTrim().join() === "a,b,c");

console.assert(isNull(null));
console.assert(!isNull("null"));
