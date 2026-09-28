<?php
header("Access-Control-Allow-Origin: https://uncannycoffeehour.com");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== 0) {
    http_response_code(415);
    echo json_encode(["status" => "error", "message" => "Unsupported content type"]);
    exit;
}

$input = json_decode(file_get_contents("php://input", false, null, 0, 20000), true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

if (!empty($input['bot_field'])) {
    // return 'success' so the bot thinks it won.
    echo json_encode(["status" => "success", "message" => "Received"]);
    exit;
}

// Rate limit: at most RATE_LIMIT_MAX submissions per IP per RATE_LIMIT_WINDOW seconds
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 3600;
$rateFile = sys_get_temp_dir() . '/uch_submit_' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
$now = time();
$recent = [];
if (is_readable($rateFile)) {
    $recent = array_filter(
        array_map('intval', explode(',', (string) file_get_contents($rateFile))),
        fn($t) => $t > $now - RATE_LIMIT_WINDOW
    );
}
if (count($recent) >= RATE_LIMIT_MAX) {
    http_response_code(429);
    echo json_encode(["status" => "error", "message" => "Too many submissions, please try again later"]);
    exit;
}

$rawName = is_string($input['name'] ?? null) ? $input['name'] : '';
$rawStory = is_string($input['story'] ?? null) ? $input['story'] : '';

$name = mb_substr(str_replace(["\r", "\n"], '', strip_tags(trim($rawName))), 0, 100);
$story = htmlspecialchars(strip_tags(trim($rawStory)));

if (empty($story)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Story cannot be empty"]);
    exit;
}

if (mb_strlen($rawStory) > 10000) {
    http_response_code(413);
    echo json_encode(["status" => "error", "message" => "Story is too long"]);
    exit;
}

$recent[] = $now;
file_put_contents($rateFile, implode(',', $recent), LOCK_EX);

$to = "uncanny.coffee.story@gmail.com";
$subject = "New Tale from web: " . ($name ?: "Unknown");
$headers = "From: noreply@uncannycoffee.com\r\n";
$headers .= "Reply-To: noreply@uncannycoffee.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$email_body = "Name: $name\n\nStory:\n$story\n\n----------------\nSent from Uncanny Coffee Hour Website";

if (mail($to, $subject, $email_body, $headers)) {
    echo json_encode(["status" => "success", "message" => "Story received"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server failed to send email"]);
}
?>