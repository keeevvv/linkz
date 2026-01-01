#!/bin/sh
set -e



echo "🗄️ Syncing database..."
npx prisma@6.19.1 db push

exec "$@"
