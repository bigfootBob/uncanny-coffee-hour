<?php
header("Access-Control-Allow-Origin: *"); 
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

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

if (!empty($input['bot_field'])) {
    // return 'success' so the bot thinks it won.
    echo json_encode(["status" => "success", "message" => "Received"]);
    exit;
}

$name = htmlspecialchars(strip_tags(trim($input['name'])));
$story = htmlspecialchars(strip_tags(trim($input['story'])));

if (empty($story)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Story cannot be empty"]);
    exit;
}

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