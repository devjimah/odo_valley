@echo off
echo Starting Odo Valley Tourism Website...

echo First, let's check if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB is already running.
) else (
    echo MongoDB is not running. Starting MongoDB...
    start "MongoDB" cmd /c "start-mongodb.bat"
    timeout /t 5
)

echo Starting the server, website, and admin dashboard...
start "Server" cmd /c "npm run dev:server"
timeout /t 3
start "Website" cmd /c "npm run dev"
timeout /t 3
start "Admin Dashboard" cmd /c "npm run dev:admin"

echo All components started! You can access:
echo - Website: http://localhost:3000
echo - Admin Dashboard: http://localhost:3001
echo - API Server: http://localhost:5000/api
echo.
echo Press any key to exit this window (services will continue running)...
pause > nul 