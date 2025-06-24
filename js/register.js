const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value
};

fetch('http://localhost/My-Event-Booking-System-main/api/register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
.then(res => res.json())
.then(response => {
    if (response.success) {
        alert("Registration successful!");
        window.location.href = "login.html";
    } else {
        alert(response.message);
    }
})
.catch(err => {
    console.error("Error:", err);
    alert("An error occurred during registration.");
});
