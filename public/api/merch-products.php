<?php
header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/config.php';

$token = defined('FOURTHWALL_TOKEN') ? FOURTHWALL_TOKEN : '';
if (!$token) {
    http_response_code(500);
    echo json_encode(['error' => 'Missing storefront token']);
    exit;
}

$url = 'https://storefront-api.fourthwall.com/v1/collections/all/products?' . http_build_query([
    'storefront_token' => $token,
    'page'             => 0,
    'size'             => 50,
]);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => ['Accept: application/json'],
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_TIMEOUT        => 10,
]);

$response  = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false || $curlError) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to reach storefront API']);
    exit;
}

if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo json_encode(['error' => 'Storefront API error']);
    exit;
}

$data    = json_decode($response, true);
$results = isset($data['results']) && is_array($data['results']) ? $data['results'] : [];
echo json_encode(['results' => $results]);
