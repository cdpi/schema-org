#!/usr/bin/env bash

DATABASE=from-csv.sqlite

rm $DATABASE

sqlite3 $DATABASE < property.sql
sqlite3 $DATABASE < type.sql

node --experimental-sqlite import.mjs
