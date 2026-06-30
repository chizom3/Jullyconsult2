<?php
declare(strict_types=1);

$recipient = 'info@jullyconsult.com.ng';
$siteName = 'JullyConsult';
$storageFile = __DIR__ . '/newsletter-subscribers.csv';

function clean_header_value(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? $value);
}

function html_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function wants_json_response(): bool
{
    $accept = (string)($_SERVER['HTTP_ACCEPT'] ?? '');
    $requestedWith = (string)($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '');
    return stripos($accept, 'application/json') !== false || strtolower($requestedWith) === 'fetch';
}

function render_response(string $title, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);

    if (wants_json_response()) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode([
            'ok' => $statusCode >= 200 && $statusCode < 300,
            'title' => $title,
            'message' => $message,
        ]);
        return;
    }
    ?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo html_escape($title); ?> | JullyConsult</title>
    <style>
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        color: #102c24;
        background: #f5f8f6;
      }
      main {
        display: grid;
        min-height: 100vh;
        place-items: center;
        padding: 32px;
      }
      .card {
        width: min(100%, 620px);
        padding: 38px;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 18px 45px rgba(16, 44, 36, 0.12);
      }
      h1 {
        margin: 0 0 14px;
        font-size: clamp(30px, 5vw, 44px);
      }
      p {
        color: #4d6266;
        font-size: 18px;
        line-height: 1.6;
      }
      a {
        display: inline-block;
        margin-top: 16px;
        padding: 12px 18px;
        border-radius: 6px;
        background: #102c24;
        color: #fff;
        text-decoration: none;
        font-weight: 700;
      }
    </style>
    <link rel="icon" type="image/png" href="assets/images/Jully%20Consult%20logo.png">
    <link rel="apple-touch-icon" href="assets/images/Jully%20Consult%20logo.png">
</head>
  <body>
    <main>
      <section class="card">
        <h1><?php echo html_escape($title); ?></h1>
        <p><?php echo html_escape($message); ?></p>
        <a href="./">Return Home</a>
      </section>
    </main>
  </body>
</html>
    <?php
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    render_response('Newsletter Not Submitted', 'Please submit the newsletter form from the website.', 405);
    exit;
}

$honeypot = (string)($_POST['website'] ?? '');
if ($honeypot !== '') {
    render_response('Subscription Received', 'Thank you for subscribing to JullyConsult updates.');
    exit;
}

$email = clean_header_value((string)($_POST['email'] ?? ''));
$name = clean_header_value((string)($_POST['name'] ?? ''));
$source = clean_header_value((string)($_POST['source_page'] ?? 'Website footer'));

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    render_response('Invalid Email Address', 'Please go back and enter a valid email address.', 400);
    exit;
}

$date = date('Y-m-d H:i:s');
$row = [$date, $email, $name, $source, $_SERVER['REMOTE_ADDR'] ?? ''];

$stored = false;
$handle = fopen($storageFile, 'ab');
if ($handle !== false) {
    if (flock($handle, LOCK_EX)) {
        if (filesize($storageFile) === 0) {
            fputcsv($handle, ['submitted_at', 'email', 'name', 'source_page', 'ip_address'], ',', '"', '', "\n");
        }
        fputcsv($handle, $row, ',', '"', '', "\n");
        flock($handle, LOCK_UN);
        $stored = true;
    }
    fclose($handle);
}

$body = "New newsletter subscription from {$siteName}\n\n";
$body .= "Email: {$email}\n";
if ($name !== '') {
    $body .= "Name: {$name}\n";
}
$body .= "Source: {$source}\n";
$body .= "Submitted: {$date}\n";

$headers = [
    'From: JullyConsult Website <info@jullyconsult.com.ng>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = @mail($recipient, $siteName . ' Newsletter Subscription', $body, implode("\r\n", $headers));

if ($sent || $stored) {
    render_response('Subscription Received', 'Thank you for subscribing to JullyConsult updates.');
    exit;
}

render_response('Subscription Could Not Be Saved', 'Please email info@jullyconsult.com.ng and ask to be added to the newsletter.', 500);
