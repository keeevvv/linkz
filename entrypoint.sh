#!/bin/sh

# Menunggu database siap (opsional tapi disarankan)
echo "Running database migrations..."
npx prisma@6.19.1 migrate deploy

# Menjalankan perintah utama (CMD dari Dockerfile yaitu 'node server.js')
echo "Starting application..."
exec "$@"