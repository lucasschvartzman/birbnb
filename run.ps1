$thisPath = Get-Location
$backendPath = "$thisPath\backend"
$frontendPath = "$thisPath\frontend"
$installDepsFrontendCommand = "npm i"
$installDepsBackendCommand = "npm i"
$startBackendCommand = "npm run dev"#"node index.js --watch"
$startFrontendCommand = "npm run start"#"react-scripts start"

# Función para cerrar procesos en un puerto específico
function CerrarProcesosEnPuerto($puerto) {
    $conexiones = netstat -aon | Select-String ":$puerto\s" | ForEach-Object {
        ($_ -split '\s+')[-1]
    } | Sort-Object -Unique

    foreach ($idProceso in $conexiones) {
        try {
            $proceso = Get-Process -Id $idProceso -ErrorAction Stop
            Write-Host "Cerrando proceso $($proceso.ProcessName) (PID: $idProceso) en el puerto $puerto..." -ForegroundColor Yellow
            Stop-Process -Id $idProceso -Force
        } catch {
            Write-Host "No se pudo cerrar el proceso con PID $idProceso. Quizás ya terminó o no tenés permisos." -ForegroundColor Red
        }
    }
}

# Cerrar procesos en los puertos destinados para nuestra aplicación:
CerrarProcesosEnPuerto 3000
CerrarProcesosEnPuerto 3001

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