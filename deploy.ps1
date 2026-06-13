$ErrorActionPreference = "Stop"

$accountId = "87aca5b85b53f3b435787881ff829b48"
$apiToken = "cfut_JKMx2dXGR8DcBUD5m65dM2YurzUyr9YGsbsfBk8Z229a5501"
$projectName = "predator-grid"
$headers = @{
    "Authorization" = "Bearer $apiToken"
    "Content-Type" = "application/json"
}

Write-Host "Getting upload token..."
$tokenResp = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$projectName/upload-token" -Headers $headers -Method GET
$uploadToken = $tokenResp.result

Write-Host "Upload token: $uploadToken"

Write-Host "Hashing files..."
$basePath = ".next"
$files = @{}
$manifest = @{}

function Get-FileHash($filePath) {
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $hash = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
    return ($hash | ForEach-Object { $_.ToString("x2") }) -join ""
}

function Add-Files($dir, $prefix) {
    Get-ChildItem -Path $dir -Recurse -File | ForEach-Object {
        $relativePath = $_.FullName.Substring((Resolve-Path $dir).Path.Length + 1).Replace("\", "/")
        $hash = Get-FileHash $_.FullName
        $size = $_.Length
        $files[$hash] = $_.FullName
        $manifest[$prefix + $relativePath] = @{
            "size" = $size
            "hash" = $hash
        }
    }
}

# Collect all files from .next
if (Test-Path $basePath) {
    Add-Files $basePath ".next"
}

Write-Host "Found $($files.Count) unique files"
Write-Host "Creating deployment..."

$manifestJson = $manifest | ConvertTo-Json -Depth 10 -Compress

$body = @{
    "branch" = "main"
    "manifest" = $manifest
} | ConvertTo-Json -Depth 10 -Compress

try {
    $deployResp = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$projectName/deployments" -Headers $headers -Method POST -Body $body
    Write-Host "Deployment created!"
    Write-Host "URL: $($deployResp.result.url)"
    Write-Host "ID: $($deployResp.result.id)"
} catch {
    Write-Host "Error: $_"
    Write-Host $_.Exception.Response
}
