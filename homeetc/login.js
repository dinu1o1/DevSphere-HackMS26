document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value;
    var message = document.getElementById("message");

    var users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
        message.style.color = "red";
        message.textContent = "No registered users found";
        return;
    }

    var matchedUser = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (matchedUser) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));

        message.style.color = "green";
        message.textContent = "Login successful. Redirecting...";

        setTimeout(function () {
            window.location.href = "homeland.html";
        }, 1000);
    } else {
        message.style.color = "red";
        message.textContent = "Invalid email or password";
        
    }
});