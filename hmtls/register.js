document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var firstName = document.getElementById("firstName").value.trim();
    var lastName = document.getElementById("lastName").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirmPassword").value;
    var message = document.getElementById("message");

    if (password !== confirm) {
        message.style.color = "red";
        message.textContent = "Password does not match";
        return;
    }

    if (password.length < 6) {
        message.style.color = "red";
        message.textContent = "Password must be at least 6 characters";
        return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];

    var emailExists = users.some(function (user) {
        return user.email === email;
    });

    if (emailExists) {
        message.style.color = "red";
        message.textContent = "Email already registered";
        return;
    }

    var newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "green";
    message.textContent = "Registration successful. Redirecting to login...";

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1500);
});