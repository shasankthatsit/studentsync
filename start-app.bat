@echo off
echo Checking MongoDB status...

REM Check if MongoDB is running by attempting to connect to port 27017
timeout /t 1 /nobreak > nul
netstat -an | find "27017" | find "LISTENING" > nul
if %errorlevel% neq 0 (
    echo MongoDB is not running!
    echo Please run start-mongodb.bat first
    pause
    exit /b 1
)

echo MongoDB is running...
echo.
echo Starting StudentSync Application...

echo.
echo Starting Backend Server...
cd backend
start cmd /k "npm start"

echo.
echo Waiting for backend to initialize (5 seconds)...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend Server...
cd ../frontend
start cmd /k "npm start"

echo.
echo StudentSync is starting up! Please wait...
echo Backend will be available at http://localhost:5000
echo Frontend will be available at http://localhost:3000

pause 