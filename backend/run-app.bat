@echo off
SET JAVA_HOME=C:\Program Files\Java\jdk-21
SET PATH=%PATH%;%JAVA_HOME%\bin
echo Using Java version:
java -version
echo.

echo Creating uploads directory if it doesn't exist...
if not exist "uploads" mkdir uploads
if not exist "uploads\images" mkdir uploads\images

echo Setting directory permissions...
icacls uploads /grant Everyone:(OI)(CI)F /T

echo.
echo Starting Phegon Hotel Application...
.\mvnw.cmd spring-boot:run 