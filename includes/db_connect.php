<?php
// Database credentials
define('DB_HOST', 'localhost'); // Add ':3306' if needed
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'orchidfy_db');

// Establish a database connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Development mode
    // For production: error_log("Database connection failed: " . $conn->connect_error);
    // die("An error occurred. Please try again later.");
}

// Set charset to utf8mb4
if (!$conn->set_charset("utf8mb4")) {
    die("Error setting charset: " . $conn->error);
}

// Optional: Function for connection
function getDbConnection() {
    global $conn;
    return $conn;
}
?>