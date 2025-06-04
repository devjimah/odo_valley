#!/bin/bash

# Create data directory if it doesn't exist
mkdir -p data/db

# Start MongoDB
echo "Starting MongoDB..."
mongod --dbpath=data/db

# Keep the script running
echo "MongoDB started. Press Ctrl+C to stop."
tail -f /dev/null 