<!DOCTYPE html>
<html>
<head>
    <title>Your QR Code</title>
</head>
<body>
    <h1>Your QR Code</h1>
    <p>Here is your QR Code:</p>
    <img src="data:image/png;base64,{{ base64_encode($qrCodeImage) }}" alt="QR Code">
</body>
</html>

