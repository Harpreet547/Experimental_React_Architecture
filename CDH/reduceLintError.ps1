param($baseBranch, $currentBranch, [int]$reduceWarningsBy)


try {

    # git fetch origin
    git pull origin $baseBranch
    git switch $baseBranch

    [int]$warningCountBase = npm run --silent lint:summary

    git pull origin $currentBranch
    git switch $currentBranch

    [int]$warningCountCurrent = npm run --silent lint:summary

    $warningCountDiff = $warningCountBase - $warningCountCurrent

    if ($warningCountBase -eq 0 -and $warningCountCurrent -eq 0) {
        Write-Host "Base and current branch has no warnings."
        exit 0
    }

    if ($warningCountDiff -lt $reduceWarningsBy) {
        Write-Host "Current branch warnings: " $warningCountCurrent "`r`nBase branch warnings: " $warningCountBase "`r`nReduced warnings by: " $warningCountDiff "`r`nExpected reduction in warnings: " $reduceWarningsBy
        exit 1
    }
    else {
        Write-Host "Current branch warnings: " $warningCountCurrent "`r`nBase branch warnings: " $warningCountBase "`r`nReduced warnings by: " $warningCountDiff
        exit 0
    }
}
catch [System.InvalidCastException] {
    Write-Host "Caught an InvalidCastException: Cannot convert data type."
    exit 1
}
catch [System.ArgumentException] {
    Write-Host "Caught an ArgumentException: Invalid argument."
    exit 1
}
catch {
    exit 1
}