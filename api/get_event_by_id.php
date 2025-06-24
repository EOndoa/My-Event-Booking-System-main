<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../../includes/db_connect.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid event ID']);
    exit();
}

$id = intval($_GET['id']);
$sql = "SELECT id, name, description, date, time, location, price, image_url, category FROM events WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $row['formatted_date'] = date('M d, Y', strtotime($row['date']));
    $row['formatted_time'] = date('h:i A', strtotime($row['time']));
    echo json_encode(['success' => true, 'event' => $row]);
} else {
    echo json_encode(['success' => false, 'message' => 'Event not found']);
}

$stmt->close();
$conn->close();
?>
