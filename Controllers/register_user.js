import { confi, registerauth, addDataUser } from "/Controllers/Firebase.js";

const save_auth = document.getElementById('sign-btn');
const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/

async function register() {
    const email = document.getElementById('Remail').value;
    const password = document.getElementById('Rpassword').value;

    const Id= document.getElementById('Rcedula').value;
    const name = document.getElementById('RfullName').value;
    const Fecha = document.getElementById('Rbirthdate').value;
    const direccion = document.getElementById('Raddress').value;
    const telefono = document.getElementById('Rphone').value;
    const gen = document.getElementById('Rgenero').value;
    const sangre = document.getElementById('Rrh').value;


      
    try {
      // Registrar usuario en Firebase Authentication
      const userCredential = await registerauth(email, password);
      const user = userCredential.user;

      // Agregar datos del usuario a Firestore
      await addDataUser(Id, name, Fecha, direccion, telefono,gen , sangre,email,password);
      
      // Envía correo de confirmación
      await confi();
      
      alert('Correo de verificacion enviado a ' + email);
      
      // Redirige al usuario a la página de inicio
      window.location.href = "/Index.html";
  } catch (error) {
      alert(error.message);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  save_auth.addEventListener('click', register);
});