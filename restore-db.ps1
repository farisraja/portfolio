# ==============================================================================
# Script Otomatis Restore Database PostgreSQL untuk Portfolio (PC Rumah)
# ==============================================================================

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  MIGRASI DATABASE PORTFOLIO (FARIS RAJA ARDANA)" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan

$dbName = "portfolio_db"
$dbUser = "postgres"
$dbHost = "127.0.0.1"
$dbPort = "5432"

# 1. Cari psql.exe
$psqlPath = Get-Command psql.exe -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source
if (-not $psqlPath) {
    $searchPaths = @(
        "C:\Program Files\PostgreSQL\*\bin\psql.exe",
        "C:\Program Files (x86)\PostgreSQL\*\bin\psql.exe",
        "C:\laragon\bin\postgresql\*\bin\psql.exe"
    )
    $found = Resolve-Path $searchPaths -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $psqlPath = $found.Path
    }
}

if (-not $psqlPath) {
    Write-Host "[!] psql.exe tidak ditemukan di PATH maupun direktori standar PostgreSQL." -ForegroundColor Yellow
    $psqlPath = Read-Host "Silakan masukkan path lengkap ke psql.exe (contoh: C:\Program Files\PostgreSQL\16\bin\psql.exe)"
}

if (-not (Test-Path $psqlPath)) {
    Write-Host "[ERROR] psql.exe tidak valid: $psqlPath" -ForegroundColor Red
    Exit 1
}

Write-Host "[OK] Menggunakan psql: $psqlPath" -ForegroundColor Green

# 2. Input Password PostgreSQL PC Rumah
$password = Read-Host -Prompt "Masukkan password PostgreSQL user 'postgres' di PC ini" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
$env:PGPASSWORD = $plainPassword

# 3. Cek file SQL backup
$sqlBackup = Join-Path $PSScriptRoot "portfolio_db_backup.sql"
if (-not (Test-Path $sqlBackup)) {
    $sqlBackup = "C:\laragon\www\portfolio\portfolio_db_backup.sql"
}
if (-not (Test-Path $sqlBackup)) {
    Write-Host "[ERROR] File portfolio_db_backup.sql tidak ditemukan!" -ForegroundColor Red
    Exit 1
}

Write-Host "`n1. Memeriksa dan membuat database '$dbName' jika belum ada..." -ForegroundColor Yellow
$createDbCmd = "SELECT 'CREATE DATABASE $dbName' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$dbName')\gexec"
& $psqlPath -U $dbUser -h $dbHost -p $dbPort -d postgres -c $createDbCmd 2>$null

Write-Host "2. Mengimpor data ke database '$dbName'..." -ForegroundColor Yellow
& $psqlPath -U $dbUser -h $dbHost -p $dbPort -d $dbName -f $sqlBackup

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n============================================================" -ForegroundColor Green
    Write-Host "  RESTORE DATABASE SUKSES!" -ForegroundColor Green
    Write-Host "  Database '$dbName' telah siap digunakan di PC ini." -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "`nPastikan file .env.local Anda berisi:" -ForegroundColor Cyan
    Write-Host "DATABASE_URL=postgresql://${dbUser}:${plainPassword}@${dbHost}:${dbPort}/${dbName}" -ForegroundColor White
} else {
    Write-Host "`n[PERINGATAN] Terjadi peringatan saat impor (biasanya karena relasi/skema yang sudah ada). Silakan periksa isi database." -ForegroundColor Yellow
}
