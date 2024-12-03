#!/usr/bin/env bash

DATABASE=things.sqlite

rm $DATABASE

sqlite3 $DATABASE < schema.sql
sqlite3 $DATABASE < type.sql
sqlite3 $DATABASE < property.sql
sqlite3 $DATABASE < domain.sql
