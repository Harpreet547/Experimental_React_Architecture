param($baseBranch, $currentBranch, [int]$reduceWarningsBy)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$PSDefaultParameterValues['*:ErrorAction'] = 'Stop'

try {

    git checkout $baseBranch

    [int]$warningCountBase = npm run --silent lint:summary

    Write-Host Base branch warning count - $warningCountBase

    git checkout $currentBranch

    [int]$warningCountCurrent = npm run --silent lint:summary

    Write-Host Current branch warning count - $warningCountCurrent

    $warningCountDiff = $warningCountBase - $warningCountCurrent

    if ($warningCountBase -eq 0 -and $warningCountCurrent -eq 0) {
        Write-Host "Base and current branch has no warnings."
        exit 0
    }

    if ($warningCountDiff -lt $reduceWarningsBy) {
        Write-Error "Current branch warnings: " + $warningCountCurrent + "Base branch warnings: " + $warningCountBase + "Reduced warnings by: " + $warningCountDiff + "Expected reduction in warnings: " + $reduceWarningsBy
        exit 1
    }
    else {
        Write-Host "Current branch warnings: " + $warningCountCurrent + "Base branch warnings: " + $warningCountBase + "Reduced warnings by: " + $warningCountDiff
        exit 0
    }
}
catch [System.InvalidCastException] {
    Write-Error "Caught an InvalidCastException: Cannot convert data type."
    exit 1
}
catch [System.ArgumentException] {
    Write-Error "Caught an ArgumentException: Invalid argument."
    exit 1
}
catch {
    exit 1
}