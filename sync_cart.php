<?php
session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost'); // Update to match your frontend port
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Read incoming JSON payload
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

// Validate input
if (!is_array($data)) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid cart data format',
        'received' => $data
    ]);
    exit;
}

// Optional: validate each cart item structure (id, name, price, quantity, etc.)
foreach ($data as $item) {
    if (!isset($item['id'], $item['quantity'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Each cart item must have an id and quantity'
        ]);
        exit;
    }
}

// Save cart data to session
$_SESSION['cart'] = $data;

echo json_encode([
    'success' => true,
    'message' => 'Cart synced successfully to session',
    'itemCount' => count($data)
]);
?>
