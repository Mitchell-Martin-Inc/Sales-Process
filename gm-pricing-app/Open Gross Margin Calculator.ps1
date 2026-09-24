$ErrorActionPreference = "Stop"

$appDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$index = Get-Item -LiteralPath (Join-Path $appDir "index.html")
$appUrl = [System.Uri]::new($index.FullName).AbsoluteUri

$browserCandidates = @(
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles(x86)\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe"
)

$browser = $browserCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1

if (-not $browser) {
  Start-Process $appUrl
  exit
}

Start-Process -FilePath $browser -ArgumentList @(
  "--app=$appUrl",
  "--window-size=700,620",
  "--window-position=120,80"
)
