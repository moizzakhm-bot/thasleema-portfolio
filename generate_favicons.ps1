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
    $radius = 120.0 * $scale
    $rect = New-Object System.Drawing.RectangleF($margin, $margin, $rectWidth, $rectWidth)
    $path = New-RoundedRectanglePath $rect $radius

    # Fill Squircle
    $bgTop = [System.Drawing.Color]::FromArgb(255, 20, 25, 40)
    $bgBottom = [System.Drawing.Color]::FromArgb(255, 8, 10, 16)
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (New-Object System.Drawing.PointF(0,0)), (New-Object System.Drawing.PointF($size,$size)), $bgTop, $bgBottom
    $g.FillPath($bgBrush, $path)
    $bgBrush.Dispose()

    # Stroke Squircle
    $rimTop = [System.Drawing.Color]::FromArgb(255, 253, 164, 175)
    $rimBottom = [System.Drawing.Color]::FromArgb(255, 225, 29, 72)
    $rimBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (New-Object System.Drawing.PointF(0,0)), (New-Object System.Drawing.PointF($size,$size)), $rimTop, $rimBottom
    $rimPen = New-Object System.Drawing.Pen $rimBrush, ([Math]::Max(1.5, 20.0 * $scale))
    $g.DrawPath($rimPen, $path)
    $rimPen.Dispose()
    $rimBrush.Dispose()
    $path.Dispose()

    # Cloud Arc
    $arcPenWidth = [Math]::Max(1.2, 14.0 * $scale)
    $arcColor = [System.Drawing.Color]::FromArgb(240, 251, 113, 133)
    $arcPen = New-Object System.Drawing.Pen $arcColor, $arcPenWidth
    $arcPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $arcPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    # Draw cloud curves via Beziers
    $g.DrawBezier($arcPen, 
        [float](146 * $scale), [float](166 * $scale),
        [float](158 * $scale), [float](132 * $scale),
        [float](204 * $scale), [float](122 * $scale),
        [float](236 * $scale), [float](146 * $scale))
    $g.DrawBezier($arcPen, 
        [float](236 * $scale), [float](146 * $scale),
        [float](262 * $scale), [float](114 * $scale),
        [float](326 * $scale), [float](114 * $scale),
        [float](352 * $scale), [float](146 * $scale))
    $g.DrawBezier($arcPen, 
        [float](352 * $scale), [float](146 * $scale),
        [float](376 * $scale), [float](140 * $scale),
        [float](398 * $scale), [float](160 * $scale),
        [float](394 * $scale), [float](182 * $scale))
    $arcPen.Dispose()

    # Cloud Telemetry Node
    $nodeR = [Math]::Max(1.0, 10.0 * $scale)
    $nodeBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 253, 164, 175))
    $g.FillEllipse($nodeBrush, [float](394 * $scale - $nodeR), [float](182 * $scale - $nodeR), [float]($nodeR * 2), [float]($nodeR * 2))
    $nodeBrush.Dispose()

    # Letter Pens
    $strokeWidth = [Math]::Max(2.0, 44.0 * $scale)
    $whiteColor = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
    $whitePen = New-Object System.Drawing.Pen $whiteColor, $strokeWidth
    $whitePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $whitePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    $roseColor = [System.Drawing.Color]::FromArgb(255, 251, 113, 133)
    $rosePen = New-Object System.Drawing.Pen $roseColor, $strokeWidth
    $rosePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $rosePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    # Monogram "T"
    # Crossbar
    $g.DrawLine($whitePen, [float](108 * $scale), [float](205 * $scale), [float](248 * $scale), [float](205 * $scale))
    # Stem
    $g.DrawLine($whitePen, [float](178 * $scale), [float](205 * $scale), [float](178 * $scale), [float](385 * $scale))

    # Monogram "N"
    # Left Stem
    $g.DrawLine($whitePen, [float](276 * $scale), [float](385 * $scale), [float](276 * $scale), [float](205 * $scale))
    # Diagonal Slash (Rose Accent)
    $g.DrawLine($rosePen, [float](276 * $scale), [float](205 * $scale), [float](404 * $scale), [float](385 * $scale))
    # Right Stem (Rose Accent)
    $g.DrawLine($rosePen, [float](404 * $scale), [float](385 * $scale), [float](404 * $scale), [float](205 * $scale))

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

# Also generate a valid .ico file from the 32x32 bitmap
$hIcon = $bmp32.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$icoStream = [System.IO.File]::Create((Join-Path $baseDir "favicon.ico"))
$icon.Save($icoStream)
$icoStream.Close()
$icon.Dispose()

Write-Output "Successfully generated all favicon assets: SVG, PNGs (16, 32, 180, 192, 512), and ICO!"
