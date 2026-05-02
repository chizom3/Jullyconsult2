<?php
declare(strict_types=1);

$recipient = 'info@jullyconsult.com.ng';
$siteName = 'JullyConsult';

function clean_text(string $value): string
{
    $value = trim($value);
    $value = preg_replace('/[\r\n]+/', "\n", $value) ?? $value;
    return $value;
}

function clean_header(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? $value);
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    $title = 'Form Not Submitted';
    $message = 'Please submit the form from the website.';
} else {
    $name = clean_header((string)($_POST['name'] ?? 'Website Visitor'));
    $email = clean_header((string)($_POST['email'] ?? ''));
    $source = clean_header((string)($_POST['form_source'] ?? 'Website Form'));
    $subjectInput = clean_header((string)($_POST['subject'] ?? $source));

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        $title = 'Invalid Email Address';
        $message = 'Please go back and enter a valid email address.';
    } else {
        $lines = [];
        foreach ($_POST as $key => $value) {
            if ($key === 'form_source') {
                continue;
            }

            $label = ucwords(str_replace('_', ' ', (string)$key));
            if (is_array($value)) {
                $value = implode(', ', array_map('strval', $value));
            }

            $lines[] = $label . ': ' . clean_text((string)$value);
        }

        $body = "New website form submission from {$siteName}\n\n";
        $body .= "Form: {$source}\n\n";
        $body .= implode("\n", $lines);
        $body .= "\n\nSubmitted: " . date('Y-m-d H:i:s');

        $subject = $siteName . ' Form: ' . ($subjectInput !== '' ? $subjectInput : $source);
        $headers = [
            'From: JullyConsult Website <info@jullyconsult.com.ng>',
            'Reply-To: ' . $email,
            'Content-Type: text/plain; charset=UTF-8',
        ];

        $sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

        if ($sent) {
            $title = 'Message Sent';
            $message = 'Thank you. Your message has been sent to JullyConsult.';
        } else {
            http_response_code(500);
            $title = 'Message Could Not Be Sent';
            $message = 'The website could not send your message. Please email info@jullyconsult.com.ng directly.';
        }
    }
}
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo h($title); ?> | JullyConsult</title>
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
  </head>
  <body>
    <main>
      <section class="card">
        <h1><?php echo h($title); ?></h1>
        <p><?php echo h($message); ?></p>
        <a href="index.html">Return Home</a>
      </section>
    </main>
  </body>
</html>
