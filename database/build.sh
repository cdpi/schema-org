#!/usr/bin/env bash

#DATABASE=recursive.sqlite
#rm $DATABASE
#sqlite3 $DATABASE < thing_hierarchy.sql

#sqlite3 recursive.sqlite < recursive.sql
#sqlite3 recursive.sqlite < things.sql > things.txt

node --experimental-sqlite database.mjs
