import { recovery_pass } from "../Controllers/firebase.js"

const recover = document.getElementById("btnreset")

async function recovery(event) {
  event.preventDefault(); // Evitar la recarga de la página por defecto

  const email = document.getElementById('emailreset').value

  if (email === "") {
    alert("Ingrese el correo para recuperar contraseña")
    return;
  } else if (email.indexOf("@") === -1) {
    alert("El correo electrónico no es válido (Use el formato ejemplo@example.com)")
    return;
  }

  try {
    await recovery_pass(email);
    alert("Correo de recuperación enviado a " + email);
    window.location.href = "../index.html"; // Redirigir después de mostrar la alerta
  } catch (error) {
    // Manejar errores
    switch (error.code) {
      case "auth/invalid-email":
        alert("El correo electrónico proporcionado no es válido.");
        break;
      case "auth/user-not-found":
        alert("No hay ningún usuario registrado con este correo electrónico.");
        break;
      case "auth/operation-not-allowed":
        alert("El restablecimiento de contraseña no está habilitado en la configuración de Firebase.");
        break;
      case "auth/too-many-requests":
        alert("Demasiadas solicitudes de restablecimiento de contraseña. Por favor, inténtalo de nuevo más tarde.");
        break;
      case "auth/network-request-failed":
        alert("Error de red. Por favor, verifica tu conexión a internet y vuelve a intentarlo.");
        break;
      default:
        console.error("Error al enviar el correo de recuperación:", error);
        alert("Ocurrió un error al enviar el correo de recuperación. Por favor, inténtalo de nuevo más tarde.");
        break;
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  recover.addEventListener('click', recovery)
})
