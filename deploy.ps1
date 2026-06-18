param(
  [string]$Store = "1ahr1h-sq.myshopify.com",
  [string]$ThemeName = "rabnaturals-v2",
  [string]$Path = $PSScriptRoot
)

Write-Host "=== Rabt Naturals Theme Deploy ===" -ForegroundColor Cyan

# 1. Commit to Git
git -C $Path add -A
$msg = Read-Host "Commit message"
git -C $Path commit -m $msg
git -C $Path push origin master

# 2. Push to Shopify
Write-Host "Pushing to Shopify..." -ForegroundColor Yellow
$result = shopify theme push -s $Store --path $Path --unpublished -t $ThemeName --json 2>$null | ConvertFrom-Json

# 3. Publish Live
Write-Host "Publishing live..." -ForegroundColor Green
shopify theme publish -s $Store -t $result.theme.id --force

Write-Host "=== Deploy Complete! ===" -ForegroundColor Cyan
Write-Host "URL: https://$Store" -ForegroundColor Green
