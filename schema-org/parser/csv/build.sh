#!/usr/bin/env bash

DATABASE=dev.sqlite

rm $DATABASE

sqlite3 $DATABASE < dev.sql

node --experimental-sqlite import-to-database.mjs
