#!/bin/bash

echo "Starting Odo Valley Tourism Website..."

echo "First, let's check if MongoDB is running..."
if pgrep mongod > /dev/null; then
    echo "MongoDB is already running."
else
    echo "MongoDB is not running. Starting MongoDB..."
    mkdir -p data/db
    mongod --dbpath=data/db --fork --logpath=data/mongodb.log
    echo "MongoDB started."
    sleep 5
fi

echo "Starting the server, website, and admin dashboard..."
npm run dev:server &
SERVER_PID=$!
sleep 3

npm run dev &
WEBSITE_PID=$!
sleep 3

npm run dev:admin &
ADMIN_PID=$!

echo ""
echo "All components started! You can access:"
echo "- Website: http://localhost:3000"
echo "- Admin Dashboard: http://localhost:3001"
echo "- API Server: http://localhost:5000/api"
echo ""
echo "Press Ctrl+C to stop all services..."

# Wait for user to press Ctrl+C
trap "kill $SERVER_PID $WEBSITE_PID $ADMIN_PID; echo ''; echo 'Stopping all services...'; exit" INT
wait 