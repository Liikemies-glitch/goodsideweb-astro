$blogPath = "src/content/blog"
$finFiles = Get-ChildItem -Path $blogPath -Filter "*.fi.md" -Recurse

$totalFiles = $finFiles.Count
$filesUpdated = 0
$totalReplacements = 0

foreach ($file in $finFiles) {
    Write-Host "Processing file: $($file.FullName)"
    
    # Read the content of the file
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace /contact with /fi/contact while preserving the link text
    # This regex matches markdown links with /contact path
    $oldContent = $content
    $newContent = $content -replace '\[(.*?)\]\(\/contact\)', '[$1](/fi/contact)'
    
    # Count the number of replacements
    $replacementCount = ([regex]::Matches($oldContent, '\[(.*?)\]\(\/contact\)')).Count
    
    # Write the modified content back to the file if changes were made
    if ($oldContent -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $filesUpdated++
        $totalReplacements += $replacementCount
        Write-Host "Updated file: $($file.FullName) - Made $replacementCount replacements" -ForegroundColor Green
    } else {
        Write-Host "No changes needed in: $($file.FullName)" -ForegroundColor Yellow
    }
}

Write-Host "`nSummary:" -ForegroundColor Cyan
Write-Host "Total files processed: $totalFiles" -ForegroundColor Cyan
Write-Host "Files updated: $filesUpdated" -ForegroundColor Cyan
Write-Host "Total replacements made: $totalReplacements" -ForegroundColor Cyan
Write-Host "CTA update complete!" -ForegroundColor Cyan 