param($baseBranch, $currentBranch, [int]$reduceWarningsBy)

git checkout $baseBranch

[int]$warningCountBase = npm run --silent lint:summary

Write-Host Base branch warning count - $warningCountBase

git checkout $currentBranch

[int]$warningCountCurrent = npm run --silent lint:summary

Write-Host Current branch warning count - $warningCountCurrent

$warningCountDiff = $warningCountBase - $warningCountCurrent

if ($warningCountDiff -lt $reduceWarningsBy) {
    Write-Host "Current branch warnings: " + $warningCountCurrent + "\nBase branch warnings: " + $warningCountBase + "\nReduced warnings by: " + $warningCountDiff + "\nExpected reduction in warnings: " + $reduceWarningsBy
    exit 1
}
else {
    Write-Host "Current branch warnings: " + $warningCountCurrent + "\nBase branch warnings: " + $warningCountBase + "\nReduced warnings by: " + $warningCountDiff
    exit 0
}