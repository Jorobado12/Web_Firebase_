import { deleteuser, login_auth, auth } from '../Controllers/firebase.js';

// Esperar a que se muestre el modal
$('#exampleModal').on('shown.bs.modal', function () {
  // Agregar event listeners después de que el modal se haya mostrado completamente

  // Obtener referencias a los elementos dentro del modal
  const emailInput = document.getElementById('deletemail');
  const passwordInput = document.getElementById('deletepass');
  const deleteButton = document.getElementById('deletecc');

  // Agregar event listener para el botón de eliminar
  deleteButton.addEventListener('click', async () => {
      try {
          // Obtener el usuario autenticado actualmente
          const currentUser = auth.currentUser;

          if (currentUser) {
              const email = emailInput.value;
              const password = passwordInput.value; // Obtener la contraseña ingresada

              // Verificar si el usuario a eliminar es el mismo que el usuario autenticado actualmente
              if (currentUser.email === email) {
                  // Verificar la contraseña
                  const credentials = await login_auth(email, password); // Verifica la contraseña con Firebase

                  if (credentials) {
                      // Si las credenciales son válidas, eliminar la cuenta del usuario actualmente autenticado
                      await deleteuser(currentUser);
                      alert('Usuario eliminado exitosamente.');
                      window.location.href = "/Index.html";
                  } else {
                      throw new Error('La contraseña ingresada no es válida.');
                  }
              } else {
                  throw new Error('El usuario que intenta eliminar no coincide con el usuario autenticado.');
              }
          } else {
              throw new Error('No hay usuario autenticado.');
          }
      } catch (error) {
          console.error('Error al eliminar usuario:', error.message);
          alert('Error al eliminar usuario: ' + error.message);
      }
  });
});
