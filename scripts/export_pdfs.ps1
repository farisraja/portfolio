$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
  $edgePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
}

Write-Output "Generating Indonesian Harvard CV PDF (2 pages)..."
$idProc = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=C:\laragon\www\portfolio\public\cv-faris-raja-ardana-id.pdf", "http://localhost:3002/cv?lang=id" -PassThru
$idProc.WaitForExit()

Write-Output "Generating English Harvard CV PDF (2 pages)..."
$enProc = Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=C:\laragon\www\portfolio\public\cv-faris-raja-ardana-en.pdf", "http://localhost:3002/cv?lang=en" -PassThru
$enProc.WaitForExit()

# Copy ID version as main default fallback
Copy-Item -Path "C:\laragon\www\portfolio\public\cv-faris-raja-ardana-id.pdf" -Destination "C:\laragon\www\portfolio\public\cv-faris-raja-ardana.pdf" -Force

Write-Output "Both 2-page PDFs generated successfully!"
Get-Item "C:\laragon\www\portfolio\public\cv-faris-raja-ardana-*.pdf", "C:\laragon\www\portfolio\public\cv-faris-raja-ardana.pdf" | Select-Object Name, Length
