move docs\CNAME build
del /f /s /q docs\*.* > NUL
xcopy /q /e build\*.* docs
move build\CNAME docs
dir docs
