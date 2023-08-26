

// Formulario de login
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
        username: username,
        password: password
    };

    try {
        const response = await fetch("/api/records/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        if (responseData.status === 'success') {
            window.location.href = 'ventas.html';
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
});