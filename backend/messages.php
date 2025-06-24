<?php
include('dashboard-functions.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Messages - Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-4">
    <h2>User Messages</h2>
    <nav>
        <a href="admin-dashboard.php">Dashboard</a> |
        <a href="manage-users.php">Users</a> |
        <a href="messages.php">Messages</a> |
        <a href="reports.php">Reports</a> |
        <a href="view-bookings.php">Bookings</a>
    </nav>
    <ul class="list-group mt-3">
        <?php echo getAllMessages(); ?>
    </ul>
</body>
</html>
