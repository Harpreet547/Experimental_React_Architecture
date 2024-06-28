git checkout main

[int]$warningCountBase = npm run --silent lint:summary

Write-Host $warningCountBase

git checkout Harpreet547-reduce-warnings-action

[int]$warningCountChild = npm run --silent lint:summary

Write-Host $warningCountChild