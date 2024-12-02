#!/usr/bin/env bash

DATABASE=things.sqlite

rm $DATABASE

sqlite3 $DATABASE < schema.sql
