#!/bin/sh
set -e

cd /app/services/auth-service

echo "Running auth migrations..."
npx prisma migrate deploy

echo "Running auth seed..."
npx prisma db seed

echo "Starting auth-service..."
exec npm run dev
