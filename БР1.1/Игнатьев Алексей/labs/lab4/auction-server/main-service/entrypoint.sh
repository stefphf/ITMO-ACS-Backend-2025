#!/bin/bash

host=$(echo "$DATABASE_URL" | sed -E 's/.*:\/\/.*@(.*):([0-9]+)\/.*/\1/')
port=$(echo "$DATABASE_URL" | sed -E 's/.*:\/\/.*@(.*):([0-9]+)\/.*/\2/')

until nc -z -v -w30 "$host" "$port"; do
  echo "Waiting for database connection..."
  sleep 1
done

echo "Database is up, running prisma migrate deploy"
npx prisma migrate deploy

exec npm run start:prod