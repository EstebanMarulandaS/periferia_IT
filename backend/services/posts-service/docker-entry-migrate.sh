#!/bin/sh
set -e

cd /app/services/posts-service

echo "Running posts migrations..."
npx prisma migrate deploy

echo "Running posts seed..."
npx prisma db seed

echo "Starting posts-service..."
exec npm run dev
