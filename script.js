
document.getElementById("jugadorForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());

  fetch("https://proxycargadatos.onrender.com/guardar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      return response.json();
    })
    .then(result => {
      const mensaje = document.getElementById("mensaje");
      if (result.status === "success") {
        mensaje.textContent = "✅ Jugador guardado con éxito.";
        form.reset();
      } else {
        mensaje.textContent = "❌ No se pudo guardar: " + result.message;
      }
    })
    .catch((error) => {
      document.getElementById("mensaje").textContent = "❌ Error al guardar jugador.";
      console.error("Error detallado:", error);
    });
});
