#!/usr/bin/env bash

DATABASE=recursive.sqlite

rm $DATABASE

# Tables
sqlite3 $DATABASE < thing.sql
sqlite3 $DATABASE < hierarchy.sql

# Views
sqlite3 $DATABASE < thing_hierarchy.sql
sqlite3 $DATABASE < things_hierarchy.sql

# Data
sqlite3 $DATABASE < data.sql
