@echo off
echo Creating data directory if it doesn't exist...
mkdir data\db 2>nul

echo Starting MongoDB...
start /B mongod --dbpath=data\db

echo MongoDB started. Minimize this window to keep MongoDB running.
echo Press Ctrl+C to stop MongoDB and close this window.
pause 