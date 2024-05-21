import { userstate, loginout } from '/Controllers/firebase.js';


const sesion = document.getElementById('btnlogout');

async function cerrarSesion() {
    try {
        await loginout();
        alert("Sesión cerrada");
        window.location.href = '../index.html';
    } catch (error) {
        alert('Error al cerrar sesión: ' + error.message);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    sesion.addEventListener('click', cerrarSesion);
});
    