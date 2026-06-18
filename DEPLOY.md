# Rabt Naturals Theme — Deploy Guide

## 📦 Git (Code Save)
```powershell
cd "C:\Users\INDIA TECHNOLOGY\Desktop\rabnaturals-theme"
git add -A
git commit -m "your message"
git push origin master
```

## 🚀 Shopify Live Deploy
```powershell
shopify theme push -s "1ahr1h-sq.myshopify.com" --path "C:\Users\INDIA TECHNOLOGY\Desktop\rabnaturals-theme" --unpublished -t "rabnaturals-v2"
shopify theme publish -s "1ahr1h-sq.myshopify.com" -t THEME_ID --force
```

## 🔄 Quick Deploy (Both Steps)
```powershell
cd "C:\Users\INDIA TECHNOLOGY\Desktop\rabnaturals-theme"
$result = shopify theme push -s "1ahr1h-sq.myshopify.com" --unpublished -t "rabnaturals-v2" --json 2>$null | ConvertFrom-Json
shopify theme publish -s "1ahr1h-sq.myshopify.com" -t $result.theme.id --force
```

## 🌐 Live URL
https://1ahr1h-sq.myshopify.com

## ⚠️ Known Issue
- `settings_schema.json` Section 41 `default` warning — non-breaking, can be ignored
