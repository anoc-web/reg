const apiUrl = "http://localhost:3000"; // Cambia esto si tu servidor está en otra dirección

// Registro de usuario
document.getElementById("register-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const secretWord = document.getElementById("register-secret").value;

  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secretWord })
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message || "Registro exitoso");
    } else {
      alert(data.message || "Error en el registro");
    }
  } catch (error) {
    console.error("Error al registrar:", error);
    alert("No se pudo conectar al servidor");
  }
});

// Inicio de sesión
document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const secretWord = document.getElementById("login-secret").value;

  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secretWord })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("authToken", data.token);
      alert("Inicio de sesión exitoso");
    } else {
      alert(data.message || "Error en el inicio de sesión");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("No se pudo conectar al servidor");
  }
});
