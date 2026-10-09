# Servidor HTTP simples para o site El Brabo Barbería
$root = $PSScriptRoot
$port = 8094
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Servindo $root em http://localhost:$port"
$mime = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8";
  ".js"="application/javascript; charset=utf-8"; ".svg"="image/svg+xml";
  ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".png"="image/png";
  ".webp"="image/webp"; ".ico"="image/x-icon"; ".json"="application/json"
}
try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    try {
      $path = [Uri]::UnescapeDataString($ctx.Request.Url.LocalPath)
      if ($path.EndsWith("/")) { $path += "index.html" }
      $file = Join-Path $root ($path -replace "/", "\")
      if (Test-Path $file -PathType Leaf) {
        $bytes = [IO.File]::ReadAllBytes($file)
        $ext = [IO.Path]::GetExtension($file).ToLower()
        $ctx.Response.ContentType = $mime[$ext]
        if (-not $ctx.Response.ContentType) { $ctx.Response.ContentType = "application/octet-stream" }
        $ctx.Response.ContentLength64 = $bytes.Length
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        $msg = [Text.Encoding]::UTF8.GetBytes("<h1>404</h1>")
        $ctx.Response.StatusCode = 404
        $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
      }
    } catch { try { $ctx.Response.StatusCode = 500 } catch {} }
    finally { $ctx.Response.Close() }
  }
} finally { $listener.Stop() }
