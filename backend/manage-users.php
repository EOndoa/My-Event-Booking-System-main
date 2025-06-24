<?php
include('dashboard-functions.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Users - Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="p-4">
    <h2>Manage Users</h2>
    <nav>
        <a href="admin-dashboard.php">Dashboard</a> |
        <a href="manage-users.php">Users</a> |
        <a href="messages.php">Messages</a> |
        <a href="reports.php">Reports</a> |
        <a href="view-bookings.php">Bookings</a>
    </nav>
    <table class="table table-bordered mt-3">
        <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
            <?php echo getUsers(); ?>
        </tbody>
    </table>
</body>
</html>
