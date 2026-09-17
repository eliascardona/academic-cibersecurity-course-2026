$ErrorActionPreference = "Stop"

$IntervalSeconds = 120
$ComposeFile = "docker-compose.yml"
$RotatorScript = "rotator.py"

Write-Host "Secret rotation controller started."
Write-Host "Interval: $IntervalSeconds seconds"

while ($true) {

    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Rotating secret..."

    # 1. Generate and write the new API_KEY
    python -u $RotatorScript

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Secret rotation failed."
        exit 1
    }

    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Secret rotated."

    # 2. Recreate ONLY the NGINX frontend container.
    #
    # --force-recreate:
    #   Force Docker Compose to create a new container
    #   so the new API_KEY is injected into its environment.
    docker compose `
        -f $ComposeFile `
        up -d `
        --force-recreate

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Docker Compose restart failed."
        exit 1
    }

    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - NGINX frontend recreated."
    Write-Host "Next rotation in $IntervalSeconds seconds."
    Write-Host ""

    # when a process is slept, it does not consume resources,
    # so the current script is not a threat for the system.
    # in theory, general purpose operating systems have
    # a special set of mechanisms to handle "slept" processes,
    # colocating them in a "sleeping queue"
    # sleeping queue  ->  "ready queue"

    Start-Sleep -Seconds $IntervalSeconds
}