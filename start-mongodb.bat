@echo off
echo Starting MongoDB Service...

REM Check if MongoDB is already running
netstat -an | find "27017" | find "LISTENING" > nul
if %errorlevel% equ 0 (
    echo MongoDB is already running!
    echo You can now run start-app.bat
    pause
    exit /b 0
)

REM Check MongoDB installation path
set MONGODB_PATH="C:\Program Files\MongoDB\Server"
if not exist %MONGODB_PATH% (
    echo MongoDB is not installed in the default location
    echo Please install MongoDB from https://www.mongodb.com/try/download/community
    echo After installation, add MongoDB bin directory to your system PATH
    pause
    exit /b 1
)

REM Find the latest MongoDB version installed
for /f "delims=" %%i in ('dir /b /ad %MONGODB_PATH%') do set LATEST_VERSION=%%i
set MONGOD_PATH=%MONGODB_PATH%\%LATEST_VERSION%\bin\mongod.exe

if not exist "%MONGOD_PATH%" (
    echo MongoDB executable not found at %MONGOD_PATH%
    echo Please verify your MongoDB installation
    pause
    exit /b 1
)

REM Create data directory if it doesn't exist
if not exist "C:\data\db" (
    echo Creating MongoDB data directory...
    mkdir "C:\data\db"
)

echo.
echo Starting MongoDB server...
start "MongoDB Server" /B "%MONGOD_PATH%" --dbpath C:\data\db

echo.
echo Waiting for MongoDB to initialize...
:wait_loop
timeout /t 1 /nobreak > nul
netstat -an | find "27017" | find "LISTENING" > nul
if %errorlevel% neq 0 (
    echo Waiting for MongoDB to start...
    goto wait_loop
)

echo.
echo MongoDB is running!
echo You can now run start-app.bat to start the StudentSync application
echo.
echo To stop MongoDB, close this window or press Ctrl+C

pause 