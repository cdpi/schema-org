
// node --experimental-sqlite dev.mjs

import { parseProperties } from "./parse.mjs";
import { importToSQLite } from "./import-to-database.mjs";

importToSQLite("devParseProperties.sqlite", parseProperties());
