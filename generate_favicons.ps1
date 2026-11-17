Add-Type -AssemblyName System.Drawing

function New-RoundedRectanglePath {
    param(
        [System.Drawing.RectangleF]$rect,
        [float]$radius
    )
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $radius * 2
    $arc = New-Object System.Drawing.RectangleF($rect.X, $rect.Y, $diameter, $diameter)

    # Top-Left
    $path.AddArc($arc, 180, 90)

    # Top-Right
    $arc.X = $rect.Right - $diameter
    $path.AddArc($arc, 270, 90)

    # Bottom-Right
    $arc.Y = $rect.Bottom - $diameter
    $path.AddArc($arc, 0, 90)

    # Bottom-Left
    $arc.X = $rect.Left
    $path.AddArc($arc, 90, 90)

    $path.CloseFigure()
    return $path
}

function Generate-FaviconBitmap([int]$size) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $scale = $size / 512.0

    # Squircle Path
    $margin = 22.0 * $scale
    $rectWidth = 468.0 * $scale
    $radius = 122.0 * $scale
    $rect = New-Object System.Drawing.RectangleF($margin, $margin, $rectWidth, $rectWidth)
    $path = New-RoundedRectanglePath $rect $radius

    # Fill Squircle (Dark Obsidian Gradient)
    $bgTop = [System.Drawing.Color]::FromArgb(255, 20, 25, 40)
    $bgBottom = [System.Drawing.Color]::FromArgb(255, 6, 8, 14)
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (New-Object System.Drawing.PointF(0,0)), (New-Object System.Drawing.PointF($size,$size)), $bgTop, $bgBottom
    $g.FillPath($bgBrush, $path)
    $bgBrush.Dispose()

    # Stroke Squircle (Metallic Rose Gold Rim)
    $rimTop = [System.Drawing.Color]::FromArgb(255, 253, 164, 175)
    $rimBottom = [System.Drawing.Color]::FromArgb(255, 225, 29, 72)
    $rimBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (New-Object System.Drawing.PointF(0,0)), (New-Object System.Drawing.PointF($size,$size)), $rimTop, $rimBottom
    $rimPen = New-Object System.Drawing.Pen $rimBrush, ([Math]::Max(1.5, 20.0 * $scale))
    $g.DrawPath($rimPen, $path)
    $rimPen.Dispose()
    $rimBrush.Dispose()
    $path.Dispose()

    # Letter Stroke Pens
    $strokeWidth = [Math]::Max(2.5, 48.0 * $scale)

    $roseColor = [System.Drawing.Color]::FromArgb(255, 251, 113, 133)
    $rosePen = New-Object System.Drawing.Pen $roseColor, $strokeWidth
    $rosePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $rosePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    $whiteColor = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
    $whitePen = New-Object System.Drawing.Pen $whiteColor, $strokeWidth
    $whitePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $whitePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    # --- UNIFIED T & N COMBINATION ---
    # 1. N Diagonal Slash (Rose Gold)
    $g.DrawLine($rosePen, [float](214 * $scale), [float](160 * $scale), [float](384 * $scale), [float](360 * $scale))

    # 2. N Right Stem (Rose Gold)
    $g.DrawLine($rosePen, [float](384 * $scale), [float](360 * $scale), [float](384 * $scale), [float](160 * $scale))

    # 3. N Telemetry Node Dot at Top Right
    $nodeR = [Math]::Max(1.5, 14.0 * $scale)
    $nodeBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 253, 164, 175))
    $g.FillEllipse($nodeBrush, [float](384 * $scale - $nodeR), [float](160 * $scale - $nodeR), [float]($nodeR * 2), [float]($nodeR * 2))
    $nodeBrush.Dispose()

    # 4. T Horizontal Crossbar (Crisp Titanium White, centered over the stem)
    $g.DrawLine($whitePen, [float](128 * $scale), [float](160 * $scale), [float](300 * $scale), [float](160 * $scale))

    # 5. T Vertical Stem / Shared N Left Stem (Crisp Titanium White)
    $g.DrawLine($whitePen, [float](214 * $scale), [float](160 * $scale), [float](214 * $scale), [float](360 * $scale))

    $whitePen.Dispose()
    $rosePen.Dispose()
    $g.Dispose()

    return $bmp
}

$baseDir = "C:\Users\moizz\.gemini\antigravity\scratch\thasleema-portfolio"
$assetsDir = Join-Path $baseDir "assets"

# Generate 512x512 Master PNG
$bmp512 = Generate-FaviconBitmap 512
$bmp512.Save((Join-Path $assetsDir "favicon-512x512.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# Generate 192x192 Android Chrome Icon
$bmp192 = Generate-FaviconBitmap 192
$bmp192.Save((Join-Path $assetsDir "favicon-192x192.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# Generate 180x180 Apple Touch Icon
$bmp180 = Generate-FaviconBitmap 180
$bmp180.Save((Join-Path $assetsDir "apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp180.Save((Join-Path $baseDir "apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# Generate 32x32 Favicon PNG
$bmp32 = Generate-FaviconBitmap 32
$bmp32.Save((Join-Path $assetsDir "favicon-32x32.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# Generate 16x16 Favicon PNG
$bmp16 = Generate-FaviconBitmap 16
$bmp16.Save((Join-Path $assetsDir "favicon-16x16.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# Generate .ico file from the 32x32 bitmap
$hIcon = $bmp32.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$icoStream = [System.IO.File]::Create((Join-Path $baseDir "favicon.ico"))
$icon.Save($icoStream)
$icoStream.Close()
$icon.Dispose()

Write-Output "Successfully generated unified T+N combination favicon assets across all formats!"
