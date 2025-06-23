$thisPath = Get-Location
$backendPath = "$thisPath\backend"
$frontendPath = "$thisPath\frontend"
$installDepsFrontendCommand = "npm i"
$installDepsBackendCommand = "npm i"
$startBackendCommand = "npm run dev"#"node index.js --watch"
$startFrontendCommand = "npm run start"#"react-scripts start"

try {
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; $installDepsBackendCommand; $startBackendCommand" -PassThru
Start-Sleep -Seconds 1
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; $installDepsFrontendCommand; $startFrontendCommand" -PassThru
    
Write-Host ""
Write-Host "¡Ambos proyectos iniciados exitosamente!" -ForegroundColor Green

}
finally {
    Set-Location "$thisPath"
}